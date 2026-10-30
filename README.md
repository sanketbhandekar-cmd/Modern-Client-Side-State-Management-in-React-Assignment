# ShopCart — Modern Client-Side State Management in React

An interactive e-commerce cart and checkout application built with React 19, TypeScript, and Vite, backed by a local `json-server` mock REST API.

This project demonstrates and compares three client-side state management paradigms (React Context + `useReducer`, Zustand, and Jotai) combined with XState v5 for complex UI state orchestration.

---

## Deliverable 3: Jotai

- **Cart as Atoms**: Defined a primitive atom (`cartItemsAtom`) in `src/cartAtoms.ts` to hold the cart array outside of React components.
- **Derived Read-Only Atoms**: Created `cartCountAtom` and `cartTotalAtom` to compute total items and price dynamically without duplicating state or using `useMemo`.
- **Action Atoms**: Created write-only action atoms (`addItemAtom`, `removeItemAtom`, and `clearCartAtom`) using `atom(null, (get, set, ...))` to encapsulate state updates.
- **Fine-Grained Subscriptions with Hooks**:
  - `CartBadge`: Uses `useAtomValue(cartCountAtom)` to only read and re-render on count changes.
  - `ProductCard`: Uses `useSetAtom(addItemAtom)` so it never subscribes to cart state changes and avoids re-rendering.
  - `CartItemsList`: Uses `useAtomValue(cartItemsAtom)` for item list and `useSetAtom(removeItemAtom)` for removal.
  - `CartDrawer`: Uses `useAtomValue(cartTotalAtom)` and `useAtomValue(cartCountAtom)` to show total and conditionally render checkout and clear buttons.
- **Catalog Fetch**: Updated `Catalog` to fetch products from `GET /api/products` on mount with loading and error states.

---

## Running the Application

The development environment runs across two terminal windows:

### Terminal 1: Frontend (Vite)
```bash
npm run dev
```
Starts the Vite development server at `http://localhost:5173/`.

### Terminal 2: Mock API (json-server)
```bash
npm run server
```
Starts `json-server` watching `db.json` on port `3001` with an artificial 1.5s network delay (`--delay 1500`).

---

## API Endpoints (Proxied via Vite `/api/...`)

- `GET /api/products`: Retrieves the catalog list.
- `POST /api/orders`: Submits an order payload (`{ items, total, ... }`), writes to `db.json`, and returns a `201 Created` response.

---

## Scripts

- `npm run dev`: Start Vite development server
- `npm run server`: Start local mock API server on port 3001
- `npm run build`: Type-check with `tsc` and build for production
- `npm run lint`: Run ESLint checks
- `npm run preview`: Preview the production build locally
