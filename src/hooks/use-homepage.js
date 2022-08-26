import { getListTrending, handleGetListMovie } from "features";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

export const useHomePage = () => {
  const dispatch = useDispatch();
  const resultMovie = useSelector((state) => state.storeMovie);
  const { listMovie, detail, listTrending, detailTrending } = resultMovie;

  // get list movie
  const handleGetMovie = React.useCallback((type, params) => {
    const payload = {
      type,
      params,
    };
    return dispatch(handleGetListMovie(payload));
  }, []);

  // get list trending
  const handleGetListTrending = (params, type, time) => {
    const payload = {
      params,
      type,
      time,
    };
    return dispatch(getListTrending(payload));
  };

  return {
    listMovie,
    detail,
    listTrending,
    detailTrending,
    handleGetMovie,
    handleGetListTrending,
  };
};
