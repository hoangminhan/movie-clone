import axiosClient from "./axios-client";

export const ApiTvShow = {
  getListTv: (type, params) => {
    const url = `tv/${type}`;
    return axiosClient.get(url, { params });
  },
  getTrailerTv: (id, params) => {
    const url = `tv/${id}/videos`;
    return axiosClient.get(url, { params });
  },
  getDetailTv: (id, params) => {
    const url = `tv/${id}`;
    return axiosClient.get(url, { params });
  },

  // similar tv
  getSimilarTv: (id, params) => {
    const url = `tv/${id}/similar`;
    return axiosClient.get(url, { params });
  },
  // recommmendations movie
  getRecommendationTv: (id, params) => {
    const url = `tv/${id}/recommendations`;
    return axiosClient.get(url, { params });
  },
  // get tv
  getCastsTv: (id, params) => {
    const url = `tv/${id}/credits`;
    return axiosClient.get(url, { params });
  },
  // get key words tv
  getKeywords: (id, params) => {
    const url = `tv/${id}/keywords`;
    return axiosClient.get(url, { params });
  },
  // genres tv
  getListGenresTv: (params) => {
    const url = "genre/tv/list";
    return axiosClient.get(url, { params });
  },
  // get season
  getSeasonTv: (id, numberSeason, params) => {
    const url = `tv/${id}/season/${numberSeason}`;
    return axiosClient.get(url, { params });
  },
  // get episode
  getEpisodeTv: (id, numberSeason, eposideNumber, params) => {
    const url = `tv/${id}/season/${numberSeason}/episode/${eposideNumber}`;
    return axiosClient.get(url, { params });
  },
};
