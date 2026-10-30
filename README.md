# ShopCart — Modern Client-Side State Management in React

An interactive e-commerce cart and checkout application built with React 19, TypeScript, and Vite, backed by a local `json-server` mock REST API.

This project demonstrates and compares three client-side state management paradigms (React Context + `useReducer`, Zustand, and Jotai) combined with XState v5 for complex UI state orchestration.

---

## Branching Tree Architecture

The repository is structured into four dependent branches according to the assignment specification:

```text
master (React + Vite Boilerplate, Types, db.json, Proxy Config, UI Shell)
├── deliverable-1-context (PR1 → base branch: master)
│
├── deliverable-2-zustand (PR2 → base branch: master)
│   │
│   └── deliverable-4-xstate (PR4 → base branch: deliverable-2-zustand)
│
└── deliverable-3-jotai (PR3 → base branch: master)
```

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
