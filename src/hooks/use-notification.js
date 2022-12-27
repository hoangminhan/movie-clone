import { notification } from "antd";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export const useNotification = () => {
  const [t] = useTranslation();
  const handlePopupNotification = (data, type) => {
    return toast[type](t(data), {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      theme: "colored",
    });
  };
  return {
    handlePopupNotification,
  };
};
