import { notification } from "antd";
import { useTranslation } from "react-i18next";

export const useNotification = () => {
  const [t] = useTranslation();
  const handlePopupNotification = (data, type) => {
    return notification[type]({
      message: t(data),
    });
  };
  return {
    handlePopupNotification,
  };
};
