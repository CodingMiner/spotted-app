import { spotifyApi } from "../../services/spotifyApi";

interface Artist {
  id: string;
  name: string;
  images: Array<{ url: string }>;
  genres: string[];
  popularity: number;
}

interface Track {
  id: string;
  name: string;
  artists: Array<{ name: string }>;
  album: { images: Array<{ url: string }>; name: string };
  popularity: number;
}

interface TopItemsResponse<T> {
  items: T[];
  total: number;
}

export const favoritesApi = spotifyApi.injectEndpoints({
  endpoints: (builder) => ({
    getTopTracks: builder.query<TopItemsResponse<Track>, string>({
      query: (timeRange) => `/me/top/tracks?time_range=${timeRange}&limit=20`,
    }),
    getTopArtists: builder.query<TopItemsResponse<Artist>, string>({
      query: (timeRange) => `/me/top/artists?time_range=${timeRange}&limit=20`,
    }),
  }),
});

export const { useGetTopTracksQuery, useGetTopArtistsQuery } = favoritesApi;
