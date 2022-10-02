import axiosClient from "./axios-client";

export const apiGenres = {
  getListMovieOfGenres: (id, params) => {
    const url = `list/${id}`;
    return axiosClient.get(url, { params });
  },
};
