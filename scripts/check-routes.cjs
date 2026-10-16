const fs = require("node:fs");
const ts = require("typescript");
const assert = require("node:assert/strict");
const source = fs.readFileSync("data/routes.ts", "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;
const mod = { exports: {} };
new Function("exports", "require", "module", compiled)(
  mod.exports,
  require,
  mod,
);
const { routeRepository, fare, duration } = mod.exports;
const search = {
  origin: " Cebu ",
  destination: "Bohol",
  date: "2026-10-24",
  passengers: 1,
};
const results = routeRepository.search(search);
assert.equal(results.length, 3);
assert.equal(results.filter((r) => r.mode === "ferry").length, 2);
assert.equal(
  [...results].sort((a, b) => a.price - b.price)[0].provider,
  "SuperCat",
);
assert.equal(
  [...results].sort((a, b) => a.durationMinutes - b.durationMinutes)[0].id,
  "pal",
);
assert.equal(
  routeRepository.search({ ...search, origin: "Bohol", destination: "Cebu" })
    .length,
  0,
);
assert.equal(routeRepository.get("unknown"), undefined);
assert.equal(duration(120), "2h");
assert.equal(duration(50), "50m");
assert.equal(fare(1600), "\u20b11,600");
console.log(
  "Passed: route matching, mode selection, ordering, missing routes, and formatting.",
);
