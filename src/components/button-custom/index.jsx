import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { t } from "i18next";
import React from "react";

const icons = {
  iconPlay: faCaretRight,
};

export const ButtomCustom = ({
  nameIcon,
  size = "small",
  title = "Trailer",
}) => {
  return (
    <div
      className={`
      bg-[#fff] hover:bg-[#ffffffbf] ${
        size === "small" ? "w-[120px] h-[40px]" : ""
      } flex justify-center
    items-center gap-2 rounded-[8px] text-black cursor-pointer
      `}
    >
      <FontAwesomeIcon icon={icons[nameIcon]} className="text-2xl" />
      <button className="font-medium ease-in-out duration-300 text-[20px]">
        {t(title)}
      </button>
    </div>
  );
};
