const fs = require("node:fs");
const ts = require("typescript");
require.extensions[".ts"] = (module, filename) => {
  const code = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  module._compile(code, filename);
};
const assert = require("node:assert/strict");
const { routes } = require("../data/routes.ts");
const { resolveLocation, suggestLocations } = require("../data/locations.ts");
const {
  fromLegacyRoute,
  toTravelRequest,
} = require("../services/travel/adapters.ts");
const {
  getBestValueRoute,
  getCheapestRoute,
  getFastestRoute,
  rankOptions,
  scoreOptions,
  totalPrice,
} = require("../utils/ranking.ts");
const { getRecommendations } = require("../utils/recommendations.ts");
const { deduplicateOptions } = require("../services/travel/deduplicate.ts");
const {
  searchTravelOptions,
} = require("../services/travel/searchTravelOptions.ts");
const {
  MockTravelProvider,
} = require("../services/travel/MockTravelProvider.ts");
const request = toTravelRequest({
  origin: "Cebu",
  destination: "Bohol",
  date: "2026-10-24",
  passengers: 2,
});
const options = routes
  .filter((r) => r.origin === "Cebu City" && r.destination === "Bohol")
  .map((r) => fromLegacyRoute(r, request.departureDate));
async function main() {
  assert.equal(resolveLocation(" CEB ").market, "Cebu City");
  assert.ok(suggestLocations("Ceb").some((l) => l.code === "CEB"));
  assert.ok(suggestLocations("Boh").some((l) => l.name === "Panglao"));
  assert.throws(
    () =>
      toTravelRequest({
        origin: "Cebu",
        destination: "Cebu City",
        date: "2026-10-24",
        passengers: 1,
      }),
    /different/,
  );
  assert.throws(
    () =>
      toTravelRequest({
        origin: "Atlantis",
        destination: "Bohol",
        date: "2026-10-24",
        passengers: 1,
      }),
    /suggestions/,
  );
  assert.equal(getBestValueRoute(options, 2).provider, "OceanJet");
  assert.equal(getCheapestRoute(options, 2).provider, "SuperCat");
  assert.equal(getFastestRoute(options, 2).provider, "Philippine Airlines");
  assert.equal(totalPrice(getCheapestRoute(options), 2), 1300);
  assert.ok(getRecommendations(options, 2)[1].note.includes("300"));
  assert.equal(getBestValueRoute([]), undefined);
  assert.equal(getCheapestRoute([]), undefined);
  assert.equal(getFastestRoute([]), undefined);
  assert.equal(getBestValueRoute([options[0]]).id, options[0].id);
  assert.ok(
    scoreOptions([options[0], { ...options[0], id: "same-fare-time" }]).every(
      (o) => Number.isFinite(o.score),
    ),
  );
  const direct = { ...options[0], id: "direct" },
    transfer = { ...options[0], id: "transfer", transferCount: 1 };
  assert.equal(getBestValueRoute([transfer, direct]).id, "direct");
  assert.equal(
    getBestValueRoute([{ ...options[0], pricePerTraveler: NaN }]),
    undefined,
  );
  const before = options.map((o) => o.id);
  rankOptions(options, "Fastest", 2);
  assert.deepEqual(
    options.map((o) => o.id),
    before,
  );
  const tied = [
    { ...options[0], id: "z" },
    { ...options[0], id: "a" },
  ];
  assert.equal(getCheapestRoute(tied).id, "a");
  const duplicate = {
    ...options[0],
    id: "another-aggregator",
    pricePerTraveler: 750,
  };
  const deduped = deduplicateOptions([options[0], duplicate, options[1]]);
  assert.equal(deduped.length, 2);
  assert.equal(deduped[0].pricePerTraveler, 750);
  const ferry = new MockTravelProvider("ferry", "Ferries", "ferry", 0);
  const flights = new MockTravelProvider("flight", "Flights", "flight", 0);
  const failed = new MockTravelProvider(
    "failed",
    "Failing provider",
    "flight",
    0,
    true,
  );
  const result = await searchTravelOptions(request, [ferry, flights]);
  assert.equal(result.options.length, 3);
  assert.equal(result.warnings.length, 0);
  assert.equal(result.options[0].id, "oceanjet");
  assert.ok(result.options[0].segments[0].departureTime.includes("2026-10-24"));
  const partial = await searchTravelOptions(request, [ferry, failed]);
  assert.equal(partial.options.length, 2);
  assert.equal(partial.warnings.length, 1);
  await assert.rejects(
    () => searchTravelOptions(request, [failed]),
    /could not check/,
  );
  const duplicateProvider = {
    id: "duplicate",
    name: "Aggregator",
    search: async () => [duplicate],
  };
  assert.equal(
    (await searchTravelOptions(request, [ferry, duplicateProvider])).options
      .length,
    2,
  );
  const empty = await searchTravelOptions(
    { ...request, origin: request.destination, destination: request.origin },
    [ferry, flights],
  );
  assert.equal(empty.options.length, 0);
  const airport = await searchTravelOptions(
    { ...request, origin: resolveLocation("CEB") },
    [ferry, flights],
  );
  assert.equal(airport.options.length, 1);
  assert.equal(airport.options[0].mode, "flight");
  console.log(
    "PASS: selectors, totals, normalization, tie/empty/single cases, transfer scoring, deduplication, async aggregation, partial/all failures and airport filtering.",
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
