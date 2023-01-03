import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

import "./style.scss";

import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { unwrapResult } from "@reduxjs/toolkit";
import iconImg from "assets";
import { ButtomCustom, ButtonPlay, SkeletonCustom } from "components";
import { useModal } from "hooks";
import { useHomePage } from "hooks/use-homepage";
import { t } from "i18next";
import { ModalTrailer } from "modal/components";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Autoplay, Navigation, Pagination } from "swiper";
import { formatNumber, getImage, handleOpenNotification } from "utils";
import { Skeleton } from "antd";
import styled from "styled-components";
const StyledSkeleton = styled(Skeleton)`
  .ant-skeleton-title {
    width: 100% !important;
  }
  .ant-skeleton-paragraph li {
    width: 100% !important;
  }
`;

export const Banner = ({ listTrending, isLoading }) => {
  const {
    handleGetTrailer,
    handleGetDetailMovie,
    handleGetListCasts,
    handleGetSimilarMovie,
  } = useHomePage();

  const [visibleModal, setVisibleModal] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [dataDetail, setDataDetail] = useState({});
  const [dataSimilar, setDataSimilar] = useState([]);

  const swiperRef = useRef(null);
  const [listType, setListType] = useState();
  const [currentActiveIndex, setCurrentActiveIndex] = useState(0);
  const navigate = useNavigate();
  const { resultModal, handleToggleAutoBanner } = useModal();
  const { stopSlider } = resultModal;
  const currentType =
    sessionStorage.getItem("currentTab") === "/tv-show" ? "tv" : "movie";

  // get type movie
  const handleGetTypeMovie = (listId, listType) => {
    let newList = [];
    listType.forEach((type, index) => {
      listId.forEach((item) => {
        if (type.id === item) {
          newList.push({ name: type.name, id: type.id });
        }
      });
    });
    return newList;
  };
  const handleCloseModal = (data) => {
    setVisibleModal(data);
  };

  // handle click trailer
  const handleClickTrailer = async (slider) => {
    const currentType =
      sessionStorage.getItem("currentTab") === "/tv-show" ? "tv" : "movie";
    const currentLocale = sessionStorage.getItem("currentLocale") || "vi-VN";
    const { id: idMovie, media_type: type } = slider;

    handleGetListCasts(
      idMovie,
      {
        api_key: process.env.REACT_APP_API_KEY,
      },
      currentType
    );
    const resultAction = await handleGetTrailer(idMovie, type, {
      api_key: process.env.REACT_APP_API_KEY,
    });
    const newResult = unwrapResult(resultAction);
    const { results } = newResult;

    // get data detail movie to send modal

    const resultDetailMovie = await handleGetDetailMovie(
      idMovie,
      {
        api_key: process.env.REACT_APP_API_KEY,
        append_to_response: "videos",
        language: currentLocale,
      },
      currentType
    );

    const newResultDetailMovie = unwrapResult(resultDetailMovie);

    // get data Similar Movie
    const resultSimilarMovie = await handleGetSimilarMovie(
      idMovie,
      {
        api_key: process.env.REACT_APP_API_KEY,
        language: currentLocale,
      },
      currentType
    );
    const newResultSimilarMovie = unwrapResult(resultSimilarMovie);
    const { results: dataSimilar } = newResultSimilarMovie;

    if (results?.length) {
      setCurrentUrl(results[results.length - 1].key);
      setDataSimilar([...dataSimilar]);
      setDataDetail({ ...newResultDetailMovie });
      setVisibleModal(true);

      handleToggleAutoBanner(true);
    } else {
      handleOpenNotification("error", "", "Trailer is unavailable");
    }
  };

  useEffect(() => {
    if (stopSlider) {
      swiperRef.current.swiper.autoplay.stop();
    } else {
      swiperRef.current.swiper.autoplay.start();
    }
  }, [stopSlider]);

  useEffect(() => {
    if (listTrending?.length) {
      const currentLocale = sessionStorage.getItem("currentLocale");

      const genresId = listTrending[currentActiveIndex]?.genre_ids;
      const idMovie = listTrending[currentActiveIndex]?.id;
      const getDataDetail = async () => {
        const type = sessionStorage.getItem("currentTab") || "/";
        const currentType = type === "/tv-show" ? "tv" : "movie";
        const result = await handleGetDetailMovie(
          idMovie,
          {
            api_key: process.env.REACT_APP_API_KEY,
            language: currentLocale,
          },
          currentType
        );
        const resultUnwrap = unwrapResult(result);
        const { genres } = resultUnwrap;
        setListType(handleGetTypeMovie(genresId, genres));
      };

      getDataDetail();
    }
  }, [listTrending, setListType, currentActiveIndex]);

  return (
    <>
      <div
        onMouseEnter={() => swiperRef?.current?.swiper?.autoplay?.start()}
        className="max-h-[400px] xl:max-h-[500px]"
      >
        {isLoading ? (
          <div className="">
            <StyledSkeleton
              paragraph={{
                rows: 10,
              }}
            />
          </div>
        ) : (
          <Swiper
            ref={swiperRef}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            className="banner-wrapper"
            pagination={false}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            // modules={[Autoplay, Pagination, Navigation]}
            // modules={[Pagination, Navigation]}
            onSlideChange={(event) => {
              setCurrentActiveIndex(event.activeIndex);
              setListType("");
            }}
          >
            {listTrending?.map((slider, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className="group relative rounded-t-lg overflow-hidden">
                    <img
                      src={
                        getImage(slider.backdrop_path, "w1280").includes("null")
                          ? iconImg.Img404Backdrop
                          : getImage(slider.backdrop_path, "w1280")
                      }
                      alt=""
                      className="min-h-[400px] max-h-[400px] xl:max-h-[500px] object-fill w-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#000000] to-transparent "></div>
                    {/* vote_average */}
                    <div className="flex justify-center items-center rounded-[8px] text-red absolute top-[4%] right-[2%] bg-primarybg px-3 text-[18px]">
                      <p className="text-white m-0 pr-1 text-[16px]">
                        {formatNumber(slider.vote_average, 10)}
                      </p>
                      <FontAwesomeIcon icon={faStar} className="text-white" />
                    </div>

                    <div className="absolute top-[-8px] right-[0px] text-[13px]"></div>
                    {/* title */}
                    <div className="absolute top-[40%] left-[5%] -translate-y-1/2">
                      <h2 className="flex text-[25px] sm:text-[32px] text-primarybg max-w-[500px]">
                        {slider.title ? slider.title : slider.original_name}
                      </h2>

                      <div>
                        <p className="flex mt-[4px] sm:mt-[32px] text-[18px] sm:text-[24px]">
                          {t("First air day")}:{" "}
                          <span className="pl-[12px]">
                            {slider.release_date
                              ? slider.release_date
                              : slider.first_air_date}
                          </span>
                        </p>
                        <div className="text-left max-w-[500px] flex text-base line-clamp-2 sm:line-clamp-3">
                          <p className="stroke-[red] text-[13px] sm:text-[15px] tablet:text-[16px]">
                            {slider.overview}
                          </p>
                        </div>
                      </div>
                      {/* genres */}
                      {listType?.length ? (
                        <div className="mt-3 sm:mt-7 flex gap-3">
                          {listType?.map((item, index) => {
                            return (
                              <div
                                key={index}
                                onClick={() => {
                                  const currentType =
                                    sessionStorage.getItem("currentTab") ===
                                    "/tv-show"
                                      ? "tv"
                                      : "movie";
                                  if (currentType === "tv") {
                                    return;
                                  } else {
                                    navigate(`/genres/${item.id}-${item.name}`);
                                  }
                                }}
                              >
                                <p
                                  className={`max-w-[150px] line-clamp-1 bg-zinc-900 px-2 border-[#ccc] backdrop-opacity-5 text-[18px] border-[1px] border-solid rounded-xl ${
                                    currentType === "movie"
                                      ? "cursor-pointer"
                                      : ""
                                  }`}
                                >
                                  <span className="text-[#dcd4d4] text-[13px] sm:text-[15px] tablet:text-[16px]">
                                    {item.name}
                                  </span>
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        ""
                      )}

                      {/* trailer */}
                      <div className="absolute bottom-[-72px] mt-[32px] flex gap-4">
                        <div
                          className=" ease-in-out delay-250 hover:scale-110 duration-300"
                          onClick={() => {
                            handleClickTrailer(slider);
                          }}
                        >
                          <ButtomCustom nameIcon="iconPlay" />
                        </div>
                      </div>
                    </div>

                    {/* button play */}

                    <div
                      className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2
                  ease-in-out delay-250 hover:scale-110 duration-300 hidden  group-hover:block"
                      onClick={() => {
                        const currentType =
                          sessionStorage.getItem("currentTab") === "/tv-show"
                            ? "tv"
                            : "movie";
                        navigate(`/${currentType}/${slider.id}`);
                      }}
                    >
                      <ButtonPlay size="large" sizeImg="30px" />
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>

      <ModalTrailer
        visibleModal={visibleModal}
        currentUrl={currentUrl}
        dataDetail={dataDetail}
        dataSimilar={dataSimilar}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
};
