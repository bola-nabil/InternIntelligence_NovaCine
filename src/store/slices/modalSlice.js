import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk(
  "modal/fetchData",
  async ({ dataUrl }, { rejectWithValue }) => {
    try {
      const res = await fetch(dataUrl);
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchVideo = createAsyncThunk(
  "modal/fetchVideo",
  async ({ videoUrl }, { rejectWithValue }) => {
    try {
      const res = await fetch(videoUrl);
      const data = await res.json();
      return data.results[0]?.key;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    open: false,
    content: [],
    video: [],
  },
  reducers: {
    setOpen: (state, action) => {
      state.open = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.content = action.payload;
      })
      .addCase(fetchVideo.fulfilled, (state, action) => {
        state.video = action.payload;
      });
  },
});

export const { setOpen } = modalSlice.actions;
export default modalSlice.reducer;
