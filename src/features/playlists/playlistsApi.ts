import { spotifyApi } from "../../services/spotifyApi";

interface Playlist {
  id: string;
  name: string;
  tracks: { total: number };
  images: Array<{ url: string }>;
}

interface PlaylistsResponse {
  items: Playlist[];
  total: number;
}

interface Track {
  id: string;
  name: string;
  artists: Array<{ name: string }>;
  album: { images: Array<{ url: string }>; name: string };
  uri: string;
}

interface SearchResponse {
  tracks: { items: Track[] };
}

export const playlistsApi = spotifyApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserPlaylists: builder.query<PlaylistsResponse, void>({
      query: () => "/me/playlists",
    }),
    createPlaylist: builder.mutation<Playlist, { userId: string; name: string; description?: string }>({
      query: ({ userId, name, description }) => ({
        url: `/users/${userId}/playlists`,
        method: "POST",
        body: { name, description: description || "", public: true },
      }),
    }),
    addTracksToPlaylist: builder.mutation<void, { playlistId: string; uris: string[] }>({
      query: ({ playlistId, uris }) => ({
        url: `/playlists/${playlistId}/tracks`,
        method: "POST",
        body: { uris },
      }),
    }),
    searchTracks: builder.query<SearchResponse, string>({
      query: (q) => `/search?q=${encodeURIComponent(q)}&type=track&limit=20`,
    }),
    getCurrentUser: builder.query<{ id: string; display_name: string }, void>({
      query: () => "/me",
    }),
  }),
});

export const {
  useGetUserPlaylistsQuery,
  useCreatePlaylistMutation,
  useAddTracksToPlaylistMutation,
  useSearchTracksQuery,
  useGetCurrentUserQuery,
} = playlistsApi;
