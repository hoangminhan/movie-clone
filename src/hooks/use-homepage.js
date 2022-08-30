import {
  getDetailMovie,
  getListTrending,
  getTrailerTvShow,
  getVideoMovie,
  handleGetListMovie,
} from "features";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

export const useHomePage = () => {
  const dispatch = useDispatch();
  const resultMovie = useSelector((state) => state.storeMovie);
  const { listMovie, detail, listTrending, detailTrending } = resultMovie;

  // get list movie lastest || now playing || popular || top rated || upcoming
  const handleGetMovie = React.useCallback((type, params) => {
    const payload = {
      type,
      params,
    };
    return dispatch(handleGetListMovie(payload));
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

  return {
    listMovie,
    detail,
    listTrending,
    detailTrending,
    handleGetDetailMovie,
    handleGetMovie,
    handleGetListTrending,
    handleGetTrailer,
  };
};
