import { Card, Input, Pagination, Skeleton } from "antd";
import { UsePeople } from "hooks";
import React, { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { getImage } from "utils";
import { UserContext } from "contexts";
import { useRef } from "react";
const { Meta } = Card;

const StyledPagination = styled(Pagination)`
  .ant-pagination-item {
    border-radius: 999px;
  }
  .ant-pagination-prev {
    /* display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 999px; */
  }
  .ant-pagination-prev .ant-pagination-item-link,
  .ant-pagination-next .ant-pagination-item-link {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 999px;
  }
  .ant-pagination-jump-next
    .ant-pagination-item-container
    .ant-pagination-item-ellipsis {
    color: #fff;
  }
`;
const { Search } = Input;

const PeoplePage = () => {
  const {
    handleGetListCastPopular,
    listPopularPeople,
    detailListPeople,
    handleGetSearchPeople,
  } = UsePeople();
  const locale = sessionStorage.getItem("currentLocale") || "vi-VN";
  const { totalPage, page } = detailListPeople;
  const [searchParams, setSearchParams] = useSearchParams({});
  const [isLoading, setIsLoading] = useState(false);

  const [filters, setFilters] = useState(() => ({
    page: searchParams.get("page") || 1,
    language: searchParams.get("language") || locale || "vi-VN",
    query: searchParams.get("query") || "",
  }));
  const stateContext = useContext(UserContext);

  // const globalLocale =

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
    }, 2000);
  };
  return (
    <>
      <div className="flex justify-end mb-10">
        <div className="grow-[1] max-w-[350px]">
          {/* <Search
            placeholder="Search cast"
            defaultValue={filters.query}
            size="large"
            loading={isLoading}
            onChange={handleSearch}
          /> */}
          <input
            type="text"
            placeholder="Search cast"
            className="p-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg"
            defaultValue={filters.query}
            onChange={handleSearch}
          />
        </div>
      </div>
      {isLoading ? (
        <div>
          <Skeleton paragraph={{ rows: 20 }} />
        </div>
      ) : (
        <div className="flex flex-wrap gap-10">
          {listPopularPeople.map((people, index) => {
            return (
              <Link to={`/cast/${people.id}`} key={index}>
                <div className="rounded-lg overflow-hidden">
                  <Card
                    hoverable
                    style={{
                      width: 180,
                    }}
                    cover={
                      <img
                        alt="people"
                        src={getImage(people.profile_path, "w185")}
                      />
                    }
                  >
                    <Meta title={people.name} className="justify-center" />
                  </Card>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* pagination */}
      <div className="mt-10 flex justify-center">
        <StyledPagination
          current={+filters.page}
          defaultCurrent={+filters.page}
          showSizeChanger={false}
          total={totalPage}
          pageSize={20}
          onChange={(page, pageSize) => {
            setFilters({ ...filters, page: page });
          }}
        />
      </div>
    </>
  );
};

export default PeoplePage;
