import { spotifyApi } from "../../services/spotifyApi";

interface UserProfile {
  id: string;
  display_name: string;
  email: string;
  product: string;
  followers: { total: number };
  images: Array<{ url: string }>;
  country: string;
  external_urls: { spotify: string };
}

export const profileApi = spotifyApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<UserProfile, void>({
      query: () => "/me",
    }),
    updateDisplayName: builder.mutation<void, string>({
      query: (display_name) => ({
        url: "/me",
        method: "PUT",
        body: { display_name },
      }),
    }),
  }),
});

export const { useGetProfileQuery, useUpdateDisplayNameMutation } = profileApi;
