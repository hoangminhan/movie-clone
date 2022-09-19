import {
  faThumbsDown,
  faThumbsUp,
  faThumbTack,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Progress, Skeleton, Tooltip } from "antd";
import { ButtonAddList } from "components";
import { t } from "i18next";
import React from "react";
import Iframe from "react-iframe";
import ReactPlayer from "react-player";
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
}) => {
  return (
    <>
      <div className="mt-[128px] px-4 text-[#fff]">
        <p className="uppercase underline font-medium text-primary">
          {t("Information")}
        </p>

        {dataDetail ? (
          <div className="px-4 mt-6">
            <h3 className="text-[#fff]">
              Tóm tắt:{" "}
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
            <p className="text-[18px]">
              <span className="mr-2">{t("Genres")}:</span>
              {dataDetail?.genres?.map((genre, index) => {
                return index < dataDetail.genres.length - 1
                  ? `${genre.name},  `
                  : genre.name;
              })}
            </p>

            {/* trailer */}

            <div className="mt-4 animate-pulse">
              <p className="my-4 underline">Trailer:</p>
              <ReactPlayer
                url={embedMovieTrailer(infoTrailerMovie?.key)}
                width="100%"
                height={500}
                controls
              />
            </div>

            {/* rating */}
            <div className="flex items-center gap-4 mt-9">
              <p className="text-white text-[18px]">{t("Rating")}:</p>
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
            </div>
            {/* casts */}

            <h3 className="text-white text-[18px] mt-6">{t("Cast")}:</h3>
            <div className="flex flex-wrap gap-x-4 gap-y-6 my-4 pl-4">
              {listCastsMovie.map((cast, index) => {
                return (
                  <div className="flex w-[250px] gap-2">
                    <Skeleton loading={isLoadingDetail} active avatar>
                      <div className="max-w-[65px] w-full h-[65px]">
                        <img
                          className="object-cover rounded-[50%] h-[65px] w-[65px]"
                          src={getImage(cast.profile_path, "w185")}
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
                );
              })}
            </div>

            {/* key words */}
            <div className="flex flex-wrap gap-2 text-[14px] text-yellow-200 mt-8">
              <p className="text-[18px]">{t("Keywords")}:</p>
              {listKeywordsMovie.map((keyword) => (
                <Tooltip key={keyword.id} title={keyword.name}>
                  <p className="underline cursor-pointer">{keyword.name}</p>
                </Tooltip>
              ))}
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
