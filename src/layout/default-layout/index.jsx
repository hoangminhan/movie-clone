import React, { useState } from "react";
import { Aside, Header, Footer, Sidebar } from "components";
import { Col, Row } from "antd";

export const DefaultLayout = ({ children, showTab = false }) => {
  const [toggleMenu, setToggleMenu] = useState(
    !!sessionStorage.getItem("isToggleMenu") || false
  );
  const handleToggleMenu = (data) => {
    setToggleMenu(data);
  };
  return (
    <div className="min-h-[100vh] bg-[#1c1c1e]">
      <Sidebar isToggle={toggleMenu} handleToggleMenu={handleToggleMenu} />
      <div
        className={`${
          toggleMenu ? "ml-[100px] duration-300 ease-in-out" : "ml-[270px]"
        }`}
      >
        <Row className="relative">
          <Col span={24}>
            <section className="px-[24px]">
              {showTab && <Header />}
              {children}
            </section>
          </Col>
        </Row>
      </div>
      <Footer toggleMenu={toggleMenu} />
    </div>
  );
};
