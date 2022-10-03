import axiosClient from "./axios-client";

export const ApiTvShow = {
  getTrailerTv: (id, params) => {
    const url = `tv/${id}/videos`;
    return axiosClient.get(url, { params });
  },
  getDetailTv: (id, params) => {
    const url = `tv/${id}`;
    return axiosClient.get(url, { params });
  },
};
