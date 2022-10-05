import {
  apiDiscovery,
  apiGenres,
  apiKeyword,
  apiMovie,
  apiTrending,
  ApiTvShow,
} from "api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const handleGetListMovie = createAsyncThunk(
  "tv-movie-list",
  async (payload) => {
    const { type, params, typeFilm } = payload;
    if (typeFilm === "movie") {
      return await apiMovie.getListMovie(type, params);
    } else {
      return await ApiTvShow.getListTv(type, params);
    }
  }
);
// get list top rated
export const handleGetListMovieTopRated = createAsyncThunk(
  "movie-list-top-rated",
  async (payload) => {
    const { type, params, typeFilm } = payload;
    if (typeFilm === "movie") {
      return await apiMovie.getListMovie(type, params);
    } else {
      return await ApiTvShow.getListTv(type, params);
    }
  }
);
export const handleGetListMovieUpComming = createAsyncThunk(
  "movie-list-upComing",
  async (payload) => {
    const { type, params, typeFilm } = payload;
    if (typeFilm === "movie") {
      return await apiMovie.getListMovie(type, params);
    } else {
      return await ApiTvShow.getListTv("on_the_air", params);
    }
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
    const { id, params, type } = payload;
    if (type === "movie") return await apiMovie.getDetailMovie(id, params);
    return await ApiTvShow.getDetailTv(id, params);
  }
);
export const getTrailerMovie = createAsyncThunk(
  "trailer-movie-show",
  async (payload) => {
    const { id, params, type } = payload;
    if (type === "movie") {
      return await apiMovie.getTrailerMovie(id, params);
    } else {
      return await ApiTvShow.getTrailerTv(id, params);
    }
  }
);
export const getTrailerTvShow = createAsyncThunk(
  "trailer-tv-show",
  async (payload) => {
    const { id, params } = payload;
    const response = await ApiTvShow.getTrailerTv(id, params);
    return response;
  }
);
// similar content movie
export const getSimilarMovie = createAsyncThunk(
  "similar-movie-tv",
  async (payload) => {
    const { id, params, type } = payload;
    if (type === "movie") {
      return await apiMovie.getSimilarMovie(id, params);
    } else return await ApiTvShow.getSimilarTv(id, params);
  }
);
// recommendation content movie
export const getRecommendationMovie = createAsyncThunk(
  "recommendation-movie-tv",
  async (payload) => {
    const { id, params, type } = payload;
    if (type === "movie") {
      return await apiMovie.getRecommendationMovies(id, params);
    } else {
      return await ApiTvShow.getRecommendationTv(id, params);
    }
  }
);
// get casts movie

export const getCastsMovie = createAsyncThunk(
  "casts-movie-tv",
  async (payload) => {
    const { id, params, type } = payload;
    if (type === "movie") {
      return await apiMovie.getCastsMovie(id, params);
    } else return await ApiTvShow.getCastsTv(id, params);
  }
);

// get keywords

export const getKeywords = createAsyncThunk(
  "keywords-movie-tv",
  async (payload) => {
    const { id, params, type } = payload;
    if (type === "movie") {
      return await apiMovie.getKeywords(id, params);
    } else {
      return await ApiTvShow.getKeywords(id, params);
    }
  }
);

// keyword
export const getListMovieKeyword = createAsyncThunk(
  "list-movie-tv-keyword",
  async (payload) => {
    const { id, params } = payload;
    const response = await apiKeyword.getListMovieKeyword(id, params);
    return response;
  }
);
// detail keyword
export const getDetailKeyword = createAsyncThunk(
  "detail-keyword",
  async (payload) => {
    const { id, params } = payload;
    const response = await apiKeyword.getDetailKeyword(id, params);
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
// get list geners movie
export const getListGenresMovie = createAsyncThunk(
  "list-genres-movie-tv",
  async (payload) => {
    const { type, params } = payload;
    if (type === "movie") {
      return await apiMovie.getListGenresMovie(params);
    } else {
      return await ApiTvShow.getListGenresTv(params);
    }
  }
);
// get list  movie of geners
export const getListMovieOfGenres = createAsyncThunk(
  "list-movie-of-genres",
  async (payload) => {
    const { id, params } = payload;

    const response = await apiGenres.getListMovieOfGenres(id, params);
    return response;
  }
);
// get list discover movie
export const getDiscoverMovieTv = createAsyncThunk(
  "list-discover--tv",
  async (payload) => {
    const { type, params } = payload;
    if (type === "movie") {
      return await apiDiscovery.getDiscoverMovie(params);
    } else {
      return await apiDiscovery.getDiscoverTv(params);
    }
  }
);

// get season tv
export const getSeasonTv = createAsyncThunk(
  "list-season-tv",
  async (payload) => {
    const { id, numberSeason, params } = payload;

    const response = await ApiTvShow.getSeasonTv(id, numberSeason, params);
    return response;
  }
);
// get eposide of season tv
export const getEpisodeTv = createAsyncThunk(
  "list-eposide-season",
  async (payload) => {
    const { id, numberSeason, eposideNumber, params } = payload;

    const response = await ApiTvShow.getEpisodeTv(
      id,
      numberSeason,
      eposideNumber,
      params
    );
    return response;
  }
);
