import { configureStore } from "@reduxjs/toolkit";
import storeMovie from "features/home-page/movie-slice";
import storeModal from "features/modal/slice-modal";

export const store = configureStore({
  reducer: {
    storeMovie,
    storeModal,
  },
});
