# ShopCart — Modern Client-Side State Management in React

An interactive e-commerce cart and checkout application built with React 19, TypeScript, and Vite, backed by a local `json-server` mock REST API.

This project demonstrates and compares three client-side state management paradigms (React Context + `useReducer`, Zustand, and Jotai) combined with XState v5 for complex UI state orchestration.

---

## Deliverable 2: Zustand Store

- **Cart Store (`useCartStore`)**: Created a Zustand store in `src/cartStore.ts` managing `items`, `status` (`'idle' | 'submitting' | 'success' | 'error'`), and actions (`addItem`, `removeItem`, `checkout`, `clear`).
- **Derived Total**: Computed total price as a derived selector (`s.items.reduce(...)`) so derived state is not duplicated in the store.
- **Async Checkout Action**: Added an asynchronous `checkout()` action that reads cart items with `get()`, sends them to `POST /api/orders`, and updates status on completion or failure.
- **Selective Subscriptions**:
  - `CartBadge`: Subscribes only to total item count.
  - `ProductCard`: Subscribes strictly to `addItem` action and is wrapped in `React.memo` so it never re-renders when cart items change.
- **Multiple Values with `useShallow`**: Used `useShallow` in `CartDrawer` and `CartItemsList` when reading multiple values from the store to prevent extra renders.
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
