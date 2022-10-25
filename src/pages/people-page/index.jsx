import { Card, Input, Pagination, Skeleton } from "antd";
import { UsePeople, useTitle } from "hooks";
import React, { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { getImage, handleScrollToTop } from "utils";
import { UserContext } from "contexts";
import { useRef } from "react";
import { ImageCustom, SkeletonCustom, StyledPagination } from "components";
import iconImg from "assets";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const { Meta } = Card;

const { Search } = Input;

const PeoplePage = () => {
  const {
    handleGetListCastPopular,
    listPopularPeople,
    detailListPeople,
    handleGetSearchPeople,
  } = UsePeople();
  const { handleChangeTitle } = useTitle();
  const locale = sessionStorage.getItem("currentLocale") || "vi-VN";
  const { totalPage, page } = detailListPeople;
  const [searchParams, setSearchParams] = useSearchParams({});
  const [isLoading, setIsLoading] = useState(false);
  const [t] = useTranslation();

  const [filters, setFilters] = useState(() => ({
    page: searchParams.get("page") || 1,
    language: searchParams.get("language") || locale || "vi-VN",
    query: searchParams.get("query") || "",
  }));
  const stateContext = useContext(UserContext);

  // const globalLocale =
  useEffect(() => {
    handleChangeTitle("People");
  }, []);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      if (filters.query) {
        await handleGetSearchPeople({
          ...filters,
          api_key: process.env.REACT_APP_API_KEY,
        });
      } else {
        await handleGetListCastPopular({
          api_key: process.env.REACT_APP_API_KEY,
          language: filters.language,
          page: filters.page,
          query: filters.query,
        });
      }

      setIsLoading(false);
      setSearchParams({
        ...filters,
        language: locale,
        query: filters.query,
      });
    };
    getData();
  }, [filters, stateContext]);

  // search debounce
  const refSearch = useRef(null);
  const handleSearch = (event) => {
    const value = event.target.value;
    if (refSearch.current) {
      clearTimeout(refSearch.current);
    }
    refSearch.current = setTimeout(() => {
      setFilters({ ...filters, query: value });
    }, 1500);
  };
  return (
    <div className="min-h-[100vh]">
      {/* <div className="flex justify-end mb-10">
        <div className="grow-[1] max-w-[350px]">
          <input
            type="text"
            placeholder={`${t("Search")}...`}
            className="p-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg"
            defaultValue={filters.query}
            onChange={handleSearch}
          />
        </div>
      </div> */}
      <div className="flex justify-end mb-10">
        <div className="w-[250px] relative">
          <input
            ref={refSearch}
            placeholder={`${t("Search")}...`}
            defaultValue={filters.query}
            type="text"
            className="w-full  border-none outline-none px-4 pl-[50px] py-1 rounded-3xl bg-[#333335] text-white"
            onChange={handleSearch}
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-[10px] top-[50%] -translate-y-1/2 text-white"
          />
        </div>
      </div>

      {isLoading ? (
        // <Skeleton active paragraph={{ rows: 20 }} />
        <SkeletonCustom quantity={10} />
      ) : (
        <div className="flex justify-between">
          <div className="flex flex-wrap gap-10 justify-center">
            {listPopularPeople.map((people, index) => {
              return (
                <Link to={`/cast/${people.id}`} key={index}>
                  <div className="rounded-lg overflow-hidden hover:scale-110 duration-200 max-w-[185px] h-full flex flex-col">
                    <img
                      alt="people"
                      className="flex-1"
                      src={
                        getImage(people.profile_path, "w185").includes(null)
                          ? iconImg.Img404
                          : getImage(people.profile_path, "w185")
                      }
                    />
                    <p className="text-[18px] text-center line-clamp-1">
                      {people.name}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* pagination */}
      <div className="mt-10 flex justify-center">
        <StyledPagination
          current={+filters.page}
          defaultCurrent={+filters.page}
          total={totalPage}
          showSizeChanger={false}
          pageSize={20}
          onChange={(page, pageSize) => {
            setFilters({ ...filters, page: page });
            handleScrollToTop();
          }}
        />
      </div>
    </div>
  );
};

export default PeoplePage;
