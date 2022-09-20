import { Avatar, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { t } from "i18next";

export const Profile = () => {
  const isLogin = localStorage.getItem("accessToken") || "";
  return isLogin ? (
    <Avatar
      size="large"
      src="https://joeschmoe.io/api/v1/random"
      icon={<UserOutlined />}
    />
  ) : (
    <Link to="/login">
      <p className="px-3  bg-primary rounded-3xl hover:scale-110 duration-200 flex items-center justify-center">
        <button className="text-white text-[20px]">Login</button>
      </p>
    </Link>
  );
};
