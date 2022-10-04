import {
  faStar,
  faThumbsDown,
  faThumbsUp,
  faThumbTack,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Col,
  Empty,
  message,
  Progress,
  Row,
  Skeleton,
  Spin,
  Tooltip,
} from "antd";
import ReactLoading from "react-loading";

import {
  ButtonAddList,
  ComponentSlider,
  ImageCustom,
  LoadingSuspense,
} from "components";
import { reducerClearSimilarMovie } from "features";
import { useHomePage } from "hooks/use-homepage";
import { useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Iframe from "react-iframe";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { embedMovie, embedTV, formatNumber, getImage } from "utils";
import { BodyWatch, EpisodeTv, Hero } from "./components";
import { useContext } from "react";
import { UserContext } from "contexts";
import { unwrapResult } from "@reduxjs/toolkit";

const WatchMovieTv = () => {
  let { idDetail } = useParams();
  const [t] = useTranslation();
  const {
    handleGetDetailMovie,
    dataDetail,
    handleGetSimilarMovie,
    listSimilarMovie,
    handleGetListCasts,
    handleGetListKeywords,
    handleGetRecommendationMovie,
    handleGetListReviews,
    handleGetTrailer,
    handleGetSeasonTv,
    handleGetEpisodeTv,
    listCastsMovie,
    listKeywordsMovie,
    listReviewsMovie,
    listRecommendationMovie,
    infoTrailerMovie,
    dataSeasonTv,
    isLoading,
    dataEposideTv,
  } = useHomePage();

  const [currentUrl, setCurrentUrl] = useState("");
  // const handleChangeUrl = (newUrl) => {
  //   setCurrentUrl(newUrl);
  // };
  const [isLoadingDetail, setIsLoadingDetail] = useState(true);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  const executeScroll = () => {
    const elementToScroll = document.getElementById("similar-movie");
    if (elementToScroll) {
      elementToScroll.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const [season, setSeason] = useState({
    numberSearson: 1,
    currentSeason: 1,
    currentEpisode: 1,
  });

  const stateContext = useContext(UserContext);
  const { currentTabGlobal } = stateContext;
  const [tabGlobal] = currentTabGlobal;
  console.log({ tabGlobal });

  const handleLoadMoreSimilar = async () => {
    setIsLoadMore(true);
    const locale = sessionStorage.getItem("currentLocale") || "vi-VN";
    // check tv or movie
    const type = sessionStorage.getItem("currentTab") || "/";
    const currentType = type === "/" ? "movie" : "pv";

    await handleGetSimilarMovie(
      idDetail,
      {
        api_key: process.env.REACT_APP_API_KEY,
        language: locale,
        page: currentPage + 1,
      },
      currentType
    );
    setCurrentPage((page) => page + 1);
    setIsLoadMore(false);
  };

  // change episode
  const handleChangeEpisode = (episode) => {
    console.log({ episode });
    if (+episode !== +season.currentEpisode) {
      setSeason({ ...season, currentEpisode: episode });
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      message.warning(`Bạn đang ở episode ${episode}`);
    }
  };

  //   get data detail movie
  useLayoutEffect(() => {
    const handleGetData = async () => {
      const locale = sessionStorage.getItem("currentLocale") || "vi-VN";
      setIsLoadingDetail(true);
      dispatch(reducerClearSimilarMovie());
      const type = sessionStorage.getItem("currentTab") || "/";
      const currentType = type === "/" ? "movie" : "tv";

      const result = await handleGetDetailMovie(
        idDetail,
        {
          api_key: process.env.REACT_APP_API_KEY,
          language: locale,
          append_to_response: "videos",
        },
        currentType
      );
      // to get season of tv
      const newResults = unwrapResult(result);
      const { number_of_seasons } = newResults;
      setSeason({ ...season, numberSearson: number_of_seasons });

      await handleGetTrailer(idDetail, currentType, {
        api_key: process.env.REACT_APP_API_KEY,
      });
      executeScroll();
      if (currentType === "movie") {
        await handleGetSimilarMovie(
          idDetail,
          {
            api_key: process.env.REACT_APP_API_KEY,
            language: locale,
            page: currentPage,
          },
          currentType
        );
      }

      // tv
      if (currentType === "tv") {
        // get season tv

        await handleGetSeasonTv(idDetail, season.currentSeason, {
          api_key: process.env.REACT_APP_API_KEY,
          language: locale,
          append_to_response: "videos",
        });
        await handleGetEpisodeTv(
          idDetail,
          season.currentSeason,
          season.currentEpisode,
          {
            api_key: process.env.REACT_APP_API_KEY,
            language: locale,
            append_to_response: "videos",
          }
        );
      }

      setIsLoadingDetail(false);
      handleGetRecommendationMovie(
        idDetail,
        {
          api_key: process.env.REACT_APP_API_KEY,
          language: locale,
        },
        currentType
      );
      handleGetListCasts(
        idDetail,
        {
          api_key: process.env.REACT_APP_API_KEY,
          language: locale,
        },
        currentType
      );
      handleGetListKeywords(
        idDetail,
        {
          api_key: process.env.REACT_APP_API_KEY,
        },
        currentType
      );
      handleGetListReviews(idDetail, {
        api_key: process.env.REACT_APP_API_KEY,
        // language: locale,
        page: 1,
      });
      setCurrentUrl(
        currentType === "movie"
          ? embedMovie(idDetail)
          : embedTV(idDetail, season.currentSeason, season.currentEpisode)
      );
    };
    handleGetData();
  }, [idDetail, season.currentEpisode]);
  return (
    <div>
      <Row className="mr-[350px] h-full">
        <Col span={24}>
          {/* hero */}
          <Hero
            dataDetail={dataDetail}
            // handleChangeUrl={handleChangeUrl}
            isLoadingDetail={isLoadingDetail}
          />

          <div className="w-full mt-10">
            <BodyWatch
              isLoadingDetail={isLoading}
              listCastsMovie={
                tabGlobal === "/"
                  ? listCastsMovie
                  : dataEposideTv?.guest_stars?.filter(
                      (item, index) => index < 8 && item
                    )
              }
              dataDetail={tabGlobal === "/" ? dataDetail : dataEposideTv}
              currenTab={tabGlobal}
              dataSeason={season}
              listKeywordsMovie={listKeywordsMovie}
              infoTrailerMovie={
                tabGlobal === "/"
                  ? infoTrailerMovie
                  : dataEposideTv?.videos?.results[0] || []
              }
            />

            {/* xem phim */}
            <div className="my-10 mx-4 overflow-hidden">
              {/* {currentUrl && (
                <Iframe
                  id="movie-id"
                  src={currentUrl}
                  height="600px"
                  width="100%"
                  allowFullScreen
                ></Iframe>
              )} */}
              <p>hello</p>
            </div>

            {/* eposide tv */}
            <div className="flex flex-col justify-end items-end">
              <p className="italic font-bold">
                Episode <span className="italic">{season.currentEpisode}</span>
              </p>
              <div className="flex">
                <p>
                  Season <span>{season.currentSeason}</span>
                </p>
                &nbsp; - Episode{" "}
                <span className="ml-1">{season.currentEpisode}</span>{" "}
              </div>
            </div>

            <div className="flex justify-start mr-6 mt-[24px]">
              <div className="ml-[50px] mr-[32px] group relative w-[50px] h-[50px] cursor-pointer duration-300">
                <div className="absolute z-[2]">
                  <Tooltip title={t("Like")}>
                    <p className="bg-[white] w-10 h-10 flex items-center justify-center rounded-full border-solid border-black border-[1px]">
                      <FontAwesomeIcon icon={faThumbsUp} color="black" />
                    </p>
                  </Tooltip>
                </div>
                <div className="absolute invisible group-hover:visible left-0 group-hover:left-[-50px] duration-300 z-[1]">
                  <Tooltip title={t("Dis Like")}>
                    <p className="bg-[white] w-10 h-10 flex items-center justify-center rounded-full border-solid border-black border-[1px]">
                      <FontAwesomeIcon icon={faThumbsDown} color="black" />
                    </p>
                  </Tooltip>
                </div>
                <div className="absolute invisible group-hover:visible right-[9px] group-hover:right-[-45px] duration-300 z-[1]">
                  <Tooltip title={t("Perfect")}>
                    <p className="bg-[white] w-10 h-10 flex items-center justify-center rounded-full border-solid border-black border-[1px]">
                      <FontAwesomeIcon icon={faThumbTack} color="black" />
                    </p>
                  </Tooltip>
                </div>
              </div>
            </div>

            {/* recommendation */}
            <div className="px-4">
              <ComponentSlider
                dataPopular={listRecommendationMovie}
                title="Recommendations"
              />
            </div>
          </div>
        </Col>
      </Row>
      <div className="bg-black p-4 border-l-[#ccc] border-l-[1px] border-l-solid fixed z-[2] h-full overflow-y-auto top-0 right-0 w-[350px] scroll-smooth no-scrollbar">
        {tabGlobal === "/" ? (
          <div className="h-[100%]">
            <p id="similar-movie" className="text-white mt-6 mb-8 uppercase">
              {t("Similar")}
            </p>
            {listSimilarMovie?.length ? (
              <Skeleton
                active
                loading={isLoadingDetail}
                paragraph={{ rows: 30 }}
              >
                <div className="flex flex-col gap-5">
                  {listSimilarMovie?.map((similarContent, index) => {
                    return (
                      <Link key={index} to={`/movie/${similarContent.id}`}>
                        <div
                          className="group flex gap-4 text-[#fff] cursor-pointer hover:brightness-125
                
                "
                          onClick={() => {
                            // navigate(`movie/${similarContent.id}`);
                          }}
                        >
                          <div className="max-w-[100px] w-full group-hover:scale-110 duration-200 delay-150">
                            <ImageCustom
                              src={getImage(similarContent.poster_path, "w154")}
                              className="w-[154px] object-contain rounded-lg rounded-global"
                            />
                          </div>
                          <div className="grow">
                            <p className="text-[18px] line-clamp-2">
                              {similarContent.title
                                ? similarContent.title
                                : similarContent.name}
                            </p>
                            <p className="text-[15px] text-[#ccc]">
                              {similarContent.release_date
                                ? similarContent.release_date
                                : similarContent.first_air_date}
                            </p>
                            <p className="text-[16px] text-yellow-400">
                              {formatNumber(similarContent.vote_average, 10)}{" "}
                              &nbsp;
                              <FontAwesomeIcon icon={faStar} color="yellow" />
                            </p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </Skeleton>
            ) : (
              <div className="h-[100%] flex items-center justify-center">
                <Empty />
              </div>
            )}

            {listSimilarMovie?.length ? (
              <div className="my-8 text-center">
                {isLoadMore ? (
                  <div className="flex justify-center">
                    <ReactLoading type="bubbles" color="white" height={40} />
                  </div>
                ) : (
                  <button
                    className={`bg-primary min-w-[150px] px-2 py-2 rounded-lg cursor-pointer text-white text-[18px] ${
                      isLoadMore && "cursor-not-allowed pointer-events-none	"
                    } ${!isLoadMore ? "hover:scale-110 duration-150" : ""}`}
                    onClick={() => {
                      handleLoadMoreSimilar();
                    }}
                  >
                    {t("Load more")}
                  </button>
                )}
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          <div className="h-[100%]">
            {isLoading ? (
              <Skeleton active paragraph={{ rows: 20 }} />
            ) : (
              <EpisodeTv
                handleChangeEpisode={handleChangeEpisode}
                dataEpisode={dataSeasonTv}
                currentSeason={season.currentSeason}
                currentEpisode={season.currentEpisode}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchMovieTv;
