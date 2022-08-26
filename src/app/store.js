import { configureStore } from "@reduxjs/toolkit";
import storeMovie from "features/home-page/movie-slice";

export const store = configureStore({
  reducer: {
    storeMovie,
  },
});
