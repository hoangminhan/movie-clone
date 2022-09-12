import { createSlice } from "@reduxjs/toolkit";
import {
  getDetail,
  getDetailMovie,
  getListTrending,
  handleGetListMovie,
  handleGetListMovieTopRated,
} from "./api-thunk";
const initialState = {
  listMovie: [],
  listMovieTopRated: [],
  isLoading: false,
  detail: {
    currentPage: 1,
    totalPages: 1,
  },
  listTrending: [],
  detailTrending: {
    currentPage: 1,
    totalPages: 1,
  },
  detailMovie: {},
};
export const movieSlice = createSlice({
  name: "movie",
  initialState,
  extraReducers: {
    // handle get list movie
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
    // movie top rated
    [handleGetListMovieTopRated.pending]: (state, action) => {
      state.isLoading = true;
    },
    [handleGetListMovieTopRated.fulfilled]: (state, action) => {
      const { results, page, total_pages } = action.payload;
      state.listMovieTopRated = results;
      // state.detail = {
      //   ...state.detail,
      //   currentPage: page,
      //   totalPages: total_pages,
      // };
      state.isLoading = false;
    },
    [handleGetListMovieTopRated.rejected]: (state, action) => {
      state.isLoading = false;
    },

    // handle get list trending
    [getListTrending.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getListTrending.fulfilled]: (state, action) => {
      const { results, page, total_pages } = action.payload;
      state.listTrending = results;
      state.detailTrending = {
        ...state.detailTrending,
        currentPage: page,
        totalPages: total_pages,
      };

      state.isLoading = false;
    },
    [getListTrending.rejected]: (state, action) => {
      state.isLoading = false;
    },
    // get detail movie
    [getDetailMovie.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getDetailMovie.fulfilled]: (state, action) => {
      // console.log(action.payload);

      state.isLoading = false;
    },
    [getDetailMovie.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});
const { reducer, actions } = movieSlice;
export default reducer;
