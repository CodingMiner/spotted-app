import { spotifyApi } from "../../services/spotifyApi";

interface Track {
  id: string;
  name: string;
  artists: Array<{ name: string }>;
  album: { images: Array<{ url: string }>; name: string };
  uri: string;
  external_urls: { spotify: string };
}

interface ArtistTopTracksResponse {
  tracks: Track[];
}

export const recommendationsApi = spotifyApi.injectEndpoints({
  endpoints: (builder) => ({
    getArtistTopTracks: builder.query<ArtistTopTracksResponse, string>({
      query: (artistId) => `/artists/${artistId}/top-tracks`,
    }),
  }),
});

export const { useGetArtistTopTracksQuery } = recommendationsApi;
