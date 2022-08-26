import { handleGetListMovie } from "features";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

export const useMovie = () => {
  const dispatch = useDispatch();
  const resultMovie = useSelector((state) => state.storeMovie);
  const { listMovie, detail } = resultMovie;

  const handleGetMovie = React.useCallback((type, params) => {
    const payload = {
      type,
      params,
    };
    return dispatch(handleGetListMovie(payload));
  }, []);

  return { listMovie, detail, handleGetMovie };
};
