import React from "react";
import { Tabs } from "antd";
import { TabMovie, TabTvShow } from "components";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const { TabPane } = Tabs;

const StyledTabs = styled(Tabs)`
  .ant-tabs-tab {
    color: #989898;
    font-size: 22px;
  }
  .ant-tabs-tab:hover {
    color: #fff !important;
  }
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #fff;
  }
  &.ant-tabs-top > .ant-tabs-nav::before,
  .ant-tabs-bottom > .ant-tabs-nav::before,
  .ant-tabs-top > div > .ant-tabs-nav::before,
  &.ant-tabs-bottom > div > .ant-tabs-nav::before {
    border-bottom-color: transparent;
  }
  &.ant-tabs > .ant-tabs-nav,
  .ant-tabs > div > .ant-tabs-nav {
    margin-bottom: 0;
  }
`;

export const Menu = () => {
  const currentTab = sessionStorage.getItem("currentTab") || "/";
  const navigate = useNavigate();
  const handleChangeCurrentTab = (data) => {
    sessionStorage.setItem("currentTab", data);

    if (data === "/") {
      navigate(`/`);
    } else {
      navigate(`/${data}`);
    }
  };
  return (
    <nav className="basis-1/5">
      <StyledTabs
        defaultActiveKey={currentTab}
        animated
        onChange={handleChangeCurrentTab}
      >
        <TabPane key={"/"} tab={"Movie"}></TabPane>
        <TabPane key={"tab-tv-show"} tab={"Tv Show"}></TabPane>
        <TabPane key={"tab-series"} tab={"Series"}></TabPane>
      </StyledTabs>
    </nav>
  );
};
