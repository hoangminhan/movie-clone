import axiosClient from "./axios-client";

export const apiMovie = {
  getListMovie: (type, params) => {
    const url = `movie/${type}`;
    return axiosClient.get(url, { params });
  },
};
