import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiPeople } from "api";

// get detail cast
export const getDetailCast = createAsyncThunk(
  "detail-casts",
  async (payload) => {
    const { id, params } = payload;
    const response = await apiPeople.getDetailCast(id, params);
    return response;
  }
);
// get translate cast
export const getCastTranslation = createAsyncThunk(
  "translation-casts",
  async (payload) => {
    const { id, params } = payload;
    const response = await apiPeople.getCastTranslation(id, params);
    return response;
  }
);
// get social network cast
export const getSocialNetwork = createAsyncThunk(
  "social-network-casts",
  async (payload) => {
    const { id, params } = payload;
    const response = await apiPeople.getSocialNetwork(id, params);
    return response;
  }
);
// get movie cast
export const getMovieOfCast = createAsyncThunk(
  "movie-of-cast",
  async (payload) => {
    const { id, params } = payload;
    const response = await apiPeople.getMovieOfCast(id, params);
    return response;
  }
);
