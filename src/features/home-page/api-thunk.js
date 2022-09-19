import { apiMovie, apiTrending, ApiTvShow } from "api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const handleGetListMovie = createAsyncThunk(
  "movie-list",
  async (payload) => {
    const { type, params } = payload;
    const response = await apiMovie.getListMovie(type, params);
    return response;
  }
);
// get list top rated
export const handleGetListMovieTopRated = createAsyncThunk(
  "movie-list-top-rated",
  async (payload) => {
    const { type, params } = payload;
    const response = await apiMovie.getListMovie(type, params);
    return response;
  }
);
export const handleGetListMovieUpComming = createAsyncThunk(
  "movie-list-upComing",
  async (payload) => {
    const { type, params } = payload;
    const response = await apiMovie.getListMovie(type, params);
    return response;
  }
);
// get list trending
export const getListTrending = createAsyncThunk(
  "list-trending",
  async (payload) => {
    const { type, time, params } = payload;
    const response = await apiTrending.getListTrending(params, type, time);
    return response;
  }
);
// get detail movie
export const getDetailMovie = createAsyncThunk(
  "detail-type",
  async (payload) => {
    const { id, params } = payload;
    const response = await apiMovie.getDetailMovie(id, params);
    return response;
  }
);
export const getVideoMovie = createAsyncThunk(
  "video-movie",
  async (payload) => {
    const { id, params } = payload;
    const response = await apiMovie.getVideoMovie(id, params);
    return response;
  }
);
export const getTrailerTvShow = createAsyncThunk(
  "trailer-movie",
  async (payload) => {
    const { id, params } = payload;
    const response = await ApiTvShow.getTrailerTv(id, params);
    return response;
  }
);
// similar content movie
export const getSimilarMovie = createAsyncThunk(
  "similar-movie",
  async (payload) => {
    const { id, params } = payload;
    const response = await apiMovie.getSimilarMovie(id, params);
    return response;
  }
);
// recommendation content movie
export const getRecommendationMovie = createAsyncThunk(
  "recommendation-movie",
  async (payload) => {
    const { id, params } = payload;
    const response = await apiMovie.getRecommendationMovies(id, params);
    return response;
  }
);
// get casts movie

export const getCastsMovie = createAsyncThunk(
  "casts-movie",
  async (payload) => {
    const { id, params } = payload;
    const response = await apiMovie.getCastsMovie(id, params);
    return response;
  }
);

// get keywords

export const getKeywords = createAsyncThunk(
  "keywords-movie",
  async (payload) => {
    const { id, params } = payload;
    const response = await apiMovie.getKeywords(id, params);
    return response;
  }
);
// get list review

export const getListReviews = createAsyncThunk(
  "list-reviews-movie",
  async (payload) => {
    const { id, params } = payload;
    const response = await apiMovie.getListReviews(id, params);
    return response;
  }
);
