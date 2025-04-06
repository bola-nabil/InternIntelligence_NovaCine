import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchGenres = createAsyncThunk(
  "genres/fetchGenres",
  async (type) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
      const data = await res.json();
      return data.genres;
    } catch (error) {
      console.log("finding error in geners => ", error);
      return [];
    }
  }
);

export const genersSlice = createSlice({
  name: "genres",
  initialState: {
    genres: [],
    selectedGenres: [],
  },
  reducers: {
    addGenre: (state, action) => {
      const genre = action.payload;
      state.genres = state.genres.filter((g) => g.id !== genre.id);
      state.selectedGenres.push(genre);
    },
    removeGenre: (state, action) => {
      state.selectedGenres = state.selectedGenres.filter(
        (selected) => selected.id !== action.payload.id
      );
      state.genres.push(action.payload);
    },
    clearGenres: (state) => {
      state.genres = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
    });
  },
});

export const { addGenre, removeGenre, clearGenres } = genersSlice.actions;
export default genersSlice.reducer;
