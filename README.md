# WayFarer

A responsive travel comparison frontend using the existing Expo SDK 55, Expo Router, React Native Web and strict TypeScript stack. All travel inventory is mock data. No backend, authentication, transport API, scraping, booking or payment integration.

## Run

```powershell
npm install
npm run web
# Native development (requires a compatible Expo Go SDK 55 client)
npm start
# Verification
npm run typecheck
npm test
npx expo export --platform web
```

## Try it

1. On Explore, type `Ceb`, choose Cebu City, then type `Boh` and choose Bohol. Airport/seaport suggestions restrict the mock search to the corresponding transport mode.
2. Choose a mock departure date (October 24–28, 2026) and 1–6 adults. Swap and validation remain available.
3. Search routes. A brief provider-checking modal precedes results.
4. Compare Best Value, Cheapest and Fastest. For two travelers, the sample picks are OceanJet at PHP 1,600 total, SuperCat at PHP 1,300 total, and Philippine Airlines at PHP 4,900 total.
5. Sort/filter All routes independently of the recommendations. Open a trip, save/share it, view it under Saved, or remove it locally.
6. Continue to provider opens a preview explaining that booking/payment will happen with the provider. It does not redirect or book.

Other mock markets: Cebu City to Manila, Cebu City to Siargao, and Manila to Boracay. Reverse/unsupported searches show an empty state. Cebu–Bohol flight inventory and all schedules/fares/baggage allowances are illustrative, not confirmed services. State resets on reload. Trips remains an explicitly labeled demo.

## Architecture

- `app/`: existing four tabs, results and itinerary stack retained.
- `components/`: responsive site header, location autocomplete, search form/progress, recommendation cards, result cards, segment timeline, booking preview, shared UI primitives.
- `hooks/useResponsive.ts`: native-compatible window dimensions; desktop web navigation at 1024+, tablet layouts at 768+.
- `data/locations.ts`: city/island/airport/seaport directory, suggestions and mock market resolution, separate from inventory.
- `types/travel.ts`: `TravelSearchRequest`, `TravelProvider`, `TravelOption`, `JourneySegment` and transitional `JourneyRoute` view model. Segments support flight, ferry, bus, van and train. The form keeps its existing string state; the request adapter resolves typed locations at the service boundary.
- `services/travel/`: mock flight/ferry providers, asynchronous aggregation via `Promise.allSettled`, invalid-result exclusion, deduplication and adapters. Screens do not call provider implementations. A failed provider yields warnings alongside other results; complete failure offers retry.
- `utils/ranking.ts`, `utils/recommendations.ts`, `config/ranking.ts`: pure comparison functions and explanation generation.
- `store/TravelContext.tsx`: search draft, submitted request/results, loading/error state and saved itineraries. Search sequence guards prevent stale asynchronous results replacing a newer search. Saved routes retain date/traveler count and segment information.

Deduplication keys use the operating provider, mode, terminal identities and departure/arrival timestamps for every segment. Same-inventory duplicate offers retain the lowest per-traveler fare, with a deterministic ID tie break. All providers currently return PHP; currency conversion is not implemented.

## Recommendations

Cheapest minimizes `pricePerTraveler × travelers`. Fastest minimizes `totalDurationMinutes`, which providers must supply inclusive of transfers/waiting. Best Value uses min-max normalization of total price and total journey duration across valid candidates:

```text
score = normalizedPrice × 0.55
      + normalizedDuration × 0.35
      + (transferCount / max(1, largestTransferCount)) × 0.10
      - (direct ? 0.03 : 0)
```

Lower is better. Equal ranges normalize to zero. Ties resolve by total fare, total duration, then ID. No route IDs determine picks. Best Value is deterministic, not AI. Picks can overlap and explain that when appropriate. All routes sorts use the same candidate scoring before applying list filters, so a filter does not silently change the recommendation baseline.

## Responsive behavior

- Desktop web (1024+): top navigation, two-column hero, horizontal search, three recommendation columns, horizontal result rows, and itinerary/price sidebar.
- Tablet (768–1023): compact header and bottom tabs, two-column hero/destinations, stacked search, full-width Best Value followed by two secondary recommendations, and two-column itinerary details.
- Mobile: stacked search and itinerary, single-column picks/results, bottom tabs and scrollable dialogs.
- Profile and Trips retain constrained readable content widths. Shared website content caps at 1200px.

## Verification and limitations

`npm run typecheck` and `npm test` pass. Tests cover location resolution, totals, ranking ties/empty/single-result cases, transfer preferences, immutability, deduplication, aggregation, provider failures and airport filtering. Production bundling is checked separately.

Visual browser/device checks at 1440, 1280, 1024, 768 and mobile widths remain pending: this session exposed no connected browser, and both in-app-browser and Chrome connection attempts reported unavailable. Native device, large-text, keyboard focus and real share-sheet QA are also pending. Destination photographs load from Unsplash and have a muted-color fallback.

## Later integration TODOs

