import { apiMovie, apiTrending } from "api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const handleGetListMovie = createAsyncThunk(
  "movie-list",
  async (payload) => {
    const { type, params } = payload;
    const response = await apiMovie.getListMovie(type, params);
    return response;
  }
);
export const getListTrending = createAsyncThunk(
  "list-trending",
  async (payload) => {
    const { type, time, params } = payload;
    const response = await apiTrending.getListTrendning(params, type, time);
    return response;
  }
);
