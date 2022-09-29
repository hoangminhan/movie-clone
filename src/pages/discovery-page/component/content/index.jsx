import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Empty, Pagination, Skeleton, Tabs, Tooltip } from "antd";
import iconImg from "assets";
import { ImageCustom } from "components";
import React from "react";
import { Link } from "react-router-dom";
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

const StyledPagination = styled(Pagination)`
  .ant-pagination-item {
    border-radius: 999px;
  }
  .ant-pagination-prev {
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

export const ContentDiscovery = ({
  currentTab,
  handleChangeCurrentTab,
  handleChangePage,
  dataDiscoverMovie,
  isLoadingDiscover,
  filters,
}) => {
  const handleChangeTab = (activeKey) => {
    if (handleChangeCurrentTab) {
      handleChangeCurrentTab(activeKey === "1" ? true : false);
    }
  };
  const { page, results: resultDiscover, total_pages } = dataDiscoverMovie;
  return (
    <div className="">
      <StyledTabs defaultActiveKey={currentTab} onChange={handleChangeTab}>
        <StyledTabs.TabPane tab="Movie" key="1">
          {/* content tab movie */}
          {resultDiscover?.length > 0 ? (
            <Skeleton
              active
              loading={isLoadingDiscover}
              paragraph={{ rows: 20 }}
            >
              <div className="mt-5 flex flex-wrap gap-x-10 gap-y-10">
                {resultDiscover?.map((itemMovie, index) => {
                  return (
                    <div
                      key={index}
                      className="hover:scale-110 duration-200 cursor-pointer relative rounded-b-lg rounded-tl-lg overflow-hidden"
                    >
                      <Link to={`/movie/${itemMovie.id}`}>
                        <div>
                          <ImageCustom
                            src={
                              !getImage(itemMovie.poster_path, "w185").includes(
                                "null"
                              )
                                ? getImage(itemMovie.poster_path, "w185")
                                : iconImg.Img404
                            }
                            width="185px"
                            height="100%"
                            className="rounded-b-lg"
                          />
                          <Tooltip title={itemMovie.title}>
                            <p className="pt-2 text-center text-[18px] max-w-[185px] bg-[#1c1c1e] line-clamp-1">
                              {itemMovie.title}
                            </p>
                          </Tooltip>
                        </div>
                      </Link>
                      {/* rate */}
                      <div className="absolute top-[-8px] right-[0px] text-[13px]">
                        <Badge.Ribbon
                          color="#1890ff"
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
            </Skeleton>
          ) : (
            <div
              className="h-[400px] flex items-center
            justify-center"
            >
              <Empty className="text-white text-[20px]" />
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
        <StyledTabs.TabPane tab="TV show" key="0">
          {/* content tab tv show */}

          <div className="mt-5"></div>
        </StyledTabs.TabPane>
      </StyledTabs>
    </div>
  );
};