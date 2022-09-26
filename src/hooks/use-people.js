import {
  getCastTranslation,
  getDetailCast,
  getMovieOfCast,
  getPopularPeople,
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
    detailPopular,
  } = resultPeople;

  const handleGetListCastPopular = (params) => {
    return dispatch(getPopularPeople(params));
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

  return {
    dataDetailCast,
    dataSocialNetwork,
    listMovieOfCast,
    dataCastTranslate,
    listPopularPeople,
    detailPopular,
    handleGetDetailCasts,
    handleGetSocialNetwork,
    handleGetMovieOfCast,
    handleGetDataTranslateCast,
    handleGetListCastPopular,
  };
};
