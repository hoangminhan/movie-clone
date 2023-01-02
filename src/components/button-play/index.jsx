import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const ButtonPlay = ({ size, sizeImg }) => {
  // px 12 py 2 => button at component slider
  return (
    <p
      className={`${
        size === "small"
          ? "py-[2px] px-[12px]"
          : size === "middle"
          ? "py-[8px] px-[16px]"
          : "py-[10px] sm:py-[14px] px-[20px] sm:px-[24px]"
      }  rounded-full bg-gradient-to-br from-primary to-[#f80223] cursor-pointer
      
      `}
    >
      <FontAwesomeIcon
        icon={faCaretRight}
        className={`text-white text-[${sizeImg}]`}
      />
    </p>
  );
};
