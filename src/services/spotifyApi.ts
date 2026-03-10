import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { RootState } from "../store";
import { logout } from "../features/authorization/authorizationSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://api.spotify.com/v1",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).authorization.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithLogout: BaseQueryFn<FetchArgs | string, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error?.status === 401) {
    api.dispatch(logout());
  }
  return result;
};

export const spotifyApi = createApi({
  reducerPath: "spotifyApi",
  baseQuery: baseQueryWithLogout,
  endpoints: () => ({}),
});
