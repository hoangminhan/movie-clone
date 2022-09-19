import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Progress, Row } from "antd";
import { ComponentSlider, ImageCustom } from "components";
import { useHomePage } from "hooks/use-homepage";
import { useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Iframe from "react-iframe";
import { useParams } from "react-router-dom";
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
  } = useHomePage();

  const [currentUrl, setCurrentUrl] = useState("");
  const handleChangeUrl = (newUrl) => {
    setCurrentUrl(newUrl);
  };

  //   get data detail movie
  useLayoutEffect(() => {
    const locale = sessionStorage.getItem("currentLocale") || "vi-VN";
    console.log(locale);
    handleGetDetailMovie(idDetail, {
      api_key: process.env.REACT_APP_API_KEY,
      language: locale,
      append_to_response: "videos",
    });
    handleGetTrailer(idDetail, "movie", {
      api_key: process.env.REACT_APP_API_KEY,
      language: locale,
    });

    handleGetSimilarMovie(idDetail, {
      api_key: process.env.REACT_APP_API_KEY,
      language: locale,
    });
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
  }, [idDetail]);
  console.log({ listRecommendationMovie });

  console.log({ listReviewsMovie });
  return (
    <div>
      <Row className="mr-[350px] h-full">
        <Col span={24}>
          {/* hero */}
          <Hero dataDetail={dataDetail} handleChangeUrl={handleChangeUrl} />

          <div className="w-full mt-10">
            <BodyWatch
              listCastsMovie={listCastsMovie}
              dataDetail={dataDetail}
              listKeywordsMovie={listKeywordsMovie}
            />

            {/* xem phim */}
            {/* <div className="my-10 mx-4 overflow-hidden">
              {currentUrl && (
                <Iframe
                  id="movie-id"
                  src={currentUrl}
                  height="600px"
                  width="100%"
                  allowFullScreen
                ></Iframe>
              )}
            </div> */}

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
          <div className="flex flex-col gap-5">
            {listSimilarMovie.map((similarContent, index) => {
              return (
                <div
                  key={index}
                  className="group flex gap-4 text-[#fff] cursor-pointer hover:brightness-125"
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
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchMovieTv;
