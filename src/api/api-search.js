import axiosClient from "./axios-client";

export const apiSearch = {
  getSearchData: (type, params) => {
    const url = `search/${type}`;
    return axiosClient.get(url, { params });
  },
};
