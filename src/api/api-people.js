import axiosClient from "./axios-client";

export const apiPeople = {
  // popular people
  getPopularPeople: (params) => {
    const url = `person/popular`;
    return axiosClient.get(url, { params });
  },
  getSearchPeople: (params) => {
    const url = `search/person`;
    return axiosClient.get(url, { params });
  },
  getDetailCast: (id, params) => {
    const url = `person/${id}`;
    return axiosClient.get(url, { params });
  },
  getCastTranslation: (id, params) => {
    const url = `person/${id}/translations`;
    return axiosClient.get(url, { params });
  },
  // social network
  getSocialNetwork: (id, params) => {
    const url = `person/${id}/external_ids`;
    return axiosClient.get(url, { params });
  },
  // movie cast
  getMovieOfCast: (id, params) => {
    const url = `person/${id}/movie_credits`;
    return axiosClient.get(url, { params });
  },
  // tv cast
  getTvOfCast: (id, params) => {
    const url = `person/${id}/tv_credits`;
    return axiosClient.get(url, { params });
  },
};
