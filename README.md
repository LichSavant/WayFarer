# WayFarer

Frontend-only travel comparison prototype built with Expo SDK 55, React Native, TypeScript (strict), and Expo Router. No backend, accounts, payments, or transport APIs.

## Run

```powershell
npm install
npm start
# Or launch the responsive browser version
npm run web
# Type checking
npm run typecheck
# Production web bundle
npx expo export --platform web
```

Scan the terminal QR code using an Expo Go version compatible with SDK 55, or press `a` for an Android emulator. iOS simulator execution requires macOS; a physical iPhone can use Expo Go.

## Try the flow

Explore defaults to Cebu City → Bohol, October 24, 2026. Change either city, swap endpoints, select a demo date or 1–6 adult passengers, and search. Compare OceanJet, SuperCat, and a mock Philippine Airlines flight; sort by Best, Cheapest, or Fastest and combine with transport/direct filters. Open an itinerary, save it, then visit Saved. Remove it using the trash button or toggle Save in the itinerary. Continue opens a booking placeholder; Share uses the native platform share facility.

Other supported sample searches: Cebu City → Manila, Cebu City → Siargao, and Manila → Boracay. Unsupported searches (including reverse directions) intentionally show an empty state. All schedules, flights, fares, and allowances are illustrative, including the Cebu–Bohol flight. Fares multiply by the passenger count. Best ranking uses fare + duration in minutes × 8, a simple demo score. All prices are PHP. Dates are a fixed mock selection, October 24–28, 2026.

## Structure

- `app/`: root stack, four bottom tabs, results, and dynamic route detail
- `components/`: reusable search, result, popular destination, timeline, badges, chips, and shared UI primitives (`ui.tsx` includes SectionHeader and EmptyState)
- `types/`: route/search/saved itinerary, trip, and user models
- `data/`: local route repository, destination content, and example trip
- `store/TravelContext.tsx`: session search and saved itinerary state

`routeRepository` is the service boundary for future backend work. Saved items retain their date and passenger count independently of the current search. State resets on app reload. Trips is explicitly a demonstration, not a booking. Profile options are local prototype settings; notification switches do not schedule actual notifications.

## Frontend follow-ups

- Add local persistence for saved itineraries/preferences if desired.
- Replace the fixed mock date list with a full calendar when needed.
- Bundle licensed destination photography locally for offline use; current destination photos load from Unsplash, with a muted color fallback.
- Perform physical iOS and Android accessibility, large-font, keyboard, and sharing QA.
- Add provider-confirmed content and account/booking flows only in a later integration phase.

The original empty root `index.html` is unused. Expo Router owns both native and web entry points.

Validation: `npm run typecheck` and `node scripts/check-routes.cjs` cover strict types and local route data behavior. Package installation reported 35 dependency advisories (14 moderate, 21 high); review these before release. No automated browser or physical-device UI pass has been performed.
