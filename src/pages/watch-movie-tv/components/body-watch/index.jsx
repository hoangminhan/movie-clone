import {
  faThumbsDown,
  faThumbsUp,
  faThumbTack,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Progress, Skeleton, Tooltip } from "antd";
import iconImg from "assets";
import { ButtonAddList } from "components";
import React from "react";
import { useTranslation } from "react-i18next";
import Iframe from "react-iframe";
import ReactPlayer from "react-player";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { embedMovieTrailer, formatNumber, getImage } from "utils";

const StyledProgress = styled(Progress)`
  .antd-progress-text {
    color: red !important;
  }
`;

export const BodyWatch = ({
  listCastsMovie,
  dataDetail,
  listKeywordsMovie,
  infoTrailerMovie,
  isLoadingDetail,
  currenTab,
  dataSeason,
}) => {
  const { numberSearson, currentSeason, currentEpisode } = dataSeason;
  const [t] = useTranslation();
  const navigate = useNavigate();
  return (
    <>
      <div className="mt-[128px] text-[#fff]">
        <p className="uppercase underline font-medium text-primarybg text-[20px]">
          {t("information")}
        </p>

        {dataDetail ? (
          <div className="mt-6">
            <h3 className="text-[#fff] text-[16px]">
              {currenTab !== "/" ? (
                <>
                  <span>
                    {t("Season")} {currentSeason}
                  </span>{" "}
                  <span>
                    {t("Episode")} {currentEpisode}
                  </span>
                </>
              ) : (
                ""
              )}
              <span className="mt-3 text-[18px]">
                {dataDetail?.title
                  ? dataDetail.title
                  : dataDetail.original_title}
              </span>
            </h3>

            <p className={`text-[16px] ${dataDetail?.overview ? "mt-3" : ""}`}>
              {dataDetail?.overview && dataDetail.overview}
            </p>
            {/* genres */}

            {currenTab === "/" ? (
              <div className="text-[16px] flex items-center flex-wrap">
                <span className="mr-2 text-[16px]">{t("Genres")}:</span>
                {dataDetail?.genres?.map((genre, index) => {
                  return (
                    <div key={index} className="cursor-pointer">
                      <Link to={`/genres/${genre.id}-${genre.name}`}>
                        {index < dataDetail.genres.length - 1 ? (
                          <span>{genre.name},&nbsp;</span>
                        ) : (
                          <span>{genre.name}</span>
                        )}
                      </Link>
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )}

            {/* trailer */}

            <div className="mt-4 animate-pulse">
              <p className="my-4 underline text-[16px]">Trailer:</p>
              {isLoadingDetail ? (
                <Skeleton active paragraph={{ rows: 10 }} />
              ) : (
                <ReactPlayer
                  url={embedMovieTrailer(infoTrailerMovie?.key)}
                  style={{ margin: "0 auto" }}
                  height={500}
                  width="100%"
                  controls
                />
              )}
            </div>

            {/* rating */}
            <div className="flex items-center gap-4 mt-9">
              <p className="text-white text-[16px]">{t("Rating")}:</p>
              {isLoadingDetail ? (
                <Skeleton active avatar />
              ) : (
                <StyledProgress
                  format={(percent, successPercent) => {
                    return <span className="text-white">{percent / 10}</span>;
                  }}
                  width={80}
                  type="circle"
                  strokeColor="text-primary"
                  trailColor="white"
                  percent={formatNumber(dataDetail.vote_average, 10) * 10}
                />
              )}
            </div>
            {/* casts */}

            <h3 className="text-white text-[16px] mt-6">
              {t("Cast")}: &nbsp;
              {!listCastsMovie?.length && (
                <span className="text-[16px]">{t("Updating")}...</span>
              )}
            </h3>
            <div className="flex flex-wrap gap-x-4 gap-y-6 my-4 pl-4 justify-between tablet:justify-start">
              {listCastsMovie?.map((cast, index) => {
                return (
                  <Link key={index} to={`/cast/${cast.id}`}>
                    <div className="flex w-[250px] gap-2">
                      <Skeleton loading={isLoadingDetail} active avatar>
                        <div className="max-w-[65px] w-full h-[65px]">
                          <img
                            className="object-cover rounded-[50%] h-[65px] w-[65px]"
                            src={
                              getImage(cast.profile_path, "w185").includes(
                                "null"
                              )
                                ? iconImg.Img404
                                : getImage(cast.profile_path, "w185")
                            }
                            alt=""
                          />
                        </div>
                        <div className="grow-[1] flex flex-col text-[16px]">
                          <Tooltip title={cast.name}>
                            <p className="text-primary line-clamp-1">
                              {cast.name}
                            </p>
                          </Tooltip>
                          <p className="line-clamp-1">
                            <span className="mr-1">as</span>
                            {cast.character}
                          </p>
                        </div>
                      </Skeleton>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* key words */}
            <div className="flex flex-wrap gap-2 text-[14px] text-yellow-200 mt-8">
              <p className="text-[16px]">{t("Keywords")}:</p>
              {listKeywordsMovie.map((keyword) => {
                const nameKeyword = keyword.name;
                return (
                  <Tooltip key={keyword.id} title={keyword.name}>
                    <p
                      className="underline cursor-pointer"
                      onClick={() => {
                        const currentTab = sessionStorage.getItem("currentTab");
                        if (currentTab === "/") {
                          navigate(`/keyword/${keyword.id}`);
                        }
                      }}
                    >
                      {keyword.name}
                    </p>
                  </Tooltip>
                );
              })}
              {!listKeywordsMovie?.length && (
                <span className="text-[16px]">{t("Updating")}...</span>
              )}
            </div>
          </div>
        ) : (
          <div className="mt-6">
            <Skeleton paragraph={{ rows: 15 }} />
          </div>
        )}
      </div>
    </>
  );
};
