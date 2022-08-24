import React from "react";
import { Tabs } from "antd";
import { TabMovie, TabTvShow } from "components";
const { TabPane } = Tabs;

const Itemtab = [
  {
    title: "Movie",
    content: <TabMovie />,
    key: "1",
  },
  {
    title: "Tv Show",
    content: <TabTvShow />,
    key: "2",
  },
];

export const Menu = () => {
  return (
    <nav>
      <Tabs defaultActiveKey={Itemtab[0].key}>
        {Itemtab?.map((item, index) => (
          <TabPane key={item.key} tab={item.title}>
            {item.content}
          </TabPane>
        ))}
      </Tabs>
    </nav>
  );
};
