import axiosClient from "./axios-client";

export const apiDiscovery = {
  getDiscoverMovie: (params) => {
    const url = "discover/movie";
    return axiosClient.get(url, { params });
  },
  getDiscoverTv: (params) => {
    const url = "discover/tv";
    return axiosClient.get(url, { params });
  },
};
