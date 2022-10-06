import {
  getCastTranslation,
  getDetailCast,
  getMovieOfCast,
  getPopularPeople,
  getSearchPage,
  getSearchPeople,
  getSocialNetwork,
  getTvShowOfCast,
} from "features";

const { useSelector, useDispatch } = require("react-redux");

export const UsePeople = () => {
  const resultPeople = useSelector((state) => state.storePeople);
  const dispatch = useDispatch();
  const {
    dataDetailCast,
    dataSocialNetwork,
    listMovieOfCast,
    dataCastTranslate,
    listPopularPeople,
    detailListPeople,
    listTvShowOfCast,
    dataSearchPage,
  } = resultPeople;

  const handleGetListCastPopular = (params) => {
    return dispatch(getPopularPeople(params));
  };
  // search
  const handleGetSearchPeople = (params) => {
    return dispatch(getSearchPeople(params));
  };
  const handleGetDetailCasts = (id, params) => {
    const payload = {
      id,
      params,
    };
    return dispatch(getDetailCast(payload));
  };
  const handleGetDataTranslateCast = (id, params) => {
    const payload = {
      id,
      params,
    };
    return dispatch(getCastTranslation(payload));
  };
  const handleGetSocialNetwork = (id, params) => {
    const payload = {
      id,
      params,
    };
    return dispatch(getSocialNetwork(payload));
  };
  const handleGetMovieOfCast = (id, params) => {
    const payload = {
      id,
      params,
    };
    return dispatch(getMovieOfCast(payload));
  };
  const handleGetTvOfCast = (id, params) => {
    const payload = {
      id,
      params,
    };
    return dispatch(getTvShowOfCast(payload));
  };
  const handleGetDataPageSearch = (type, params) => {
    const payload = {
      type,
      params,
    };
    return dispatch(getSearchPage(payload));
  };

  return {
    dataDetailCast,
    dataSocialNetwork,
    listMovieOfCast,
    dataCastTranslate,
    listPopularPeople,
    detailListPeople,
    listTvShowOfCast,
    dataSearchPage,
    handleGetDetailCasts,
    handleGetSocialNetwork,
    handleGetMovieOfCast,
    handleGetDataTranslateCast,
    handleGetListCastPopular,
    handleGetSearchPeople,
    handleGetTvOfCast,
    handleGetDataPageSearch,
  };
};
