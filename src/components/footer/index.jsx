import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "antd";
// import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import React from "react";

export const Footer = ({ toggleMenu }) => {
  return (
    <div
      className={`absolute z-[999] left-0 right-0  h-[260px] bg-[#1c1c1e] border-t-[1px] border-[#ccc] duration-300 ease-in-out ${
        !toggleMenu ? "pl-[280px]" : "pl-[110px]"
      }`}
    >
      <div className="pt-[64px] flex gap-8 text-white text-[30px] cursor-pointer ">
        <FontAwesomeIcon icon={faFacebookF} className="hover:text-[#ccc]" />
        <FontAwesomeIcon icon={faInstagram} className="hover:text-[#ccc]" />
        <FontAwesomeIcon icon={faTwitter} className="hover:text-[#ccc]" />
        <FontAwesomeIcon icon={faYoutube} className="hover:text-[#ccc]" />
      </div>
      <div className="text-[16px] pt-4">
        <Row>
          <Col span={5}>
            <div>
              <p className="hover:cursor-pointer hover:underline hover:underline-offset-2 hover:text-white duration-200 ease-in-out">
                Mô tả âm thanh
              </p>
              <p className="hover:cursor-pointer hover:underline hover:underline-offset-2 hover:text-white duration-200 ease-in-out">
                Quan hệ với nhà đầu tư
              </p>
              <p className="hover:cursor-pointer hover:underline hover:underline-offset-2 hover:text-white duration-200 ease-in-out">
                Thông báo pháp lý
              </p>
            </div>
          </Col>
          <Col span={5}>
            <div>
              <p className="hover:cursor-pointer hover:underline hover:underline-offset-2 hover:text-white duration-200 ease-in-out">
                Trung tâm trợ giúp
              </p>
              <p className="hover:cursor-pointer hover:underline hover:underline-offset-2 hover:text-white duration-200 ease-in-out">
                Việc làm
              </p>
              <p className="hover:cursor-pointer hover:underline hover:underline-offset-2 hover:text-white duration-200 ease-in-out">
                Tùy chọn cookie
              </p>
            </div>
          </Col>
          <Col span={5}>
            <div>
              <p className="hover:cursor-pointer hover:underline hover:underline-offset-2 hover:text-white duration-200 ease-in-out">
                Thẻ quà tặng
              </p>
              <p className="hover:cursor-pointer hover:underline hover:underline-offset-2 hover:text-white duration-200 ease-in-out">
                Điều khoản sử dụng
              </p>
              <p className="hover:cursor-pointer hover:underline hover:underline-offset-2 hover:text-white duration-200 ease-in-out">
                Thông tin doanh nghiệp
              </p>
            </div>
          </Col>
          <Col span={5}>
            <div>
              <p className="hover:cursor-pointer hover:underline hover:underline-offset-2 hover:text-white duration-200 ease-in-out">
                Trung tâm đa phương tiện
              </p>
              <p className="hover:cursor-pointer hover:underline hover:underline-offset-2 hover:text-white duration-200 ease-in-out">
                Quyền riêng tư
              </p>
              <p className="hover:cursor-pointer hover:underline hover:underline-offset-2 hover:text-white duration-200 ease-in-out">
                Liên hệ với chúng tôi
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
