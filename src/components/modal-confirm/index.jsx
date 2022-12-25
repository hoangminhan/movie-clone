import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "antd";
import { t } from "i18next";
import React from "react";

export const ModalConfirm = ({
  handleClickAccept,
  showModal,
  handleClickCancel,
  typeDeleteModal,
}) => {
  return (
    <div>
      <Modal
        footer={null}
        visible={showModal}
        closable={false}
        wrapClassName="modal-config"
      >
        <div className="h-[200px] flex flex-col my-6">
          <div className="flex-1 text-[21px] text-center mt-8">
            <p className="font-bold text-[25px]">{t("Are you sure?")}</p>
            {typeDeleteModal === "one" ? (
              <p>{t("This will remove your films from this bookmark list")}</p>
            ) : (
              <p>
                {t("This will remove all your films from this bookmark list")}
              </p>
            )}
          </div>
          {/* icon */}
          <div className="text-white flex justify-center mt-2">
            <FontAwesomeIcon
              beat
              icon={faTrash}
              className="w-[50px] h-[50px] text-red-400"
            />
          </div>
          {/* action */}
          <div className="flex gap-3 justify-end">
            <button
              className="text-white w-[80px] bg-transparent border-[1px] border-solid border-[#ccc] hover:scale-110 hover:duration-150 rounded-md py-1 hover:bg-red-600 hover:text-black"
              onClick={() => {
                handleClickAccept();
              }}
            >
              {t("Yes")}
            </button>
            <button
              className="text-white w-[80px] bg-transparent border-[1px] border-solid border-[#ccc] hover:scale-110 hover:duration-150 rounded-md hover:bg-green-500 hover:text-black"
              onClick={() => {
                // setShowModal(false);
                // setDataDeleteAll({});
                handleClickCancel();
              }}
            >
              {t("Cancel")}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