- Add authorized provider adapters behind `TravelProvider`; keep credentials server-side when that phase is authorized.
- Normalize provider locations, time zones, complete segment durations, taxes, baggage and final total-fare semantics; add currency conversion if required.
- Replace simulated delay/status with provider progress, timeouts, cancellation and caching.
- Validate real inventory identities/deduplication and safe booking-provider links; implement provider redirects only when available.
- Add full calendar availability and optional persistent saved trips/preferences.
- Review existing package dependency advisories before release; no packages were added for this MVP update.

The original empty root `index.html` is unused; Expo Router owns the native/web entry points.

## Files changed in this MVP update

Modified: `app/(tabs)/_layout.tsx`, `app/(tabs)/index.tsx`, `app/(tabs)/profile.tsx`, `app/(tabs)/trips.tsx`, `app/results.tsx`, `app/route/[id].tsx`; `components/PopularRouteCard.tsx`, `RouteCard.tsx`, `RouteTimeline.tsx`, `SearchCard.tsx`, `TransportBadge.tsx`, `ui.tsx`; `data/routes.ts`, `data/popularRoutes.ts`; `store/TravelContext.tsx`, `types/route.ts`, `package.json`, `scripts/check-routes.cjs`, and this README.

Created: `components/BookingModal.tsx`, `Icon.tsx`, `LocationInput.tsx`, `RecommendationCard.tsx`, `SearchProgress.tsx`, `SiteHeader.tsx`, `theme.ts`; `config/ranking.ts`; `data/locations.ts`; `hooks/useResponsive.ts`; `services/travel/adapters.ts`, `deduplicate.ts`, `MockTravelProvider.ts`, `searchTravelOptions.ts`; `types/location.ts`, `types/travel.ts`; `utils/ranking.ts`, `utils/recommendations.ts`; `scripts/check-travel.cjs`.

Commands run successfully: `npm run typecheck`, `npm test`, `npx expo export --platform web`, `npx expo export --platform android`, `git diff --check`. The development server started on port 8082 (8081 was already occupied) and returned HTTP 200. Visual breakpoint checks remain pending as noted above.

## Glass visual redesign

The homepage now uses a full-bleed local destination image and a large architectural dark-glass frame. Desktop hero height targets 96% of the viewport; its 92%-wide frame caps at 1400px, targets 74% of the viewport height and grows as needed for content. Mobile retains the image with a stacked search and scrollable content. Navigation remains inside the hero frame, while other screens use the bright header. Popular routes now use image-led cards and dark translucent fare overlays. Best Value receives more width and stronger typography than the secondary recommendations; All routes and itinerary details remain mostly solid/readable.

### Reusable system

- Added `components/glass/GlassSurface.tsx`, `GlassPanel.tsx`, `GlassButton.tsx` and `styles.ts`.
- Added `components/hero/DestinationHero.tsx` and `components/RecommendationsSection.tsx`.
- Extended `components/theme.ts` with dark/light/strong glass tints, separators, highlight and text colors; structural/functional/micro blur levels; small/medium/large/hero radii; soft/elevated shadows; hero/content layout tokens; native fallback colors; and the pale aqua CTA accent.
- The centralized web style boundary uses `Platform.select` and a typed style extension for `backdropFilter` and `WebkitBackdropFilter`. Structural blur is 22px; functional blur is 16px. Native builds receive translucent tint fallbacks without web CSS properties. No `as any` casts or new packages were needed.

### Motion and performance

The new brief's calm-motion direction replaces continuous carousel autoplay/zoom with manual image selection and a brief reduced-motion-aware fade. Only the selected hero image is mounted. Generic photo captions do not claim to depict the selected destination. `destinationImagery` and `getDestinationSlide` provide the future verified destination-image mapping boundary.

The hero has one major backdrop blur. Embedded search, micro controls, destination overlays and individual pick panels do not add heavy filters. Only open dropdowns/dialogs use an additional small functional blur. Recommendations share one light-blur environmental surface. Local imagery is reused; popular route thumbnails still load from Unsplash.

### Files modified

`app/(tabs)/index.tsx`, `app/results.tsx`; `components/CinematicHero.tsx`, `LocationInput.tsx`, `PopularRouteCard.tsx`, `RecommendationCard.tsx`, `SearchCard.tsx`, `SearchProgress.tsx`, `SiteHeader.tsx`, `theme.ts`, `ui.tsx`; `data/heroSlides.ts`, `hooks/useHeroCarousel.ts`, and this README.

### Checks and remaining frontend work

Strict TypeScript and existing functional tests pass. A React Native Web server-render smoke check confirms emission of both blur properties and no nested blur for embedded/micro surfaces. Production web bundling is checked separately.

Visual browser checks at 1440, 1280, 1024, 768 and mobile widths remain pending because no connected browser was available. Confirm glass/contrast/focus behavior in Chrome and Safari, test native fallbacks on physical devices, and add verified destination-specific photography/mappings. No backend, APIs, authentication or payment integration was added.
