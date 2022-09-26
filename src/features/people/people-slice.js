import { createSlice } from "@reduxjs/toolkit";
import {
  getCastTranslation,
  getDetailCast,
  getMovieOfCast,
  getPopularPeople,
  getSocialNetwork,
} from "./api-thunk";

const initialState = {
  dataDetailCast: {},
  dataSocialNetwork: {},
  listMovieOfCast: [],
  dataCastTranslate: {},
  listPopularPeople: [],
  detailPopular: {
    totalPage: 1,
    page: 1,
  },
  isLoadingPeople: false,
};
export const PeopleSlice = createSlice({
  name: "people",
  initialState,
  extraReducers: {
    [getPopularPeople.pending]: (state, action) => {
      state.isLoadingPeople = true;
    },
    [getPopularPeople.fulfilled]: (state, action) => {
      const { page, results, total_pages } = action.payload;
      state.detailPopular = {
        ...state.detailPopular,
        page,
        totalPage: total_pages,
      };

      state.listPopularPeople = [...results];
      state.isLoadingPeople = true;
    },
    [getPopularPeople.rejected]: (state, action) => {
      state.isLoadingPeople = true;
    },
    [getDetailCast.pending]: (state, action) => {
      state.isLoadingPeople = true;
    },
    [getDetailCast.fulfilled]: (state, action) => {
      state.listPopularPeople = { ...action.payload };
      state.isLoadingPeople = true;
    },
    [getDetailCast.rejected]: (state, action) => {
      state.isLoadingPeople = true;
    },
    // translate cast
    [getCastTranslation.pending]: (state, action) => {
      state.isLoadingPeople = true;
    },
    [getCastTranslation.fulfilled]: (state, action) => {
      state.dataCastTranslate = { ...action.payload };
      state.isLoadingPeople = true;
    },
    [getCastTranslation.rejected]: (state, action) => {
      state.isLoadingPeople = true;
    },
    [getSocialNetwork.pending]: (state, action) => {
      state.isLoadingPeople = true;
    },
    [getSocialNetwork.fulfilled]: (state, action) => {
      state.dataSocialNetwork = { ...action.payload };
      state.isLoadingPeople = true;
    },
    [getSocialNetwork.rejected]: (state, action) => {
      state.isLoadingPeople = true;
    },
    [getMovieOfCast.pending]: (state, action) => {
      state.isLoadingPeople = true;
    },
    [getMovieOfCast.fulfilled]: (state, action) => {
      state.listMovieOfCast = [
        ...action.payload.cast.filter(
          (movie) =>
            movie.vote_average && movie.poster_path && movie.backdrop_path
        ),
      ];
      state.isLoadingPeople = true;
    },
    [getMovieOfCast.rejected]: (state, action) => {
      state.isLoadingPeople = true;
    },
  },
});
const { reducer } = PeopleSlice;
export default reducer;
