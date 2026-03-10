const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

export const exchangeCodeForToken = async (code: string): Promise<TokenResponse> => {
  const verifier = sessionStorage.getItem("pkce_verifier");
  if (!verifier) throw new Error("No PKCE verifier found");

  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_REDIRECT_URI;

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
    client_id: clientId,
    code_verifier: verifier,
  });

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!response.ok) {
    throw new Error(`Token exchange failed: ${response.statusText}`);
  }

  sessionStorage.removeItem("pkce_verifier");
  return response.json();
};

export const refreshAccessToken = async (refreshToken: string): Promise<TokenResponse> => {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;

  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: clientId,
  });

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!response.ok) {
    throw new Error(`Token refresh failed: ${response.statusText}`);
  }

  return response.json();
};
