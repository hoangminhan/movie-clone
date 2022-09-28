import axiosClient from "./axios-client";

export const apiMovie = {
  getListMovie: (type, params) => {
    const url = `movie/${type}`;
    return axiosClient.get(url, { params });
  },
  getDetailMovie: (id, params) => {
    const url = `movie/${id}`;
    return axiosClient.get(url, { params });
  },
  getTrailerMovie: (id, params) => {
    const url = `movie/${id}/videos`;
    return axiosClient.get(url, { params });
  },
  // similar movie
  getSimilarMovie: (id, params) => {
    const url = `movie/${id}/similar`;
    return axiosClient.get(url, { params });
  },
  // recommmendations movie
  getRecommendationMovies: (id, params) => {
    const url = `movie/${id}/recommendations`;
    return axiosClient.get(url, { params });
  },
  // get casts
  getCastsMovie: (id, params) => {
    const url = `movie/${id}/credits`;
    return axiosClient.get(url, { params });
  },

  // get key words
  getKeywords: (id, params) => {
    const url = `movie/${id}/keywords`;
    return axiosClient.get(url, { params });
  },
  // get review movie
  getListReviews: (id, params) => {
    const url = `movie/${id}/reviews`;
    return axiosClient.get(url, { params });
  },
  getListGenresMovie: (params) => {
    const url = "genre/movie/list";
    return axiosClient.get(url, { params });
  },
};
