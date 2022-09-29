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
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

export const Footer = ({ toggleMenu }) => {
  const location = useLocation();
  const { pathname } = location;
  const { t } = useTranslation();
  return (
    <div
      className={`left-0 right-0 h-[260px] max-h-[260px] bg-[#1c1c1e] border-t-[1px] border-[#ccc] duration-300 ease-in-out ${
        !toggleMenu ? "pl-[310px]" : "pl-[130px]"
      } ${pathname === "/movie" ? "mr-[350px]" : ""}`}
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
                {t("Audio description")}
              </p>
              <p className="hover:cursor-pointer hover:underline hover:underline-offset-2 hover:text-white duration-200 ease-in-out">
                {t("Investor relations")}
              </p>
              <p className="hover:cursor-pointer hover:underline hover:underline-offset-2 hover:text-white duration-200 ease-in-out">
                {t("Policy notification")}
              </p>
            </div>
          </Col>
          <Col span={5}>
            <div>
              <p className="hover:cursor-pointer hover:underline hover:underline-offset-2 hover:text-white duration-200 ease-in-out">
                {t("Help center")}
              </p>
              <p className="hover:cursor-pointer hover:underline hover:underline-offset-2 hover:text-white duration-200 ease-in-out">
                {t("Job")}
              </p>
              <p className="hover:cursor-pointer hover:underline hover:underline-offset-2 hover:text-white duration-200 ease-in-out">
                {t("Cookie options")}
              </p>
            </div>
          </Col>
          <Col span={5}>
            <div>
              <p className="hover:cursor-pointer hover:underline hover:underline-offset-2 hover:text-white duration-200 ease-in-out">
                {t("Gift card")}
              </p>
              <p className="hover:cursor-pointer hover:underline hover:underline-offset-2 hover:text-white duration-200 ease-in-out">
                {t("Terms of use")}
              </p>
              <p className="hover:cursor-pointer hover:underline hover:underline-offset-2 hover:text-white duration-200 ease-in-out">
                {t("Business information")}
              </p>
            </div>
          </Col>
          <Col span={5}>
            <div>
              <p className="hover:cursor-pointer hover:underline hover:underline-offset-2 hover:text-white duration-200 ease-in-out">
                {t("Multimedia Center")}
              </p>
              <p className="hover:cursor-pointer hover:underline hover:underline-offset-2 hover:text-white duration-200 ease-in-out">
                {t("Privacy")}
              </p>
              <p className="hover:cursor-pointer hover:underline hover:underline-offset-2 hover:text-white duration-200 ease-in-out">
                {t("Contact us")}
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
