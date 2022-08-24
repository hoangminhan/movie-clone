import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge } from "antd";
import React from "react";

export const Notification = () => {
  return (
    <Badge count={5}>
      <FontAwesomeIcon
        icon={faBell}
        className="text-[25px] text-white "
      ></FontAwesomeIcon>
    </Badge>
  );
};
