import {
  getCastsMovie,
  getDetailCast,
  getDetailKeyword,
  getDetailMovie,
  getDiscoverMovie,
  getDiscoverMovieTv,
  getEpisodeTv,
  getKeywords,
  getListGenresMovie,
  getListMovieKeyword,
  getListMovieOfGenres,
  getListReviews,
  getListTrending,
  getRecommendationMovie,
  getSeasonTv,
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
    dataSeasonTv,
    dataEposideTv,
    isLoadingChangeTab,
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

  const handleGetListGenresMovie = (type, params) => {
    const payload = {
      type,
      params,
    };
    return dispatch(getListGenresMovie(payload));
  };
  // get dicover
  const handleGetDiscoverMovieTv = (type, params) => {
    const payload = {
      type,
      params,
    };

    return dispatch(getDiscoverMovieTv(payload));
  };
  // get season
  const handleGetSeasonTv = (id, numberSeason, params) => {
    const payload = {
      id,
      numberSeason,
      params,
    };
    return dispatch(getSeasonTv(payload));
  };
  // get eposide of season tv
  const handleGetEpisodeTv = (id, numberSeason, eposideNumber, params) => {
    const payload = {
      id,
      numberSeason,
      eposideNumber,
      params,
    };
    return dispatch(getEpisodeTv(payload));
  };

  // get api movie and tv
  const handleGetApiForMovieAndTvPage = async () => {
    const currentTab = sessionStorage.getItem("currentTab") || "/";
    const locale = sessionStorage.getItem("currentLocale") || "vi-VN";

    const type = currentTab === "/" ? "movie" : "tv";

    try {
      const result = await Promise.all([
        handleGetListTrending(
          {
            api_key: process.env.REACT_APP_API_KEY,
            language: locale,
          },
          type
        ),
        handleGetMovie(
          "popular",
          {
            page: 1,
            api_key: process.env.REACT_APP_API_KEY,
            language: locale,
          },
          type
        ),
        handleGetMovie(
          "top_rated",
          {
            page: 1,
            api_key: process.env.REACT_APP_API_KEY,
            language: locale,
          },
          type
        ),
        handleGetMovie(
          "upcoming",
          {
            page: 1,
            api_key: process.env.REACT_APP_API_KEY,
            language: locale,
          },
          type
        ),
      ]);
      return { result, success: true };
    } catch (error) {
      return { error, success: false };
    }
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
    dataSeasonTv,
    listMovieOfGenres,
    dataEposideTv,
    isLoadingChangeTab,
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
    handleGetDiscoverMovieTv,
    handleGetListMovieKeyword,
    handleGetDetailKeyword,
    handleGetListMovieOfGenres,
    handleGetSeasonTv,
    handleGetEpisodeTv,
    handleGetApiForMovieAndTvPage,
  };
};
