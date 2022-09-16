import { openModalCustom, toggleAutoBanner } from "features";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useModal = () => {
  const resultModal = useSelector((state) => state.storeModal);
  console.log({ resultModal });
  const dispatch = useDispatch();
  //   toggle Modal

  const handleToggleModal = React.useCallback((data) =>
    dispatch(openModalCustom(data), [dispatch])
  );
  const handleToggleAutoBanner = React.useCallback((data) => {
    return dispatch(toggleAutoBanner(data));
  }, []);
  return {
    resultModal,
    handleToggleModal,
    handleToggleAutoBanner,
  };
};
