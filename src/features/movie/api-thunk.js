import { apiMovie } from "api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const handleGetListMovie = createAsyncThunk(
  "movie-list",
  async (payload) => {
    const { type, params } = payload;
    const response = await apiMovie.getListMovie(type, params);
    return response;
  }
);
