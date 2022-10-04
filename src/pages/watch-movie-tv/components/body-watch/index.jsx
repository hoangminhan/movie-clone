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
import { Link } from "react-router-dom";
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
  return (
    <>
      <div className="mt-[128px] px-4 text-[#fff]">
        <p className="uppercase underline font-medium text-primary">
          {t("Information")}
        </p>

        {dataDetail ? (
          <div className="px-4 mt-6">
            <h3 className="text-[#fff]">
              Tóm tắt:
              {currenTab !== "/" ? (
                <>
                  <span>Season {currentSeason}</span>{" "}
                  <span>Episode {currentEpisode}</span>
                </>
              ) : (
                ""
              )}
              <span className="mt-3">
                {dataDetail?.title
                  ? dataDetail.title
                  : dataDetail.original_title}
              </span>
            </h3>

            <p className={`text-[18px] ${dataDetail?.overview ? "mt-3" : ""}`}>
              {dataDetail?.overview && dataDetail.overview}
            </p>
            {/* genres */}

            {currenTab === "/" ? (
              <div className="text-[18px] flex items-center">
                <span className="mr-2 text-[24px]">{t("Genres")}:</span>
                {dataDetail?.genres?.map((genre, index) => {
                  const currentType =
                    sessionStorage.getItem("currentTab") === "/"
                      ? "movie"
                      : "tv";
                  return (
                    <div key={index} className="cursor-pointer">
                      <Link
                        to={`/genres/${genre.id}-${genre.name}/${currentType}`}
                      >
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
              <p className="my-4 underline">Trailer:</p>
              {isLoadingDetail ? (
                <Skeleton active paragraph={{ rows: 10 }} />
              ) : (
                <ReactPlayer
                  url={embedMovieTrailer(infoTrailerMovie?.key)}
                  style={{ margin: "0 auto" }}
                  width="80%"
                  height={500}
                  controls
                />
              )}
            </div>

            {/* rating */}
            <div className="flex items-center gap-4 mt-9">
              <p className="text-white text-[24px]">{t("Rating")}:</p>
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

            <h3 className="text-white text-[24px] mt-6">
              {t("Cast")}: &nbsp;
              {!listCastsMovie?.length && (
                <span className="text-[16px]">{t("Updating")}...</span>
              )}
            </h3>
            <div className="flex flex-wrap gap-x-4 gap-y-6 my-4 pl-4">
              {listCastsMovie?.map((cast, index) => {
                const currentType =
                  sessionStorage.getItem("currentTab") === "/" ? "movie" : "tv";
                return (
                  <Link key={index} to={`/cast/${cast.id}/${currentType}`}>
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
                          <p className="line-clamp-2">
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
              <p className="text-[24px]">{t("Keywords")}:</p>
              {listKeywordsMovie.map((keyword) => {
                const currentType =
                  sessionStorage.getItem("currentTab") === "/" ? "movie" : "tv";
                const nameKeyword = keyword.name;
                return (
                  <Tooltip key={keyword.id} title={keyword.name}>
                    <Link
                      to={{
                        pathname: `/keyword/${keyword.id}/${currentType}`,
                      }}
                      state={{ nameKeyword } ? nameKeyword : "sdasdsd"}
                    >
                      <p className="underline cursor-pointer">{keyword.name}</p>
                    </Link>
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
