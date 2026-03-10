# 🎵 Spotted

A Spotify web app to browse your playlists, favourites, new releases, recommendations and profile — built with React, TypeScript and MUI.

🌐 **Live:** [codingminer.github.io/spotted-app](https://codingminer.github.io/spotted-app/)

## 🛠️ Tech Stack

- ⚛️ React 19 + TypeScript 5.6
- ⚡ Vite 6
- 🎨 MUI v6 + Emotion
- 🗂️ Redux Toolkit 2 + RTK Query + redux-persist
- 🔀 React Router v7
- 🔐 OAuth 2.0 Authorization Code + PKCE
- 🧪 Vitest + React Testing Library

## 🚀 Local Setup

### 1. Install dependencies

```bash
yarn
```

### 2. Create a Spotify app

1. Go to [developer.spotify.com/dashboard](https://developer.spotify.com/dashboard) and create an app
2. Note your **Client ID**
3. Under **Redirect URIs** add `https://codingminer.github.io/spotted-app/` (production) and your ngrok URL (local dev — see step 4)

### 3. Create `.env`

```bash
cp .env.example .env
```

Fill in your values:

```
VITE_SPOTIFY_CLIENT_ID=your_client_id_here
VITE_REDIRECT_URI=https://your-ngrok-url.ngrok-free.app
```

### 4. Set up ngrok (required for local OAuth)

Spotify's OAuth server rejects plain `http://localhost` redirect URIs. ngrok provides a public HTTPS URL that Spotify accepts.

```bash
# Install and authenticate ngrok (one-time)
npx ngrok config add-authtoken YOUR_NGROK_TOKEN

# Start the tunnel (run this every dev session)
npx ngrok http 8080
```

Copy the `https://` URL ngrok prints (e.g. `https://abc123.ngrok-free.app`) and:

- Set it as `VITE_REDIRECT_URI` in `.env`
- Add it to **Redirect URIs** in your Spotify app dashboard

> ⚠️ **Note:** ngrok URLs change every session (on the free plan). Update `.env` and the Spotify dashboard each time.

### 5. Start the dev server

```bash
yarn dev
```

Open the app via the **ngrok URL** (not localhost) — Spotify redirects back to that URL after login.

## 📜 Scripts

```bash
yarn dev      # Dev server on http://localhost:8080
yarn build    # Production build (tsc + vite build)
yarn test     # Run tests (Vitest)
yarn lint     # ESLint v9
yarn format   # Prettier
```

## 📦 Deployment

The app is automatically deployed to GitHub Pages on every push to `master` via GitHub Actions. The `VITE_SPOTIFY_CLIENT_ID` secret must be set in the repository's `github-pages` environment secrets.
