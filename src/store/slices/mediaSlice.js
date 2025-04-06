import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMedia = createAsyncThunk(
  "media/fetchMedia",
  async ({ mediaUrl }, { rejectWithValue }) => {
    try {
      const res = await fetch(mediaUrl);
      const data = await res.json();
      return { results: data.results, totalPages: data.total_pages };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const mediaSlice = createSlice({
  name: "media",
  initialState: {
    genres: [],
    selectedGenres: [],
    page: 1,
    content: [],
    numOfPages: 1,
    status: "idle",
    error: null,
    searchText: "",
    type: 0,
  },
  reducers: {
    setGenres: (state, action) => {
      state.genres = action.payload;
    },
    setSelectedGenres: (state, action) => {
      state.selectedGenres = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMedia.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMedia.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.content = action.payload.results;
        state.numOfPages = action.payload.totalPages;
      })
      .addCase(fetchMedia.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setGenres, setPage, setSelectedGenres, setSearchText, setType } =
  mediaSlice.actions;
export default mediaSlice.reducer;
