import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "antd";
import { TYPEMODAL } from "constant";
import { useModal } from "hooks";
import React from "react";
import { ModalTrailer } from "./components";
import "./style.scss";

export const ComponentModalGlobal = () => {
  const { resultModal, handleToggleModal } = useModal();
  const { visible, title, typeModal, attrModal, propsModal } = resultModal;

  //   handle get modal
  const checkModal = (typeModal) => {
    switch (typeModal) {
      case TYPEMODAL.MODAL_TRAILER:
        return ModalTrailer;
      default:
        return null;
    }
  };
  const handleCloseModal = () => {
    handleToggleModal({ type: "" });
  };

  const BodyModal = checkModal(typeModal);
  if (!BodyModal) return null;

  return (
    <Modal
      visible={visible}
      closable={false}
      wrapClassName="modal-config"
      onCancel={handleCloseModal}
      // title={
      //   <div className="flex items-center justify-between cursor-pointer ">
      //     <h2 className="m-0 text-[22px] text-[#989898] font-medium uppercase ">
      //       {title}
      //     </h2>
      //     <FontAwesomeIcon
      //       icon={faClose}
      //       className="text-[22px] text-[#989898]"
      //       onClick={() => {
      //         handleToggleModal({ type: "" });
      //       }}
      //     />
      //   </div>
      // }
      footer={null}
      {...attrModal}
    >
      <BodyModal {...propsModal} />
    </Modal>
  );
};
