import { Modal } from "antd";
import { TYPEMODAL } from "constant";
import { useModal } from "hooks";
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
      style={{
        top: 0,
      }}
      footer={null}
      {...attrModal}
    >
      <BodyModal {...propsModal} />
    </Modal>
  );
};
