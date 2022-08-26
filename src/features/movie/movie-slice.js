import { createSlice } from "@reduxjs/toolkit";
import { handleGetListMovie } from "./api-thunk";
const initialState = {
  listMovie: [],
  isLoading: false,
  detail: {
    currentPage: 1,
    totalPages: 1,
  },
};
export const movieSlice = createSlice({
  name: "movie",
  initialState,
  extraReducers: {
    [handleGetListMovie.pending]: (state, action) => {
      state.isLoading = true;
    },
    [handleGetListMovie.fulfilled]: (state, action) => {
      const { results, page, total_pages } = action.payload;
      state.listMovie = results;
      state.detail = {
        ...state.detail,
        currentPage: page,
        totalPages: total_pages,
      };
      state.isLoading = false;
    },
    [handleGetListMovie.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});
const { reducer, actions } = movieSlice;
export default reducer;
