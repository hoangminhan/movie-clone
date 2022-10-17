import { Modal } from "antd";
import React from "react";

export const ModalConfirm = ({ data }) => {
  const { visible } = data;
  return (
    <div>
      <Modal footer={false}></Modal>
    </div>
  );
};
