import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { exchangeCodeForToken, refreshAccessToken } from "../../services/spotifyAuth";

interface AuthorizationState {
  loggedIn: boolean;
  accessToken: string;
  refreshToken: string;
  tokenExpiryDate: string;
  displayName: string;
  product: string;
}

const initialState: AuthorizationState = {
  loggedIn: false,
  accessToken: "",
  refreshToken: "",
  tokenExpiryDate: "",
  displayName: "",
  product: "",
};

export const exchangeCode = createAsyncThunk(
  "authorization/exchangeCode",
  async (code: string) => {
    const tokens = await exchangeCodeForToken(code);
    const expiryDate = new Date();
    expiryDate.setSeconds(expiryDate.getSeconds() + tokens.expires_in);

    const profileResponse = await fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });
    const profile = await profileResponse.json();

    return {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      tokenExpiryDate: expiryDate.toISOString(),
      displayName: profile.display_name || profile.id,
      product: profile.product || "",
    };
  }
);

export const refreshToken = createAsyncThunk(
  "authorization/refreshToken",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const currentRefreshToken = state.authorization.refreshToken;
    const tokens = await refreshAccessToken(currentRefreshToken);
    const expiryDate = new Date();
    expiryDate.setSeconds(expiryDate.getSeconds() + tokens.expires_in);
    return {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token || currentRefreshToken,
      tokenExpiryDate: expiryDate.toISOString(),
    };
  }
);

export const authorizationSlice = createSlice({
  name: "authorization",
  initialState,
  reducers: {
    logout: (state) => {
      state.loggedIn = false;
      state.accessToken = "";
      state.refreshToken = "";
      state.tokenExpiryDate = "";
      state.displayName = "";
      state.product = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(exchangeCode.fulfilled, (state, action) => {
        state.loggedIn = true;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.tokenExpiryDate = action.payload.tokenExpiryDate;
        state.displayName = action.payload.displayName;
        state.product = action.payload.product;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.tokenExpiryDate = action.payload.tokenExpiryDate;
      });
  },
});

export const { logout } = authorizationSlice.actions;

export const selectIsLoggedIn = (state: RootState) => state.authorization.loggedIn;
export const selectAccessToken = (state: RootState) => state.authorization.accessToken;
export const selectTokenExpiryDate = (state: RootState) => state.authorization.tokenExpiryDate;
export const selectDisplayName = (state: RootState) => state.authorization.displayName;
export const selectProduct = (state: RootState) => state.authorization.product;

export default authorizationSlice.reducer;
