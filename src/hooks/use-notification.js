import { notification } from "antd";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export const useNotification = () => {
  const [t] = useTranslation();
  const handlePopupNotification = (data, type, optionalContent = "") => {
    return toast[type](
      `${!optionalContent ? t(data) : t(data) + " " + optionalContent}`,
      {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      }
    );
  };
  return {
    handlePopupNotification,
  };
};
