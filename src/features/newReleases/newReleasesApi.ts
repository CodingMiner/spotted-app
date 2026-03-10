import { spotifyApi } from "../../services/spotifyApi";

interface Album {
  id: string;
  name: string;
  artists: Array<{ name: string }>;
  images: Array<{ url: string }>;
  release_date: string;
  total_tracks: number;
  external_urls: { spotify: string };
}

interface NewReleasesResponse {
  albums: { items: Album[]; total: number; offset: number; limit: number };
}

export const newReleasesApi = spotifyApi.injectEndpoints({
  endpoints: (builder) => ({
    getNewReleases: builder.query<NewReleasesResponse, number>({
      query: (offset = 0) => `/browse/new-releases?limit=20&offset=${offset}`,
    }),
  }),
});

export const { useGetNewReleasesQuery } = newReleasesApi;
