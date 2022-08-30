import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visible: false,
  typeModal: "",
  attrModal: {},
  propsModal: {},
  title: "",
  stopSlider: false,
};
const SliceModal = createSlice({
  initialState,
  name: "modal",
  reducers: {
    openModalCustom: (state, action) => {
      state.visible = action.payload.visible;
      state.title = action.payload.title;
      state.typeModal = action.payload.typeModal;
      state.attrModal = action.payload.attrModal;
      state.propsModal = action.payload.propsModal || {};
    },
    toggleAutoBanner: (state, action) => {
      state.stopSlider = action.payload;
    },
  },
});
const { reducer, actions } = SliceModal;
export const { openModalCustom, toggleAutoBanner } = actions;
export default reducer;
