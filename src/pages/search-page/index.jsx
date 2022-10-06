import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "antd";
import { UserContext } from "contexts";
import { UsePeople } from "hooks";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { ContentSearch, FilterSearch } from "./components";

const SearchPage = () => {
  const { handleGetDataPageSearch } = UsePeople();
  const refSearch = useRef(null);
  const stateContext = useContext(UserContext);
  const { localeGlobal } = stateContext;
  const [globalLocale, setGlobalLocale] = localeGlobal;
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterSearch, setFilterSearch] = useState({
    page: searchParams.get("page") || 1,
    laguage: searchParams.get("language") || globalLocale,
    query: searchParams.get("query") || "",
    type: searchParams.get("type") || "multi",
  });
  const [valueInput, setValueInput] = useState(filterSearch.query);
  const handleChangeFilterType = (type) => {
    setFilterSearch({ ...filterSearch, type });
  };
  useEffect(() => {
    refSearch.current.focus();
  }, []);

  useEffect(() => {
    setSearchParams({
      ...filterSearch,
    });
  }, [filterSearch, stateContext]);

  useEffect(() => {
    const getData = async () => {
      handleGetDataPageSearch(filterSearch.type, {
        ...filterSearch,
        api_key: process.env.REACT_APP_API_KEY,
      });
    };
    getData();
  }, [filterSearch, stateContext]);
  return (
    <div className="min-h-[100vh]">
      <div
        className="text-center
      mt-4 "
      >
        <p>Find your favourite movies, TV shows, people and more</p>
      </div>
      <div className="mt-7 flex justify-center">
        <div className="w-[800px] relative">
          <input
            ref={refSearch}
            placeholder="Search..."
            value={valueInput}
            type="text"
            className="w-full  border-none outline-none px-4 pl-[50px] py-3 rounded-3xl bg-[#333335] text-white"
            onChange={(event) => {
              const { value } = event.target;
              setValueInput(value);
              if (refSearch.current) {
                console.log("1", refSearch.current);
                clearTimeout(refSearch.current);
              }
              refSearch.current = setTimeout(() => {
                console.log("2");
                setFilterSearch({ ...filterSearch, query: value });
              }, 1000);
            }}
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-[10px] top-[50%] -translate-y-1/2 text-white"
          />
        </div>
      </div>
      <Row gutter={[24, 24]} className="mt-[32px]">
        <Col span={19}>
          <ContentSearch />
        </Col>
        <Col span={5}>
          <FilterSearch
            filterSearch={filterSearch}
            handleChangeFilterType={handleChangeFilterType}
          />
        </Col>
      </Row>
    </div>
  );
};

export default SearchPage;
