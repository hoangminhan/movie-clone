import axiosClient from "./axios-client";

export const apiTrending = {
  getListTrending: (params, type = "all", time = "week") => {
    const url = `/trending/${type}/${time}`;
    return axiosClient.get(url, { params });
  },
};
