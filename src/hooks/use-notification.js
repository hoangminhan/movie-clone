import { notification } from "antd";
import { useTranslation } from "react-i18next";

export const useNotification = () => {
  const [t] = useTranslation();
  const handlePopupNotification = (data, type) => {
    return notification[type]({
      message: t(data),
      duration: 2,
      // placement: "top",
      style: {
        borderRadius: "12px",
        padding: "12px 20px",
      },
    });
  };
  return {
    handlePopupNotification,
  };
};
