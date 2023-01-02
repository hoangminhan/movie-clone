import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Empty, Pagination, Skeleton, Tabs, Tooltip } from "antd";
import iconImg from "assets";
import { ImageCustom, SkeletonCustom, StyledPagination } from "components";
import { UserContext } from "contexts";
import { useHomePage } from "hooks/use-homepage";
import React from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { formatNumber, getImage } from "utils";

const StyledTabs = styled(Tabs)`
  .ant-tabs-tab {
    color: #989898;
    font-size: 22px;
  }
  .ant-tabs-tab:hover {
    color: #fff !important;
  }
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #fff;
  }
  &.ant-tabs-top > .ant-tabs-nav::before,
  .ant-tabs-bottom > .ant-tabs-nav::before,
  .ant-tabs-top > div > .ant-tabs-nav::before,
  &.ant-tabs-bottom > div > .ant-tabs-nav::before {
    border-bottom-color: transparent;
  }
  &.ant-tabs > .ant-tabs-nav,
  .ant-tabs > div > .ant-tabs-nav {
    margin-bottom: 0;
  }
`;

export const ContentDiscovery = ({
  currentTab,
  handleChangeCurrentTab,
  handleChangePage,
  dataDiscoverMovie,
  isLoadingDiscover,
  filters,
  isLoadingSkeleton,
}) => {
  const handleChangeTab = (activeKey) => {
    if (handleChangeCurrentTab) {
      handleChangeCurrentTab(activeKey === "true" ? true : false);
    }
  };
  const { page, results: resultDiscover, total_pages } = dataDiscoverMovie;
  const stateContext = useContext(UserContext);
  const { currentTabGlobal } = stateContext;
  const [tabGlobal, setTabGlobal] = currentTabGlobal;
  const navigate = useNavigate();
  return (
    <div className="">
      <StyledTabs defaultActiveKey={currentTab} onChange={handleChangeTab}>
        <StyledTabs.TabPane tab="Movie" key={true}>
          {/* content tab movie */}
          {isLoadingSkeleton ? (
            <SkeletonCustom quantity={10} />
          ) : (
            <div className="mt-5 flex flex-wrap gap-x-0 sm:gap-x-1 lg:gap-x-1 gap-y-10 justify-evenly">
              {resultDiscover?.map((itemMovie, index) => {
                return (
                  <div
                    key={index}
                    className="hover:scale-110 duration-200 cursor-pointer relative rounded-b-lg rounded-tl-lg overflow-hidden"
                    onClick={() => {
                      navigate(`/movie/${itemMovie.id}`);
                      sessionStorage.setItem("currentTab", "/");
                      setTabGlobal("/");
                    }}
                  >
                    <div className="h-[100%] flex flex-col">
                      <img
                        alt=""
                        src={
                          !getImage(itemMovie.poster_path, "w185").includes(
                            "null"
                          )
                            ? getImage(itemMovie.poster_path, "w185")
                            : iconImg.Img404
                        }
                        width="185px"
                        height="100%"
                        className="rounded-b-lg grow-[1]"
                      />
                      <Tooltip title={itemMovie.title}>
                        <p className="pt-2 text-center text-[16px] max-w-[185px] bg-[#1c1c1e] line-clamp-1">
                          {itemMovie.title}
                        </p>
                      </Tooltip>
                    </div>
                    {/* rate */}
                    <div className="absolute top-[-8px] right-[0px] text-[13px]">
                      <Badge.Ribbon
                        color="#158370"
                        text={
                          <p className="rounded-[10px] leading-6">
                            {formatNumber(itemMovie.vote_average, 10)}
                            <span className="inline-block ml-1">
                              <FontAwesomeIcon
                                icon={faStar}
                                className="text-white"
                              />
                            </span>
                          </p>
                        }
                      ></Badge.Ribbon>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex justify-center mt-6">
            {total_pages ? (
              <StyledPagination
                current={+filters.page}
                defaultCurrent={+filters.page}
                showSizeChanger={false}
                total={total_pages > 100 ? 100 : total_pages}
                disabled={isLoadingDiscover}
                pageSize={20}
                onChange={(page, pageSize) => {
                  handleChangePage(page);
                }}
              />
            ) : (
              ""
            )}
          </div>
        </StyledTabs.TabPane>
        <StyledTabs.TabPane tab="TV show" key={false}>
          {/* content tab tv show */}

          {isLoadingSkeleton ? (
            <SkeletonCustom quantity={10} />
          ) : (
            <div className="mt-5 flex flex-wrap gap-x-0 sm:gap-x-1 lg:gap-x-1 gap-y-10 justify-evenly">
              {resultDiscover?.map((itemMovie, index) => {
                return (
                  <div
                    key={index}
                    className="hover:scale-110 duration-200 cursor-pointer relative rounded-b-lg rounded-tl-lg overflow-hidden"
                    onClick={() => {
                      navigate(`/tv/${itemMovie.id}`);
                      sessionStorage.setItem("currentTab", "/tv-show");
                      setTabGlobal("//tv-show");
                    }}
                  >
                    <div className="h-[100%] flex flex-col">
                      <img
                        alt=""
                        src={
                          !getImage(itemMovie.poster_path, "w185").includes(
                            "null"
                          )
                            ? getImage(itemMovie.poster_path, "w185")
                            : iconImg.Img404
                        }
                        width="185px"
                        height="100%"
                        className="rounded-b-lg grow-[1]"
                      />
                      <Tooltip title={itemMovie.name}>
                        <p className="pt-2 px-1 text-center text-[16px] max-w-[185px] bg-[#1c1c1e] line-clamp-1">
                          {itemMovie.name}
                        </p>
                      </Tooltip>
                    </div>

                    {/* rate */}
                    <div className="absolute top-[-8px] right-[0px] text-[13px]">
                      <Badge.Ribbon
                        color="#158370"
                        text={
                          <p className="rounded-[10px] leading-6">
                            {formatNumber(itemMovie.vote_average, 10)}
                            <span className="inline-block ml-1">
                              <FontAwesomeIcon
                                icon={faStar}
                                className="text-white"
                              />
                            </span>
                          </p>
                        }
                      ></Badge.Ribbon>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex justify-center mt-6">
            {total_pages ? (
              <StyledPagination
                current={+filters.page}
                defaultCurrent={+filters.page}
                showSizeChanger={false}
                total={total_pages > 100 ? 100 : total_pages}
                disabled={isLoadingDiscover}
                pageSize={20}
                onChange={(page, pageSize) => {
                  handleChangePage(page);
                }}
              />
            ) : (
              ""
            )}
          </div>
        </StyledTabs.TabPane>
      </StyledTabs>
    </div>
  );
};
