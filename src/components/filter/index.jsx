import { Collapse, DatePicker, Select } from "antd";
import moment from "moment";
import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const { Panel } = Collapse;
const { Option } = Select;

const filterOption = [
  { name: "Popularity Descending", value: "popularity.desc" },
  { name: "Popularity Ascending", value: "popularity.asc" },
  { name: "Rating Descending", value: "vote_count.desc" },
  { name: "Rating Ascending", value: "vote_count.asc" },
  // { name: "Release date Descending", value: "release_date.desc" },
  // { name: "Release date Ascending", value: "release_date.asc" },
  // { name: "Title (A-Z)", value: "original_title.asc" },
  // { name: "Title (Z-A)", value: "original_title.desc" },
];
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

const handleCheckActiveGenres = (Genres, datacheck) => {
  const newGenres = Genres.map((str) => {
    return Number(str);
  });
  return newGenres.includes(+datacheck);
};

export const Filter = ({
  listGenresMovie,
  handleSelectSort,
  filters,
  handleChangeFilterGenres,
  handleDeleteFilter,
  handleChangeFilterDate,
  handelClearFilter,
}) => {
  const [t] = useTranslation();
  const [isVisibleSelect, setIsVisibleSelect] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams({});
  const [listGenres, setListGenres] = useState(
    filters?.with_genres?.length > 0 ? [...filters.with_genres] : []
  );

  const handleSelectSortDiscover = (data) => {
    handleSelectSort(data);
  };
  return (
    <div>
      <div className="rounded-lg overflow-hidden bg-[#333335]">
        <StyledCollapse
          defaultActiveKey={["1"]}
          // onChange={onChange}
          expandIconPosition="end"
        >
          <Panel
            header={
              <div className="">
                <p className="text-white text-[20px] font-medium">
                  {t("Sort")}
                </p>
              </div>
            }
            key="1"
          >
            <div className="text-[red]">
              <p className="text-white text-[16px]">{t("Sort Results By")}</p>
              <div className="mt-2">
                <Select
                  value={filters.sort_by}
                  style={{
                    width: "100%",
                  }}
                  onChange={handleSelectSortDiscover}
                >
                  {filterOption?.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {t(`${option.name}`)}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
          </Panel>
        </StyledCollapse>
      </div>
      <div className="mt-5 rounded-lg overflow-hidden">
        <StyledCollapse
          defaultActiveKey={["1"]}
          // onChange={onChange}
          expandIconPosition="end"
        >
          <Panel
            header={
              <div className="">
                <p className="text-white text-[20px] font-medium">
                  {t("Filters")}
                </p>
              </div>
            }
            key="1"
          >
            {/* genres */}
            <div className="">
              <p className="text-white mb-4 text-[16px]">{t("Genres")}</p>
              <div className="max-h-[150px] overflow-y-scroll flex flex-wrap gap-2 scroll-b scroll-custom">
                {listGenresMovie?.map((genres, index) => (
                  <p
                    key={genres.id}
                    className={`text-white rounded-md px-2 bg-slate-500 cursor-pointer line-clamp-1 hover:bg-primarybg hover:text-white
                    ${
                      handleCheckActiveGenres(listGenres, genres.id)
                        ? "bg-primarybg"
                        : ""
                    }
                    `}
                    onClick={() => {
                      if (listGenres.length === 0) {
                        setListGenres([genres.id]);
                        handleChangeFilterGenres(genres.id);
                      } else {
                        const newGenres = listGenres.map((str) => {
                          return Number(str);
                        });
                        if (newGenres.includes(genres.id)) {
                          setListGenres((PreState) => {
                            const newState = PreState.map((str) => {
                              return Number(str);
                            });
                            return newState.filter(
                              (item) => item !== genres.id
                            );
                          });
                          handleDeleteFilter(genres.id);
                        } else {
                          setListGenres([...listGenres, genres.id]);
                          handleChangeFilterGenres(genres.id);
                        }
                      }
                    }}
                  >
                    {genres.name.replace("Phim", "")}
                  </p>
                ))}
              </div>
            </div>
            {/* search all releases */}
            <div className="mt-5 ">
              <p className="text-white mb-4 text-[16px]">
                {t("Search all releases")}
              </p>
              <div>
                <p className="mb-1">{t("From date:")}</p>
                <div>
                  <DatePicker
                    style={{ width: "100%" }}
                    onChange={(date, dateString) => {
                      handleChangeFilterDate(dateString, "from");
                    }}
                    format="YYYY-MM-DD"
                    allowClear={false}
                  />
                </div>
              </div>
              <div className="mt-3">
                <p className="mb-1">{t("To date:")}</p>
                <div>
                  <DatePicker
                    style={{ width: "100%" }}
                    onChange={(date, dateString) => {
                      handleChangeFilterDate(dateString, "to");
                    }}
                    defaultPickerValue={moment(new Date(), "YYYY-MM-DD")}
                    defaultValue={moment(new Date(), "YYYY-MM-DD")}
                    format="YYYY-MM-DD"
                    allowClear={false}
                  />
                </div>
              </div>
            </div>

            {/* clear filter */}

            <div className="mt-4 w-[full]">
              <button
                className="text-white bg-primarybg w-[100%] h-[30px] rounded-md cursor-pointer"
                onClick={() => {
                  handelClearFilter();
                  setListGenres([]);
                }}
              >
                {t("Clear")}
              </button>
            </div>
          </Panel>
        </StyledCollapse>
      </div>
    </div>
  );
};
