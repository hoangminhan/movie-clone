import axiosClient from "./axios-client";

export const apiKeyword = {
  getListMovieKeyword: (id, params) => {
    const url = `keyword/${id}/movies`;
    return axiosClient.get(url, { params });
  },
  getDetailKeyword: (id, params) => {
    const url = `keyword/${id}`;
    return axiosClient.get(url, { params });
  },
};
