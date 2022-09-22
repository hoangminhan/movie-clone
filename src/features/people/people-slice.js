import { createSlice } from "@reduxjs/toolkit";
import { getDetailCast } from "./api-thunk";

const initialState = {
  dataDetailCast: {},
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
  },
});
const { reducer } = PeopleSlice;
export default reducer;
