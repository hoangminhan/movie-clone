import axiosClient from "./axios-client";

export const apiMovie = {
  getListMovie: (params) => {
    const url = "";
    return axiosClient.get(url, { params });
  },
};
