import { Avatar, Button, Dropdown, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Profile = () => {
  const navigate = useNavigate();
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <p
              className="text-black"
              onClick={() => {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                navigate("/");
              }}
            >
              Log out
            </p>
          ),
        },
      ]}
    />
  );
  const [t] = useTranslation();
  const isLogin = localStorage.getItem("accessToken") || "";
  return isLogin ? (
    <Dropdown overlay={menu} placement="bottomLeft">
      <Avatar
        size="large"
        src="https://joeschmoe.io/api/v1/random"
        icon={<UserOutlined />}
      />
    </Dropdown>
  ) : (
    <Link to="/login">
      <p className="px-3  bg-primary rounded-3xl hover:scale-110 duration-200 flex items-center justify-center">
        <button className="text-white text-[20px]">{t("Login")}</button>
      </p>
    </Link>
  );
};
