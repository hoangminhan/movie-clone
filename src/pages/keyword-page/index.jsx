import { faClose, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Modal, Pagination, Tooltip } from "antd";
import iconImg from "assets";
import { ImageCustom } from "components";
import { UserContext } from "contexts";
import { useHomePage } from "hooks/use-homepage";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import styled from "styled-components";
import { formatNumber, getImage } from "utils";

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

const KeywordPage = () => {
  const [t] = useTranslation();
  const {
    listMovieKeyword,
    dataDetailKeyword,
    handleGetListMovieKeyword,
    handleGetDetailKeyword,
  } = useHomePage();
  const { idKeyword } = useParams();
  const locale = sessionStorage.getItem("currentLocale") || "vi-VN";

  const [searchParams, setSearchParams] = useSearchParams({});
  const [filters, setFilters] = useState({
    page: searchParams.get("page") || 1,
    language: searchParams.get("language") || locale,
  });

  const stateContext = useContext(UserContext);

  const { results, total_pages, page, total_results } = listMovieKeyword;
  const [visibleModal, setVisibleModal] = useState(false);
  const [dataModal, setDataModal] = useState({});

  const handleToggleModal = (result) => {
    setVisibleModal(true);
    setDataModal(result);
  };

  useEffect(() => {
    setSearchParams({ ...filters });
  }, [filters]);

  useEffect(() => {
    const getData = async () => {
      handleGetListMovieKeyword(idKeyword, {
        ...filters,
        api_key: process.env.REACT_APP_API_KEY,
      });
      handleGetDetailKeyword(idKeyword, {
        api_key: process.env.REACT_APP_API_KEY,
      });
    };
    getData();
  }, [stateContext, filters]);
  return (
    <>
      <div className="flex justify-between mt-4">
        <p className="capitalize text-[20px]">{dataDetailKeyword.name || ""}</p>
        <p className="text-[20px]">
          {total_results} {t("movies")}
        </p>
      </div>
      <div className="min-h-[100vh] my-[32px] flex flex-col justify-between">
        <div className="flex flex-wrap gap-[32px] ">
          {results?.map((result, index) => {
            return (
              <div
                key={index}
                className="mb-[32px] max-w-[185px] hover:scale-110 duration-150 cursor-pointer relative flex flex-col"
                onClick={() => {
                  handleToggleModal(result);
                }}
              >
                <ImageCustom
                  src={
                    getImage(result.poster_path, "w185").includes("null")
                      ? iconImg.Img404
                      : getImage(result.poster_path, "w185")
                  }
                  className="rounded-md flex-1"
                />

                <p className="line-clamp-1 text-[16px] text-center">
                  {result.title}
                </p>
                <div className="absolute top-[-8px] right-[0px] text-[13px]">
                  <Badge.Ribbon
                    color="#158370"
                    text={
                      <p className="rounded-[10px]  m-0 leading-6">
                        {formatNumber(result.vote_average, 10)}
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

        {/* pagination */}
        {total_pages > 20 ? (
          <div className="text-center mt-[24px]">
            <StyledPagination
              current={+filters.page}
              defaultCurrent={+filters.page || 1}
              showSizeChanger={false}
              total={total_results}
              pageSize={20}
              onChange={(page, pageSize) => {
                setFilters({ ...filters, page: page });
              }}
            />
          </div>
        ) : (
          ""
        )}
      </div>

      <Modal
        visible={visibleModal}
        footer={null}
        width={800}
        closable={false}
        wrapClassName="modal-config"
      >
        <div>
          {/* header */}
          <div className="relative flex justify-between items-center text-white  after:block after:absolute after:border-b-[1px]  after:border-b-[#ccc]  after:right-[-24px] after:left-[-24px] after:bottom-[-12px]">
            <h2 className="text-white text-[24px]">{t("Information movie")}</h2>
            <FontAwesomeIcon
              icon={faClose}
              fontSize="24px"
              className="cursor-pointer"
              onClick={() => {
                setVisibleModal(false);
              }}
            />
          </div>
          {/* body */}
          <div className="mt-[40px] flex gap-3">
            <div className="flex-1 shrink-1">
              <Tooltip title={dataModal.title}>
                <Link to={`/movie/${dataModal.id}`}>
                  <p className="text-[18px] line-clamp-1">{dataModal.title}:</p>
                </Link>
              </Tooltip>
              <p className="text-[16px] opacity-70">{dataModal.release_date}</p>
              <p className="text-[18px]">
                {t("Overview")}:{" "}
                <span className="text-[16px]">{dataModal.overview}</span>
              </p>
            </div>
            <div className="max-w-[185px] cursor-pointer rounded-md rounded-tr-none overflow-hidden flex-1 relative">
              <Link to={`/movie/${dataModal.id}`}>
                <ImageCustom src={getImage(dataModal.poster_path, "w185")} />
              </Link>
              <div className="absolute top-[-8px] right-[0px] text-[13px]">
                <Badge.Ribbon
                  color="#158370"
                  text={
                    <p className="rounded-[10px]  m-0 leading-6">
                      {formatNumber(dataModal.vote_average, 10)}
                      <span className="inline-block ml-1">
                        <FontAwesomeIcon icon={faStar} className="text-white" />
                      </span>
                    </p>
                  }
                ></Badge.Ribbon>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default KeywordPage;
