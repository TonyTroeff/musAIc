# musAIc

A personal music diary that helps you explore and reflect on your Spotify listening habits.

## Structure

- `backend/` — Express API (http://localhost:3030)
- `frontend/` — React SPA built with Vite (http://localhost:8080)

Both apps use TypeScript with strict type checking. Each part has its own `package.json` and `node_modules`. Requires Node.js 22+.

## Authentication

Users sign in with Spotify through [Clerk](https://clerk.com). The frontend and backend share one origin
(Vite proxies `/api` to Express in development), so Clerk's session cookie authenticates API calls.
The backend reads the user's Spotify access token from Clerk and calls the Spotify Web API with it.

Setup:

1. Create `backend/.env.local` and `frontend/.env.local` (see the `.env.example` files), or run
   `clerk env pull` in each folder.
2. Start both apps: `npm run dev` in `backend/` and in `frontend/`.
3. Open http://localhost:8080 and sign in with Spotify. `GET /api/me` returns your Clerk user id and Spotify profile.

For listening history, include `user-read-recently-played` in the Spotify OAuth scopes configured
for the Clerk Spotify connection. Existing users may need to reconnect Spotify to grant this scope.
See [Spotify's recently played endpoint](https://developer.spotify.com/documentation/web-api/reference/get-recently-played).
Signed-in users see their latest 50 listening events on the home page, newest first, grouped by their
local calendar day. `GET /api/recently-played` returns these events; repeated listens remain separate.

## Type checking and builds

Run `npm install` in both folders to install their dependencies.

- Run `npm run typecheck` in either folder to check types. The frontend also checks Cypress support and spec files.
- Run `npm run build` in `frontend/` to check types and build the Vite app into `dist/`.
- Run `npm run build` in `backend/` to compile the API into `dist/`, then `npm start` to run it. `npm run dev` runs the TypeScript source with automatic restart.

The `/api/me` and `/api/recently-played` response contracts live in `backend/src/types/api.ts`;
the frontend imports them as types only.
