import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

export const Profile = () => {
  return (
    <Avatar
      size="large"
      src="https://joeschmoe.io/api/v1/random"
      icon={<UserOutlined />}
    />
  );
};
