import { Collapse, Select } from "antd";
import React from "react";

const { Panel } = Collapse;
const { Option } = Select;

const filterOption = [
  { name: "Popularity Descending", value: 0 },
  { name: "Popularity Ascending", value: 1 },
  { name: "Rating Descending", value: 2 },
  { name: "Rating Ascending", value: 3 },
  { name: "Release date Descending", value: 4 },
  { name: "Release date Ascending", value: 5 },
  { name: "Title (A-Z)", value: 6 },
  { name: "Title (Z-A)", value: 7 },
];

export const Filter = ({ listGenresMovie }) => {
  console.log({ listGenresMovie });
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <div>
      <div className="rounded-lg overflow-hidden">
        <Collapse
          defaultActiveKey={["1"]}
          onChange={onChange}
          expandIconPosition="end"
        >
          <Panel
            header={
              <div className="">
                <p className="text-black text-[20px] font-medium">Sort</p>
              </div>
            }
            key="1"
          >
            <div className="text-[red]">
              <p className="text-black text-[18px]">Sort Results By</p>
              <div className="mt-2">
                <Select
                  defaultValue={filterOption[0].value}
                  style={{
                    width: "100%",
                  }}
                  //   onChange={handleChange}
                >
                  {filterOption.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.name}
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
          onChange={onChange}
          expandIconPosition="end"
        >
          <Panel
            header={
              <div className="">
                <p className="text-black text-[20px] font-medium">Filters</p>
              </div>
            }
            key="1"
          >
            <div className="">
              <p className="text-black mb-4 text-[18px]">Genres</p>
              <div className="max-h-[150px] overflow-y-scroll flex flex-wrap gap-1">
                {listGenresMovie.map((genres, index) => (
                  <p
                    key={genres.id}
                    className="text-black rounded-md px-2 bg-slate-500 cursor-pointer"
                  >
                    {genres.name}
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
