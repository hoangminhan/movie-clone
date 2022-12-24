import { UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Menu } from "antd";
import { UserContext } from "contexts";
import { getAuth, signOut } from "firebase/auth";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

export const Profile = () => {
  const navigate = useNavigate();

  const stateContext = useContext(UserContext);
  const { currentDataUser } = stateContext;
  const [dataUser, setDataUser] = currentDataUser;

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <p
              className="text-black"
              onClick={() => {
                const auth = getAuth();
                signOut(auth)
                  .then((data) => {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    localStorage.removeItem("userInfo");
                    navigate("/");
                  })
                  .catch((error) => {});
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
        src={dataUser?.photoURL}
        icon={<UserOutlined />}
        className="cursor-pointer"
      />
    </Dropdown>
  ) : (
    <Link to="/login">
      <p className="bg-primarybg rounded-3xl hover:scale-110 duration-200 flex items-center justify-center">
        <button className="text-white text-[15px] min-w-[100px] px-3">
          {t("Login")}
        </button>
      </p>
    </Link>
  );
};
