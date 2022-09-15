import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "antd";
import React from "react";

export const ButtonAddList = () => {
  return (
    <Tooltip title="Thêm vào danh sách của tôi">
      <p className="bg-[white] w-10 h-10 flex items-center justify-center rounded-full border-solid border-[black] border-[1px]">
        <FontAwesomeIcon icon={faPlus} color="black" />
      </p>
    </Tooltip>
  );
};
