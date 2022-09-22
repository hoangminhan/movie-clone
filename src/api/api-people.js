import axiosClient from "./axios-client";

export const apiPeople = {
  getDetailCast: (id, params) => {
    const url = `person/${id}`;
    return axiosClient.get(url, { params });
  },
};
