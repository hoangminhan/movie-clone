import React from "react";
import { Tabs } from "antd";
import { TabMovie, TabTvShow } from "components";
import styled from "styled-components";

const { TabPane } = Tabs;

const StyledTabs = styled(Tabs)`
  .ant-tabs-tab {
    color: #989898;
    font-size: 16px;
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
  const handleChangeCurrentTab = (data) => {
    switch (data) {
      case "Movie":
        return <TabMovie />;
      case "Tv Show":
        return <TabTvShow />;

      default:
        return <TabMovie />;
    }
  };
  return (
    <nav className="basis-1/5">
      <StyledTabs
        defaultActiveKey="1"
        animated
        onChange={handleChangeCurrentTab}
      >
        <TabPane key={1} tab={"Movie"}></TabPane>
        <TabPane key={2} tab={"Tv Show"}></TabPane>
        <TabPane key={3} tab={"Series"}></TabPane>
      </StyledTabs>
    </nav>
  );
};
