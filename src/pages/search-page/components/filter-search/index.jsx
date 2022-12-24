import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Collapse, Select } from "antd";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const StyledCollapse = styled(Collapse)`
  &.ant-collapse {
    background-color: #333335;
    border-color: #333335;
  }
  .ant-collapse-content > .ant-collapse-content-box {
    background-color: #333335;
  }
  &.ant-collapse > .ant-collapse-item {
    border-bottom: none;
  }
`;
const { Panel } = Collapse;
const { Option } = Select;

const filterOption = [
  { name: "All", value: "multi" },
  { name: "Movie", value: "movie" },
  { name: "Tv show", value: "tv" },
  { name: "People", value: "person" },
];

export const FilterSearch = ({ filterSearch, handleChangeFilterType }) => {
  const [currentOption, setCurrentOption] = useState(filterSearch.type);
  const [t] = useTranslation();
  return (
    <div>
      <StyledCollapse
        defaultActiveKey={["1"]}
        // onChange={onChange}
        expandIconPosition="end"
      >
        <Panel
          header={
            <div>
              <p className="text-white text-[20px] font-medium">
                {t("search filter")}
              </p>
            </div>
          }
          key="1"
        >
          <div className="text-[white]">
            <div className="mt-2 ">
              {filterOption.map((item, index) => {
                return (
                  <div
                    key={item.value}
                    className={`text-[18px] mb-3 text-center hover:bg-[#49494b] py-1 rounded-md cursor-pointer ${
                      item.value === currentOption ? "bg-[#49494b]" : ""
                    }`}
                    onClick={() => {
                      //   setCurrentOption((preOption) => {
                      //     if (preOption !== item.value) {
                      //       return item.value;
                      //     } else {
                      //       return preOption;
                      //     }
                      //   });

                      if (currentOption === item.value) return;
                      else {
                        setCurrentOption(item.value);
                        handleChangeFilterType(item.value);
                      }
                    }}
                  >
                    {item.name}
                  </div>
                );
              })}
            </div>
          </div>
        </Panel>
      </StyledCollapse>
    </div>
  );
};
