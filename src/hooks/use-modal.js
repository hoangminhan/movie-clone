import { openModalCustom, toggleAutoBanner } from "features";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export const useModal = () => {
  const resultModal = useSelector((state) => state.storeModal);
  const dispatch = useDispatch();
  //   toggle Modal

  const handleToggleModal = React.useCallback((data) => {
    return dispatch(openModalCustom(data));
  }, []);
  const handleToggleAutoBanner = React.useCallback((data) => {
    return dispatch(toggleAutoBanner(data));
  }, []);
  return {
    resultModal,
    handleToggleModal,
    handleToggleAutoBanner,
  };
};
