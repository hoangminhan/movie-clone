import { createSlice } from "@reduxjs/toolkit";
import {
  getCastTranslation,
  getDetailCast,
  getMovieOfCast,
  getSocialNetwork,
} from "./api-thunk";

const initialState = {
  dataDetailCast: {},
  dataSocialNetwork: {},
  listMovieOfCast: [],
  dataCastTranslate: {},
  isLoadingPeople: false,
};
export const PeopleSlice = createSlice({
  name: "people",
  initialState,
  extraReducers: {
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