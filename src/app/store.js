import { configureStore } from "@reduxjs/toolkit";
import storeMovie from "features/home-page/home-page-slice";
import storeModal from "features/modal/slice-modal";
import storePeople from "features/people/people-slice";

export const store = configureStore({
  reducer: {
    storeMovie,
    storeModal,
    storePeople,
  },
});
