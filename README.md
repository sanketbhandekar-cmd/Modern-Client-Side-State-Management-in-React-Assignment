# ShopCart — Modern Client-Side State Management in React

An interactive e-commerce cart and checkout application built with React 19, TypeScript, and Vite, backed by a local `json-server` mock REST API.

This project demonstrates and compares three client-side state management paradigms (React Context + `useReducer`, Zustand, and Jotai) combined with XState v5 for complex UI state orchestration.

---

## Deliverable 4: XState v5 Checkout Machine & Zustand Sync

- **Checkout State Machine (`checkoutMachine.ts`)**: Built a finite state machine using XState v5 with qualitative states (`review`, `submitting`, `success`), guards (`hasItems`), and context (`items`, `errorMessage`, `orderResult`).
- **Async Payment Actor & Cancellation**: Used `fromPromise` to send orders to `POST /api/orders`. Passed the native `AbortSignal` to `fetch` so clicking "Cancel" mid-flight aborts the HTTP request in the Network tab and returns to `review`.
- **Shared Checkout Context (`CheckoutContext.tsx`)**: Created an actor context with `createActorContext` so sibling components share a single running checkout actor.
- **Headless Synchronization Bridges**:
  - `CartSynchronizer`: Syncs cart items from Zustand to the running machine via `SYNC_ITEMS` events.
  - `OrderCompletionBridge`: Listens for the emitted `orderSuccess` event from the machine and clears the Zustand store.
- **Decomposed CartDrawer Components**:
  - `CartErrorBanner`: Subscribes specifically to `errorMessage` in machine context.
  - `CheckoutButton`: Declaratively enables/disables using `state.can({ type: 'SUBMIT' })` and displays a Cancel button while submitting.
  - `CartItemsList`: Subscribes only to cart items from the Zustand store.
- **PaymentPanel Component**: Added as a sibling panel in `App.tsx` sharing the checkout actor, showing live payment status, order confirmation, and Submit/Cancel actions.

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
