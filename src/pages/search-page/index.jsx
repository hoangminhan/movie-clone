import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "antd";
import iconImg from "assets";
import { StyledPagination } from "components";
import { UserContext } from "contexts";
import { UsePeople, useTitle } from "hooks";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { handleScrollToTop } from "utils";
import { ContentSearch, FilterSearch } from "./components";

const SearchPage = () => {
  const {
    handleGetDataPageSearch,
    dataSearchPage,
    isLoadingPeople,
  } = UsePeople();
  const [t] = useTranslation();
  const refSearch = useRef(null);
  const stateContext = useContext(UserContext);
  const { localeGlobal } = stateContext;
  const [globalLocale, setGlobalLocale] = localeGlobal;
  const { results, page, total_pages, total_results } = dataSearchPage;
  const { handleChangeTitle } = useTitle();

  const [searchParams, setSearchParams] = useSearchParams();
  const [filterSearch, setFilterSearch] = useState({
    page: searchParams.get("page") || page || 1,
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
    if (filterSearch.query) {
      const getData = async () => {
        handleGetDataPageSearch(filterSearch.type, {
          ...filterSearch,
          api_key: process.env.REACT_APP_API_KEY,
        });
      };
      getData();
    }
  }, [filterSearch, stateContext]);
  useEffect(() => {
    handleChangeTitle(t("Search"));
  }, []);
  return (
    <div className="min-h-[100vh]">
      <div
        className="text-center
      mt-4 "
      >
        <p>{t("Find your favourite movies, TV shows, people and more")}</p>
      </div>

      <Row gutter={[24, 24]} className="my-[32px]">
        {filterSearch.query ? (
          <div className="ml-4">
            <p>{`Search results for ${filterSearch.query} (${total_results}) results found`}</p>
          </div>
        ) : (
          ""
        )}
        <Col span={19}>
          <div className="my-7 flex justify-center">
            <div className="w-[800px] relative">
              <input
                ref={refSearch}
                placeholder={`${t("Search")}...`}
                value={valueInput}
                type="text"
                className="w-full  border-none outline-none px-4 pl-[50px] py-3 rounded-3xl bg-[#333335] text-white"
                onChange={(event) => {
                  const { value } = event.target;
                  setValueInput(value);
                  if (refSearch.current) {
                    clearTimeout(refSearch.current);
                  }
                  refSearch.current = setTimeout(() => {
                    setFilterSearch({ ...filterSearch, query: value, page: 1 });
                  }, 1000);
                }}
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-[10px] top-[50%] -translate-y-1/2 text-white"
              />
            </div>
          </div>
          {filterSearch.query ? (
            <>
              <ContentSearch
                dataContentSearch={results}
                isLoading={isLoadingPeople}
                type={filterSearch.type}
              />
              {total_pages > 20 ? (
                <div className="text-center my-10">
                  <StyledPagination
                    current={+filterSearch.page}
                    defaultCurrent={+filterSearch.page}
                    showSizeChanger={false}
                    total={total_pages}
                    onChange={(page, _) => {
                      setFilterSearch({
                        ...filterSearch,
                        page,
                      });
                      handleScrollToTop();
                    }}
                  />
                </div>
              ) : (
                ""
              )}
            </>
          ) : (
            <div className="flex justify-center">
              <img
                src={iconImg.skyImg}
                alt=""
                className="w-[50%] rounded-3xl"
              />
            </div>
          )}
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
