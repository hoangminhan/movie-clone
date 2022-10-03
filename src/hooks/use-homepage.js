import {
  getCastsMovie,
  getDetailCast,
  getDetailKeyword,
  getDetailMovie,
  getDiscoverMovie,
  getKeywords,
  getListGenresMovie,
  getListMovieKeyword,
  getListMovieOfGenres,
  getListReviews,
  getListTrending,
  getRecommendationMovie,
  getSimilarMovie,
  getTrailerMovie,
  getTrailerTvShow,
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
    listKeywordsMovie,
    listReviewsMovie,
    listRecommendationMovie,
    infoTrailerMovie,
    dataDetail,
    listGenresMovie,
    dataDiscoverMovie,
    listMovieKeyword,
    dataDetailKeyword,
    listMovieOfGenres,
  } = resultMovie;

  const handleGetTypeAction = (payload) => {
    const { type, typeFilm } = payload;
    switch (type) {
      case "popular":
        return dispatch(handleGetListMovie(payload, typeFilm));
      case "top_rated":
        return dispatch(handleGetListMovieTopRated(payload, typeFilm));
      case "upcoming":
        return dispatch(handleGetListMovieUpComming(payload, typeFilm));
      default:
        return dispatch(handleGetListMovie(payload, typeFilm));
    }
  };

  // get list movie lastest || now playing || popular || top rated || upcoming
  const handleGetMovie = React.useCallback((type, params, typeFilm) => {
    const payload = {
      type,
      params,
      typeFilm,
    };
    handleGetTypeAction(payload);
    // return dispatch(handleGetListMovie(payload));
  }, []);

  // get list trending all||movie || tv || person
  const handleGetListTrending = (params, type, time = "week") => {
    const payload = {
      params,
      type,
      time,
    };
    return dispatch(getListTrending(payload));
  };

  // get detail movie
  const handleGetDetailMovie = (id, params, type) => {
    const payload = {
      id,
      params,
      type,
    };
    return dispatch(getDetailMovie(payload));
  };

  // similar movie
  const handleGetSimilarMovie = (id, params, type) => {
    const payload = {
      id,
      params,
      type,
    };
    return dispatch(getSimilarMovie(payload));
  };

  // recommmendation movie
  const handleGetRecommendationMovie = (id, params, type) => {
    const payload = {
      id,
      params,
      type,
    };
    return dispatch(getRecommendationMovie(payload));
  };

  // get video trailer movie
  const handleGetTrailer = (id, type, params) => {
    const payload = {
      id,
      params,
      type,
    };
    return dispatch(getTrailerMovie(payload));
  };

  const handleGetListCasts = (id, params, type) => {
    const payload = {
      id,
      params,
      type,
    };
    return dispatch(getCastsMovie(payload));
  };

  const handleGetListKeywords = (id, params, type) => {
    const payload = {
      id,
      params,
      type,
    };
    return dispatch(getKeywords(payload));
  };
  // list movie keyword
  const handleGetListMovieKeyword = (id, params) => {
    const payload = {
      id,
      params,
    };
    return dispatch(getListMovieKeyword(payload));
  };

  // detail keyword
  const handleGetDetailKeyword = (id, params) => {
    const payload = {
      id,
      params,
    };
    return dispatch(getDetailKeyword(payload));
  };

  const handleGetListReviews = (id, params) => {
    const payload = {
      id,
      params,
    };
    return dispatch(getListReviews(payload));
  };

  const handleGetListMovieOfGenres = (id, params) => {
    const payload = {
      id,
      params,
    };
    return dispatch(getListMovieOfGenres(payload));
  };

  const handleGetListGenresMovie = (params) => {
    return dispatch(getListGenresMovie(params));
  };
  // get dicover
  const handleGetDiscoverMovie = (params) => {
    return dispatch(getDiscoverMovie(params));
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
    listKeywordsMovie,
    listReviewsMovie,
    listRecommendationMovie,
    infoTrailerMovie,
    dataDetail,
    listGenresMovie,
    dataDiscoverMovie,
    listMovieKeyword,
    dataDetailKeyword,
    listMovieOfGenres,
    handleGetDetailMovie,
    handleGetMovie,
    handleGetListTrending,
    handleGetTrailer,
    handleGetListCasts,
    // handleGetDetailCasts,
    handleGetSimilarMovie,
    handleGetRecommendationMovie,
    handleGetListKeywords,
    handleGetListReviews,
    handleGetListGenresMovie,
    handleGetDiscoverMovie,
    handleGetListMovieKeyword,
    handleGetDetailKeyword,
    handleGetListMovieOfGenres,
  };
};
