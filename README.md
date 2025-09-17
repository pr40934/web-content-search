# Frontend – Website Semantic Search

This is the React (Vite) frontend for the Website Semantic Search project.  
It provides a simple UI where the user can enter a **website URL** and a **search query**, then see semantically matched results from the Django backend.

---

## Features
- Input form for **URL** and **Search query**.
- Calls backend API (`/api/search/`) via `fetch`.
- Displays results as cards:
  - Title and snippet
  - Match percentage
  - Toggle button to show/hide raw HTML (pretty formatted)
- Loading indicator while waiting for backend response.

---

## Tech Stack
- **React 18**
- **Vite** (for dev server & build)
- **pretty** (for HTML formatting)

---

## Prerequisites
- Node.js 18+
- npm (comes with Node)

---

## Dependencies
- react
- react-dom
- pretty   ==> npm install pretty
- vite (dev only)

---

## Setup & Run
```bash
# go inside frontend folder
cd frontend

# install dependencies
npm install

# run in dev mode
npm run dev
