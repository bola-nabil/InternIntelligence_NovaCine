import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCredits = createAsyncThunk(
  "carousel/fetchCredits",
  async ({ mediaUrl }, { rejectWithValue }) => {
    try {
      const res = await fetch(mediaUrl);
      const data = await res.json();
      return data.cast;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const carouselSlice = createSlice({
  name: "carousel",
  initialState: {
    credits: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCredits.fulfilled, (state, action) => {
      state.credits = action.payload;
    });
  },
});

export default carouselSlice.reducer;
