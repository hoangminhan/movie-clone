import { createSlice } from "@reduxjs/toolkit";
import {
  getCastTranslation,
  getDetailCast,
  getMovieOfCast,
  getPopularPeople,
  getSearchPage,
  getSearchPeople,
  getSocialNetwork,
  getTvShowOfCast,
} from "./api-thunk";

const initialState = {
  dataDetailCast: {},
  dataSocialNetwork: {},
  listMovieOfCast: [],
  listTvShowOfCast: [],
  dataCastTranslate: {},
  listPopularPeople: [],
  dataSearchPage: {},
  detailListPeople: {
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
      state.detailListPeople = {
        ...state.detailListPeople,
        page,
        totalPage: total_pages,
      };

      state.listPopularPeople = [...results];
      state.isLoadingPeople = true;
    },
    [getPopularPeople.rejected]: (state, action) => {
      state.isLoadingPeople = true;
    },
    // search
    [getSearchPeople.pending]: (state, action) => {
      state.isLoadingPeople = true;
    },
    [getSearchPeople.fulfilled]: (state, action) => {
      const { page, results, total_pages } = action.payload;
      state.detailListPeople = {
        ...state.detailListPeople,
        page,
        totalPage: total_pages,
      };

      state.listPopularPeople = [...results];

      state.isLoadingPeople = true;
    },
    [getSearchPeople.rejected]: (state, action) => {
      state.isLoadingPeople = true;
    },
    [getDetailCast.pending]: (state, action) => {
      state.isLoadingPeople = true;
    },
    [getDetailCast.fulfilled]: (state, action) => {
      state.dataDetailCast = { ...action.payload };
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
      state.listMovieOfCast = [...action.payload.cast];
      state.isLoadingPeople = true;
    },
    [getMovieOfCast.rejected]: (state, action) => {
      state.isLoadingPeople = true;
    },
    // get tv show of cast
    [getTvShowOfCast.pending]: (state, action) => {
      state.isLoadingPeople = true;
    },
    [getTvShowOfCast.fulfilled]: (state, action) => {
      state.listTvShowOfCast = [...action.payload.cast];
      state.isLoadingPeople = true;
    },
    [getTvShowOfCast.rejected]: (state, action) => {
      state.isLoadingPeople = true;
    },
    // dataSearch page
    [getSearchPage.pending]: (state, action) => {
      state.isLoadingPeople = true;
    },
    [getSearchPage.fulfilled]: (state, action) => {
      state.dataSearchPage = { ...action.payload };
      state.isLoadingPeople = true;
    },
    [getSearchPage.rejected]: (state, action) => {
      state.isLoadingPeople = true;
    },
  },
});
const { reducer } = PeopleSlice;
export default reducer;
