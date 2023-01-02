import { Skeleton } from "antd";
import { ComponentSlider } from "components";
import { UsePeople, useTitle } from "hooks";
import { t } from "i18next";
import moment from "moment";
import { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShowMoreText from "react-show-more-text";
import { formatNumber, getImage } from "utils";

import iconImg from "assets";
import styled from "styled-components";
const StyleSkeleton = styled(Skeleton)`
  .ant-skeleton-title {
    width: 100% !important;
  }
`;
const CastPage = () => {
  const params = useParams();
  const { idCast } = params;
  const {
    dataDetailCast,
    dataSocialNetwork,
    listMovieOfCast,
    listTvShowOfCast,
    handleGetDetailCasts,
    handleGetSocialNetwork,
    handleGetMovieOfCast,
    handleGetTvOfCast,
  } = UsePeople();
  const [isExpand, setIsExpand] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { handleChangeTitle } = useTitle();

  // to expand text (show more , show less)
  const executeOnClick = (isExpandedCurrent) => {
    setIsExpand(isExpandedCurrent);
  };

  useLayoutEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const locale = sessionStorage.getItem("currentLocale") || "vi-VN";

      await handleGetDetailCasts(idCast, {
        api_key: process.env.REACT_APP_API_KEY,
      });

      await handleGetSocialNetwork(idCast, {
        api_key: process.env.REACT_APP_API_KEY,
        language: locale,
      });
      await handleGetMovieOfCast(idCast, {
        api_key: process.env.REACT_APP_API_KEY,
        language: locale,
      });
      await handleGetTvOfCast(idCast, {
        api_key: process.env.REACT_APP_API_KEY,
        language: locale,
      });

      setIsLoading(false);
    };
    getData();
  }, []);
  useEffect(() => {
    handleChangeTitle(dataDetailCast.name ? dataDetailCast.name : "Actor Page");
  }, [dataDetailCast]);
  return (
    <div className="min-h-[100vh]">
      <div className="py-10 flex justify-center text-[20px]">
        <div className="w-[1000px]">
          <h3 className="text-center uppercase text-primarybg text-[35px] mb-8">
            {dataDetailCast.name}
          </h3>
          <StyleSkeleton avatar active loading={isLoading}>
            <div className="flex justify-start gap-4 sm:gap-10">
              <div>
                <img
                  src={getImage(dataDetailCast.profile_path)}
                  width="185px"
                  className="rounded-lg"
                  alt="img_profile"
                />
              </div>
              <div className="grow-[1]">
                <h3 className="text-white text-[18px]">
                  {t("Personal info")}:{" "}
                </h3>
                <p>
                  <span className="mr-1 text-[16px]">{t("Homepage")}:</span>
                  {dataDetailCast.homepage ? (
                    <a
                      href={dataDetailCast.homepage}
                      target="_blank"
                      rel="noreferrer"
                      className="font-[200] hover:underline"
                    >
                      {dataDetailCast.homepage
                        .replace("http://", "")
                        .replace("https://", "")
                        .replace("/", "")}
                    </a>
                  ) : (
                    <span className="font-[200] text-[16px]">
                      {t("Updating")}...
                    </span>
                  )}
                </p>
                <p>
                  <span className="text-[16px]">{t("Birthday")}:</span>
                  <span className="ml-1 text-[16px] font-[200]">
                    {dataDetailCast.birthday
                      ? moment(dataDetailCast.birthday).format("DD-MM-YYYY")
                      : t("Updating")}
                  </span>
                </p>
                <p>
                  <span className="text-[16px]">{t("Place of birthday")}:</span>
                  <span className="ml-1 font-[200] text-[16px]">
                    {dataDetailCast.place_of_birth
                      ? dataDetailCast.place_of_birth
                      : t("Updating")}
                  </span>
                </p>

                <p>
                  <span className="text-[16px]">{t("Gender")}:</span>
                  <span className="ml-1  font-[200] text-[16px]">
                    {dataDetailCast.gender === 2 ? t("Male") : "Female"}
                  </span>
                </p>
                <p>
                  <span className="text-[16px]">{t("Popularity")}:</span>
                  <span className="ml-1 font-[200] text-[16px]">
                    {formatNumber(dataDetailCast.popularity, 100)}
                  </span>
                </p>
                <p>
                  <span className="text-[16px]">{t("Known For")}:</span>
                  <span className="ml-1 font-[200] text-[16px]">
                    {dataDetailCast.known_for_department}
                  </span>
                </p>
                {/* social netword */}
                <div className="flex gap-5 mt-4">
                  {/* instagram */}
                  <div>
                    <a
                      href={`https://www.instagram.com/${dataSocialNetwork.instagram_id}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src={iconImg.instagramImg} alt="" />
                    </a>
                  </div>
                  {/* facebook */}
                  <div>
                    <a
                      href={`https://www.facebook.com/${dataSocialNetwork.facebook_id}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src={iconImg.facebookContact} alt="" />
                    </a>
                  </div>
                  {/* twitter */}
                  <div>
                    <a
                      href={`https://twitter.com//${dataSocialNetwork.twitter_id}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src={iconImg.twitterkImg} alt="" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </StyleSkeleton>
        </div>
      </div>

      <div className="pb-8 flex justify-center text-[16px]">
        <div className="w-[1000px]">
          <StyleSkeleton
            active
            loading={isLoading}
            paragraph={{ width: "100%" }}
          >
            <h3 className="text-white ">
              {t("Biography")} {t("Of")} {dataDetailCast.name}:
            </h3>
            {dataDetailCast.biography ? (
              <ShowMoreText
                /* Default options */
                lines={5}
                more={
                  <span className="text-[#45b1df] font-bold">
                    {t("Read more")}
                  </span>
                }
                less={
                  <span className="text-[#45b1df] font-bold">
                    {t("Read less")}
                  </span>
                }
                expanded={isExpand}
                truncatedEndingComponent={"...    "}
                onClick={executeOnClick}
              >
                <p className="text-white">{dataDetailCast.biography}</p>
              </ShowMoreText>
            ) : (
              <span>{t("Updating")}...</span>
            )}
          </StyleSkeleton>
        </div>
      </div>
      <StyleSkeleton active loading={isLoading}>
        <div className="px-5 mb-10">
          <ComponentSlider
            type="movie"
            dataPopular={listMovieOfCast}
            title={`${t("Movies of")} ${dataDetailCast.name}`}
            slidesPerGroup={4}
          />
        </div>
      </StyleSkeleton>
      <StyleSkeleton active loading={isLoading}>
        <div className="px-5 mb-10">
          <ComponentSlider
            type="tv"
            dataPopular={listTvShowOfCast}
            title={`${t("Tv show of")} ${dataDetailCast.name}`}
            slidesPerGroup={4}
          />
        </div>
      </StyleSkeleton>
    </div>
  );
};

export default CastPage;
