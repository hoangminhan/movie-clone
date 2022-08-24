import React, { useState } from "react";
import { Aside, Header, Footer, Sidebar } from "components";
import { Col, Row } from "antd";

export const DefaultLayout = ({ children }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const handleToggleMenu = (data) => {
    setToggleMenu(data);
  };
  return (
    <div className="min-h-[100vh]">
      <Sidebar toggleMenu={toggleMenu} handleToggleMenu={handleToggleMenu} />
      <div
        className={`${
          toggleMenu
            ? "ml-[110px] duration-300 ease-in-out"
            : "ml-[280px] h-[100%]"
        }`}
      >
        <Row>
          <Col xs={24} md={19}>
            <section>
              <Header />
              {children}
              <Footer />
            </section>
          </Col>
          <Col xs={24} md={5}>
            <Aside />
          </Col>
        </Row>
      </div>
    </div>
  );
};
