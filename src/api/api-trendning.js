import axiosClient from "./axios-client";

export const apiTrending = {
  getListTrendning: (url, params) => {
    const newUrl = `/trending/${url}`;
    return axiosClient.get(newUrl, { params });
  },
};
