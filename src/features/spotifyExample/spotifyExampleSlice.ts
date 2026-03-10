import { createSlice } from "@reduxjs/toolkit";

// This slice is kept for backwards compatibility but profile data
// has been moved to authorizationSlice
const spotifyExampleSlice = createSlice({
  name: "spotifyExample",
  initialState: {},
  reducers: {},
});

export default spotifyExampleSlice.reducer;
