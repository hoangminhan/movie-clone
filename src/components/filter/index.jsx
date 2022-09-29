import { Collapse, Select } from "antd";
import { t } from "i18next";
import React from "react";

const { Panel } = Collapse;
const { Option } = Select;

const filterOption = [
  { name: "Popularity Descending", value: "popularity.desc" },
  { name: "Popularity Ascending", value: "popularity.asc" },
  { name: "Rating Descending", value: "vote_count.desc" },
  { name: "Rating Ascending", value: "vote_count.asc" },
  { name: "Release date Descending", value: "release_date.desc" },
  { name: "Release date Ascending", value: "release_date.asc" },
  { name: "Title (A-Z)", value: "original_title.asc" },
  { name: "Title (Z-A)", value: "original_title.desc" },
];

export const Filter = ({ listGenresMovie, handleFilter }) => {
  console.log({ listGenresMovie });

  const handleSelectSort = (data) => {
    console.log({ data });
    handleFilter(data);
  };
  return (
    <div>
      <div className="rounded-lg overflow-hidden">
        <Collapse
          defaultActiveKey={["1"]}
          // onChange={onChange}
          expandIconPosition="end"
        >
          <Panel
            header={
              <div className="">
                <p className="text-black text-[20px] font-medium">
                  {t("Sort")}
                </p>
              </div>
            }
            key="1"
          >
            <div className="text-[red]">
              <p className="text-black text-[18px]">{t("Sort Results By")}</p>
              <div className="mt-2">
                <Select
                  defaultValue={filterOption[0].value}
                  style={{
                    width: "100%",
                  }}
                  //   onChange={handleChange}
                  onSelect={handleSelectSort}
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
        </Collapse>
      </div>
      <div className="mt-5 rounded-lg overflow-hidden">
        <Collapse
          defaultActiveKey={["1"]}
          // onChange={onChange}
          expandIconPosition="end"
        >
          <Panel
            header={
              <div className="">
                <p className="text-black text-[20px] font-medium">
                  {t("Filters")}
                </p>
              </div>
            }
            key="1"
          >
            <div className="">
              <p className="text-black mb-4 text-[18px]">{t("Genres")}</p>
              <div className="max-h-[150px] overflow-y-scroll flex flex-wrap gap-2 scroll-b scroll-custom">
                {listGenresMovie?.map((genres, index) => (
                  <p
                    key={genres.id}
                    className="text-black rounded-md px-2 bg-slate-500 cursor-pointer line-clamp-1"
                  >
                    {genres.name.replace("Phim", "")}
                  </p>
                ))}
              </div>
            </div>
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};
