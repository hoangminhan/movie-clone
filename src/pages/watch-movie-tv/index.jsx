import {
  faStar,
  faThumbsDown,
  faThumbsUp,
  faThumbTack,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Progress, Row, Skeleton, Tooltip } from "antd";
import { ButtonAddList, ComponentSlider, ImageCustom } from "components";
import { useHomePage } from "hooks/use-homepage";
import { useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Iframe from "react-iframe";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { embedMovie, formatNumber, getImage } from "utils";
import { BodyWatch, Hero } from "./components";

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
    listCastsMovie,
    listKeywordsMovie,
    listReviewsMovie,
    listRecommendationMovie,
    infoTrailerMovie,
  } = useHomePage();

  const [currentUrl, setCurrentUrl] = useState("");
  const handleChangeUrl = (newUrl) => {
    setCurrentUrl(newUrl);
  };
  const [isLoadingDetail, setIsLoadingDetail] = useState(true);

  //   get data detail movie
  useLayoutEffect(() => {
    const handleGetData = async () => {
      const locale = sessionStorage.getItem("currentLocale") || "vi-VN";
      setIsLoadingDetail(true);
      await handleGetDetailMovie(idDetail, {
        api_key: process.env.REACT_APP_API_KEY,
        language: locale,
        append_to_response: "videos",
      });
      await handleGetTrailer(idDetail, "movie", {
        api_key: process.env.REACT_APP_API_KEY,
      });

      await handleGetSimilarMovie(idDetail, {
        api_key: process.env.REACT_APP_API_KEY,
        language: locale,
      });
      setIsLoadingDetail(false);
      handleGetRecommendationMovie(idDetail, {
        api_key: process.env.REACT_APP_API_KEY,
        language: locale,
      });
      handleGetListCasts(idDetail, {
        api_key: process.env.REACT_APP_API_KEY,
        language: locale,
      });
      handleGetListKeywords(idDetail, {
        api_key: process.env.REACT_APP_API_KEY,
      });
      handleGetListReviews(idDetail, {
        api_key: process.env.REACT_APP_API_KEY,
        language: locale,
        page: 1,
      });
      setCurrentUrl(embedMovie(idDetail));
    };
    handleGetData();
  }, [idDetail]);
  return (
    <div>
      <Row className="mr-[350px] h-full">
        <Col span={24}>
          {/* hero */}
          <Hero
            dataDetail={dataDetail}
            handleChangeUrl={handleChangeUrl}
            isLoadingDetail={isLoadingDetail}
          />

          <div className="w-full mt-10">
            <BodyWatch
              isLoadingDetail={isLoadingDetail}
              listCastsMovie={listCastsMovie}
              dataDetail={dataDetail}
              listKeywordsMovie={listKeywordsMovie}
              infoTrailerMovie={infoTrailerMovie}
            />

            {/* xem phim */}
            <div className="my-10 mx-4 overflow-hidden">
              {currentUrl && (
                <Iframe
                  id="movie-id"
                  src={currentUrl}
                  height="600px"
                  width="100%"
                  allowFullScreen
                ></Iframe>
              )}
            </div>

            <div className="flex justify-start mr-6">
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

            {/* review movie */}
            {/* {listReviewsMovie.map((review,index)=>{
  return (
    <div key={index}>

    </div>
  )
})} */}
          </div>
        </Col>
      </Row>
      <div className="bg-black p-4 border-l-[#ccc] border-l-[1px] border-l-solid fixed z-[2] h-full overflow-y-auto top-0 right-0 w-[350px] scroll-smooth no-scrollbar">
        <div className="">
          <p className="text-white mb-8 uppercase">{t("Similar")}</p>
          <Skeleton active loading={isLoadingDetail} paragraph={{ rows: 30 }}>
            <div className="flex flex-col gap-5">
              {listSimilarMovie?.map((similarContent, index) => {
                console.log(similarContent.id);
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
                            : similarContent.original_title}
                        </p>
                        <p className="text-[15px] text-[#ccc]">
                          {similarContent.release_date}
                        </p>
                        <p className="text-[16px] text-yellow-400">
                          {formatNumber(similarContent.vote_average, 10)} &nbsp;
                          <FontAwesomeIcon icon={faStar} color="yellow" />
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Skeleton>
        </div>
      </div>
    </div>
  );
};

export default WatchMovieTv;
