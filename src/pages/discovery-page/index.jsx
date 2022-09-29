import { Col, Pagination, Row } from "antd";
import { Filter } from "components";
import { UserContext } from "contexts";
import { useHomePage } from "hooks/use-homepage";
import React, { useContext, useLayoutEffect } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { ContentDiscovery } from "./component";

const DiscoveryPage = () => {
  const stateContext = useContext(UserContext);
  // true is movie
  const [currentTab, setCurrentTab] = useState(true);
  const locale = sessionStorage.getItem("currentLocale") || "vi-VN";
  const [searchParams, setSearchParams] = useSearchParams({
    api_key: process.env.REACT_APP_API_KEY,
    language: locale,
    sort_by: "popularity.desc",
    with_genres: [],
    page: 1,
  });
  const [isLoadingDiscover, setIsLoadingDiscover] = useState(false);

  const [filters, setFilters] = useState({
    api_key: searchParams.get("api_key") || process.env.REACT_APP_API_KEY,
    language: searchParams.get("laguage") || locale,
    sort_by: searchParams.get("sort_by") || "popularity.desc",
    with_genres: searchParams.getAll("with_genres") || [],
    page: searchParams.get("page") || 1,
  });
  console.log({ filters });

  const {
    listGenresMovie,
    dataDiscoverMovie,
    handleGetListGenresMovie,
    handleGetDiscoverMovie,
  } = useHomePage();

  const handleChangeCurrentTab = (tab) => {
    setCurrentTab(tab);
  };

  const handleSelectSort = (data) => {
    setIsLoadingDiscover(true);

    setFilters({ ...filters, sort_by: data });
  };
  const handleDeleteFilter = (data) => {
    setFilters({
      ...filters,
      with_genres: filters.with_genres.filter((item) => item != data),
    });
    setSearchParams({
      ...filters,
      with_genres: filters.with_genres.filter((item) => item != data),
    });
  };

  const handleChangePage = (page) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setIsLoadingDiscover(true);
    setFilters({ ...filters, page });
  };

  const handleChangeFilterGenres = (data) => {
    setFilters({
      ...filters,
      with_genres: [...filters.with_genres, data],
    });
  };

  // sync filter to url
  useEffect(() => {
    console.log(filters);
    const locale = sessionStorage.getItem("currentLocale") || "vi-VN";
    setSearchParams({ ...filters, language: locale });
  }, [filters, stateContext]);

  // handle filters
  useEffect(() => {
    const getData = async () => {
      await handleGetDiscoverMovie(filters);
    };
    getData();
    setIsLoadingDiscover(false);
  }, [stateContext, filters]);

  useEffect(() => {
    const getData = async () => {
      const locale = sessionStorage.getItem("currentLocale") || "vi-VN";

      await handleGetListGenresMovie({
        api_key: process.env.REACT_APP_API_KEY,
        language: locale,
      });
    };
    getData();
  }, [stateContext]);

  console.log({ dataDiscoverMovie });

  return (
    <div className="py-[12px] min-h-[100vh] ">
      <Row gutter={[12, 12]}>
        <Col span={20}>
          <ContentDiscovery
            currentTab={currentTab}
            handleChangeCurrentTab={handleChangeCurrentTab}
            handleChangePage={handleChangePage}
            dataDiscoverMovie={dataDiscoverMovie}
            filters={filters}
            isLoadingDiscover={isLoadingDiscover}
          />
        </Col>
        <Col span={4}>
          <Filter
            listGenresMovie={listGenresMovie}
            handleSelectSort={handleSelectSort}
            filters={filters}
            handleChangeFilterGenres={handleChangeFilterGenres}
            handleDeleteFilter={handleDeleteFilter}
          />
          {/* <Filter listGenresMovie={listGenresMovie} /> */}
        </Col>
      </Row>
    </div>
  );
};
export default DiscoveryPage;
