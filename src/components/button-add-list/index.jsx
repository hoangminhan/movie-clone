import { faHeart, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "antd";
import React from "react";

export const ButtonAddList = () => {
  return (
    <Tooltip title="Thêm vào danh sách của tôi">
      <p className="group bg-transparent w-10 h-10 flex items-center justify-center rounded-full border-solid border-[white] border-[2px] hover:border-[#5179ff]">
        <FontAwesomeIcon
          icon={faHeart}
          color="white"
          className="text-[13px] group-hover:text-[#5179ff]"
        />
      </p>
    </Tooltip>
  );
};
