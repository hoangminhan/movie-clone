import {
  getCastTranslation,
  getDetailCast,
  getMovieOfCast,
  getPopularPeople,
  getSearchPeople,
  getSocialNetwork,
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
  const handleGetMovieOfCast = (id, params, type) => {
    const payload = {
      id,
      params,
      type,
    };
    return dispatch(getMovieOfCast(payload));
  };

  return {
    dataDetailCast,
    dataSocialNetwork,
    listMovieOfCast,
    dataCastTranslate,
    listPopularPeople,
    detailListPeople,
    handleGetDetailCasts,
    handleGetSocialNetwork,
    handleGetMovieOfCast,
    handleGetDataTranslateCast,
    handleGetListCastPopular,
    handleGetSearchPeople,
  };
};
