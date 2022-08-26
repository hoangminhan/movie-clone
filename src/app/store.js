import { configureStore } from "@reduxjs/toolkit";
import storeMovie from "features/movie/movie-slice";

export const store = configureStore({
  reducer: {
    storeMovie,
  },
});
