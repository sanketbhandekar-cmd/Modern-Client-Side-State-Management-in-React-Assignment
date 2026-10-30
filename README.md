# ShopCart — Modern Client-Side State Management in React

An interactive e-commerce cart and checkout application built with React 19, TypeScript, and Vite, backed by a local `json-server` mock REST API.

This project demonstrates and compares three client-side state management paradigms (React Context + `useReducer`, Zustand, and Jotai) combined with XState v5 for complex UI state orchestration.

---

## Deliverable 1: Context + useReducer

- **Cart State with `useReducer`**: Implemented a pure reducer (`cartReducer`) to handle `added`, `removed`, and `cleared` cart actions.
- **Split Contexts**: Separated `CartStateContext` (state) from `CartDispatchContext` (dispatch). Components that only dispatch actions (like `ProductCard`) do not re-render when cart items change.
- **Custom Hooks**: Created `useCartState()` and `useCartDispatch()` with runtime checks that throw an error if called outside `<CartProvider>`.
- **Catalog Fetch**: Updated `Catalog` to fetch products from `GET /api/products` on mount, including loading, error, and empty states.
- **Component Updates**:
  - `CartBadge`: Reads item count directly from `useCartState()`.
  - `ProductCard`: Uses `useCartDispatch()` to add items and is wrapped in `React.memo` to avoid re-renders.
  - `CartItemsList`: Displays cart items, quantities, subtotal, and remove buttons using `useCartDispatch()`.
  - `CartDrawer`: Shows the cart list, calculates the total price, and includes a checkout button.

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
