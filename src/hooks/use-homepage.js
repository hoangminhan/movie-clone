import {
  getCastsMovie,
  getDetailMovie,
  getListTrending,
  getSimilarMovie,
  getTrailerTvShow,
  getVideoMovie,
  handleGetListMovie,
  handleGetListMovieTopRated,
  handleGetListMovieUpComming,
} from "features";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

export const useHomePage = () => {
  const dispatch = useDispatch();
  const resultMovie = useSelector((state) => state.storeMovie);
  const {
    listMovie,
    listMovieTopRated,
    listMovieUpComing,
    listSimilarMovie,
    detail,
    isLoading,
    listTrending,
    detailTrending,
    listCastsMovie,
    dataDetail,
  } = resultMovie;

  const handleGetTypeAction = (payload) => {
    const { type } = payload;
    switch (type) {
      case "popular":
        return dispatch(handleGetListMovie(payload));
      case "top_rated":
        return dispatch(handleGetListMovieTopRated(payload));
      case "upcoming":
        return dispatch(handleGetListMovieUpComming(payload));
      default:
        return dispatch(handleGetListMovie(payload));
    }
  };

  // get list movie lastest || now playing || popular || top rated || upcoming
  const handleGetMovie = React.useCallback((type, params) => {
    const payload = {
      type,
      params,
    };
    handleGetTypeAction(payload);
    // return dispatch(handleGetListMovie(payload));
  }, []);

  // get list trending all||movie || tv || person
  const handleGetListTrending = (params, type, time) => {
    const payload = {
      params,
      type,
      time,
    };
    return dispatch(getListTrending(payload));
  };

  // get detail movie
  const handleGetDetailMovie = (id, params) => {
    const payload = {
      id,
      params,
    };
    return dispatch(getDetailMovie(payload));
  };

  // similar movie
  const handleGetSimilarMovie = (id, params) => {
    const payload = {
      id,
      params,
    };
    return dispatch(getSimilarMovie(payload));
  };

  // get video trailer movie
  const handleGetTrailer = (id, type, params) => {
    const payload = {
      id,
      params,
    };
    if (type === "movie") {
      return dispatch(getVideoMovie(payload));
    } else if (type === "tv") {
      return dispatch(getTrailerTvShow(payload));
    }
  };
  const handleGetListCasts = (id, params) => {
    const payload = {
      id,
      params,
    };
    return dispatch(getCastsMovie(payload));
  };

  return {
    listMovie,
    listMovieTopRated,
    listMovieUpComing,
    listSimilarMovie,
    detail,
    listTrending,
    isLoading,
    detailTrending,
    listCastsMovie,
    dataDetail,
    handleGetDetailMovie,
    handleGetMovie,
    handleGetListTrending,
    handleGetTrailer,
    handleGetListCasts,
    handleGetSimilarMovie,
  };
};
