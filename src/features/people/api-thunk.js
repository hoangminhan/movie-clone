import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiPeople, apiSearch } from "api";

// get detail cast
export const getPopularPeople = createAsyncThunk(
  "person-popular",
  async (params) => {
    const response = await apiPeople.getPopularPeople(params);
    return response;
  }
);
// get search cast
export const getSearchPeople = createAsyncThunk(
  "person-search",
  async (params) => {
    const response = await apiPeople.getSearchPeople(params);
    return response;
  }
);
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
    return await apiPeople.getMovieOfCast(id, params);
  }
);
// get tv cast
export const getTvShowOfCast = createAsyncThunk(
  "tv-show-of-cast",
  async (payload) => {
    const { id, params } = payload;
    return await apiPeople.getTvOfCast(id, params);
  }
);
// search page
export const getSearchPage = createAsyncThunk(
  "search-page",
  async (payload) => {
    const { type, params } = payload;
    return await apiSearch.getSearchData(type, params);
  }
);
