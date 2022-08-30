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
  getVideoMovie: (id, params) => {
    const url = `movie/${id}/videos`;
    return axiosClient.get(url, { params });
  },
};
