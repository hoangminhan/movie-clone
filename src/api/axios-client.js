import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",

  paramsSerializer: (params) =>
    queryString.stringify(params, { arrayFormat: "comma" }),
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    debugger;
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data && response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosClient;
