import { getDetailCast } from "features";

const { useSelector, useDispatch } = require("react-redux");

export const UsePeople = () => {
  const resultPeople = useSelector((state) => state.storePeople);
  const dispatch = useDispatch();
  const { dataDetailCast } = resultPeople;

  const handleGetDetailCasts = (id, params) => {
    const payload = {
      id,
      params,
    };
    return dispatch(getDetailCast(payload));
  };

  return {
    dataDetailCast,
    handleGetDetailCasts,
  };
};
