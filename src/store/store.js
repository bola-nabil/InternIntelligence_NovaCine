import { configureStore } from "@reduxjs/toolkit";
import mediaReducer from "./slices/mediaSlice";
import carouselReducer from "./slices/carouselSlice";
import modalReducer from "./slices/modalSlice";
import genresReducer from "./slices/genersSlice";

const store = configureStore({
  reducer: {
    media: mediaReducer,
    carousel: carouselReducer,
    modal: modalReducer,
    genres: genresReducer,
  },
});

export default store;
