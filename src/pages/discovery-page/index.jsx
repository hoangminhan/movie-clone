import { Col, Row } from "antd";
import { Filter, SkeletonCustom } from "components";
import { UserContext } from "contexts";
import { useTitle } from "hooks";
import { useHomePage } from "hooks/use-homepage";
import moment from "moment/moment";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { ContentDiscovery } from "./component";

const DiscoveryPage = () => {
  const stateContext = useContext(UserContext);
  // true is movie
  const [currentTab, setCurrentTab] = useState(true);
  const locale = sessionStorage.getItem("currentLocale") || "vi-VN";
  const [searchParams, setSearchParams] = useSearchParams({
    language: locale,
    sort_by: "popularity.desc",
    with_genres: [],
    page: 1,
  });
  const { handleChangeTitle } = useTitle();
  const [t] = useTranslation();

  const filterMovie = {
    api_key: process.env.REACT_APP_API_KEY,
    language: searchParams.get("laguage") || locale,
    sort_by: searchParams.get("sort_by") || "popularity.desc",
    with_genres: searchParams.getAll("with_genres") || [],
    page: searchParams.get("page") || 1,
    "primary_release_date.gte":
      searchParams.get("primary_release_date.gte") || [],
    "primary_release_date.lte":
      searchParams.get("primary_release_date.lte") ||
      moment(new Date()).format("YYYY-MM-DD"),
  };
  const filterTv = {
    api_key: process.env.REACT_APP_API_KEY,
    language: searchParams.get("laguage") || locale,
    sort_by: searchParams.get("sort_by") || "popularity.desc",
    with_genres: searchParams.getAll("with_genres") || [],
    page: searchParams.get("page") || 1,
    "air_date.gte:": searchParams.get("air_date.gte:") || [],
    "air_date.lte":
      searchParams.get("air_date.lte") ||
      moment(new Date()).format("YYYY-MM-DD"),
  };
  const [filters, setFilters] = useState(currentTab ? filterMovie : filterTv);

  const {
    listGenresMovie,
    dataDiscoverMovie,
    handleGetListGenresMovie,
    handleGetDiscoverMovieTv,
    isLoading,
  } = useHomePage();

  const handleChangeCurrentTab = (tab) => {
    setCurrentTab(tab);
    if (tab) {
      setFilters({
        ...filterMovie,
        page: 1,
        sort_by: "popularity.desc",
        with_genres: [],
      });
      // searchParams.set("page", 1);
      // searchParams.set("sort_by", "popularity.desc");
    } else {
      setFilters({
        ...filterTv,
        page: 1,
        sort_by: "popularity.desc",
        with_genres: [],
      });
      // searchParams.set("page", 1);
      // searchParams.set("sort_by", "popularity.desc");
    }
  };

  const handleSelectSort = (data) => {
    setFilters({ ...filters, sort_by: data });
  };

  const handleDeleteFilter = (data) => {
    setFilters({
      ...filters,
      with_genres: filters.with_genres.filter((item) => item != data),
    });
    setSearchParams({
      ...filters,
      api_key: "",
      with_genres: filters.with_genres.filter((item) => item != data),
    });
  };

  const handleChangePage = (page) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setFilters({ ...filters, page });
  };

  const handleChangeFilterGenres = (data) => {
    setFilters({
      ...filters,
      with_genres: [...filters.with_genres, data],
    });
  };

  const handleChangeFilterDate = (date, type) => {
    if (type === "from") {
      if (currentTab) {
        setFilters({ ...filters, "primary_release_date.gte": date });
      } else {
        setFilters({ ...filters, "air_date.gte": date });
      }
    } else {
      if (currentTab) {
        setFilters({ ...filters, "primary_release_date.lte": date });
      } else {
        setFilters({ ...filters, "air_date.lte": date });
      }
    }
  };

  // cleaer filter
  const handelClearFilter = () => {
    if (currentTab) {
      setFilters({
        ...filters,
        api_key: process.env.REACT_APP_API_KEY,
        language: locale,
        sort_by: "popularity.desc",
        with_genres: [],
        page: 1,
        "primary_release_date.gte": [],
        "primary_release_date.lte": moment(new Date()).format("YYYY-MM-DD"),
      });
    } else {
      setFilters({
        ...filters,
        api_key: process.env.REACT_APP_API_KEY,
        language: locale,
        sort_by: "popularity.desc",
        with_genres: [],
        page: 1,
        "air_date.gte": [],
        "air_date.lte": moment(new Date()).format("YYYY-MM-DD"),
      });
    }
  };
  // sync filter to url
  useEffect(() => {
    const locale = sessionStorage.getItem("currentLocale") || "vi-VN";
    setSearchParams({ ...filters, language: locale, api_key: "" });
  }, [filters, stateContext, currentTab]);

  const [isLoadingSkeleton, setIsLoadingSkeleton] = useState(false);
  // handle filters
  useEffect(() => {
    const getData = async () => {
      setIsLoadingSkeleton(true);
      const type = currentTab ? "movie" : "tv";

      await handleGetDiscoverMovieTv(type, filters);
      setIsLoadingSkeleton(false);
    };
    getData();
  }, [stateContext, filters, currentTab]);
  useEffect(() => {
    handleChangeTitle(t("Discovery"));
  }, []);

  useEffect(() => {
    const getData = async () => {
      const locale = sessionStorage.getItem("currentLocale") || "vi-VN";
      const type = currentTab ? "movie" : "tv";

      await handleGetListGenresMovie(type, {
        api_key: process.env.REACT_APP_API_KEY,
        language: locale,
      });
    };
    getData();
  }, [stateContext, currentTab]);

  return (
    <div className="py-[12px] min-h-[100vh] ">
      <Row gutter={[12, 12]} className="flex-wrap-reverse">
        <Col xs={24} md={24} lg={18} xl={19} xxl={20}>
          <ContentDiscovery
            currentTab={currentTab}
            handleChangeCurrentTab={handleChangeCurrentTab}
            handleChangePage={handleChangePage}
            dataDiscoverMovie={dataDiscoverMovie}
            filters={filters}
            isLoadingDiscover={isLoading}
            isLoadingSkeleton={isLoadingSkeleton}
          />
        </Col>

        <Col xs={24} md={24} lg={6} xl={5} xxl={4} className="mt-[75px]">
          <Filter
            listGenresMovie={listGenresMovie}
            handleSelectSort={handleSelectSort}
            filters={filters}
            handleChangeFilterGenres={handleChangeFilterGenres}
            handleDeleteFilter={handleDeleteFilter}
            handleChangeFilterDate={handleChangeFilterDate}
            handelClearFilter={handelClearFilter}
          />
          {/* <Filter listGenresMovie={listGenresMovie} /> */}
        </Col>
      </Row>
    </div>
  );
};
export default DiscoveryPage;
