# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Commands

```bash
yarn          # Install dependencies
yarn start    # Run dev server via react-scripts (http://localhost:3000)
yarn dev      # Run dev server via Parcel (http://localhost:1234)
yarn build    # Production build
yarn test     # Run tests (Jest + React Testing Library)
yarn lint     # ESLint on src/**/*.{js,jsx,tsx}
yarn format   # Prettier on src/**/*.{js,html}
```

To run a single test file:
```bash
yarn test --testPathPattern=App.test.tsx
```

## Environment Variables

Create a `.env` file at the root with:
- `REACT_APP_SPOTIFY_CLIENT_ID` — Spotify app client ID
- `REACT_APP_REDIRECT_URI` — OAuth redirect URI (e.g. `http://localhost:3000`)

## Architecture

This is a React + TypeScript app using the Spotify Web API with OAuth implicit flow.

**Auth flow:** `WelcomePage` shows the `Authorization` component, which redirects to Spotify's OAuth endpoint. On callback, the access token arrives in the URL hash. `Authorization.tsx` reads it at module load time via `hashUtils.getHashParams()`, strips the hash from the URL, then dispatches token/login actions to Redux. Once `isLoggedIn` is true, `WelcomePage` redirects to `/main`.

**State management:** Redux Toolkit with `redux-persist` (persists to `localStorage`). Two slices:
- `authorization` — `loggedIn`, `accessToken`, `tokenExpiryDate`
- `spotifyExample` — `displayName`, `product` (fetched from `GET /v1/me`)

**Routing:** React Router v5 with two routes: `/` (WelcomePage) and `/main` (MainPage).

**Styling:** Mix of inline styles defined in `src/styles/*.ts` files (returning `CSSProperties` objects) and CSS files. Material-UI v4 used for UI components.

**Feature slices** live in `src/features/<feature>/` — each feature owns its slice and components. API calls are done as `AppThunk` actions directly in the slice file.
