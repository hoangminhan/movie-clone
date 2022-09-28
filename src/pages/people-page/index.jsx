import { Card, Pagination, Skeleton } from "antd";
import { ImageCustom } from "components";
import { UsePeople } from "hooks";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getImage } from "utils";
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

const PeoplePage = () => {
  const {
    handleGetListCastPopular,
    listPopularPeople,
    detailListPeople,
  } = UsePeople();
  const locale = sessionStorage.getItem("currentLocale") || "vi-VN";
  const { totalPage, page } = detailListPeople;
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(page || 1);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      await handleGetListCastPopular({
        api_key: process.env.REACT_APP_API_KEY,
        language: locale,
        page: currentPage,
      });
      setIsLoading(false);
    };
    getData();
  }, [currentPage]);
  console.log({ listPopularPeople, detailListPeople });
  return (
    <>
      <div className="flex flex-wrap gap-10 justify-evenly">
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
      {/* pagination */}
      <div className="mt-10 flex justify-center">
        <StyledPagination
          current={currentPage}
          showSizeChanger={false}
          total={totalPage}
          pageSize={20}
          onChange={(page, pageSize) => {
            console.log({ page, pageSize });
            setCurrentPage(page);
          }}
        />
      </div>
    </>
  );
};

export default PeoplePage;
