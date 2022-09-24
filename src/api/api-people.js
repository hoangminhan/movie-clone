import axiosClient from "./axios-client";

export const apiPeople = {
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
};
