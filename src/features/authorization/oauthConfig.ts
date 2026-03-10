const authEndpoint = "https://accounts.spotify.com/authorize";

const scopes = [
  "user-read-private",
  "user-read-email",
  "playlist-modify-public",
  "playlist-modify-private",
  "user-top-read",
  "user-library-read",
];

export const getAuthorizeHref = async (): Promise<string> => {
  const { generateCodeVerifier, generateCodeChallenge } = await import("../../utils/pkce");
  const verifier = generateCodeVerifier();
  const challenge = await generateCodeChallenge(verifier);
  sessionStorage.setItem("pkce_verifier", verifier);

  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_REDIRECT_URI;

  const params = new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    redirect_uri: redirectUri,
    scope: scopes.join(" "),
    code_challenge_method: "S256",
    code_challenge: challenge,
  });

  return `${authEndpoint}?${params.toString()}`;
};
