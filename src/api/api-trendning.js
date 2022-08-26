import axiosClient from "./axios-client";

export const apiTrending = {
  getListTrendning: (params, type = "all", time = "week") => {
    const url = `/trending/${type}/${time}`;
    return axiosClient.get(url, { params });
  },
};
