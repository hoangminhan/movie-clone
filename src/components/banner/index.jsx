import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

import "./style.scss";

import {
  faAngleRight,
  faCaretRight,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHomePage } from "hooks/use-homepage";
import { t } from "i18next";
import { Autoplay, Navigation, Pagination } from "swiper";
import { getImage, handleOpenNotification } from "utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { useModal } from "hooks";
import { TYPEMODAL } from "constant";
import { unwrapResult } from "@reduxjs/toolkit";

export const Banner = () => {
  const sliderRef = useRef(null);

  // const handlePrev = useCallback(() => {
  //   if (!sliderRef.current) return;
  //   sliderRef.current.swiper.slidePrev();
  // }, []);

  // const handleNext = useCallback(() => {
  //   if (!sliderRef.current) return;
  //   sliderRef.current.swiper.slideNext();
  // }, []);

  const {
    listTrending,
    handleGetTrailer,
    handleGetDetailMovie,
  } = useHomePage();
  const { resultModal, handleToggleModal, handleToggleAutoBanner } = useModal();
  const { stopSlider } = resultModal;
  // console.log({ resultModal });
  const swiperRef = useRef(null);

  useEffect(() => {
    console.log({ stopSlider });
    if (stopSlider) {
      console.log(swiperRef.current.swiper);
      swiperRef.current.swiper.autoplay.stop();
    } else {
      swiperRef.current.swiper.autoplay.start();
    }
  }, [stopSlider]);
  const handleGetTypeMovie = (listId, listType) => {
    let newList = [];
    listType.forEach((type, index) => {
      listId.forEach((item) => {
        if (type.id === item) {
          newList.push(type.name);
        }
      });
    });
    console.log(newList);
    return newList;
  };
  const [listType, setListType] = useState();
  const [currentActiveIndex, setCurrentActiveIndex] = useState(0);
  useEffect(() => {
    if (listTrending?.length) {
      const genresId = listTrending[currentActiveIndex]?.genre_ids;
      console.log("gen", genresId);
      const idMovie = listTrending[currentActiveIndex]?.id;
      const getDataDetail = async () => {
        const result = await handleGetDetailMovie(idMovie, {
          api_key: process.env.REACT_APP_API_KEY,
        });
        const resultUnwrap = unwrapResult(result);
        const { genres } = resultUnwrap;
        console.log(resultUnwrap);
        setListType(handleGetTypeMovie(genresId, genres));
      };

      getDataDetail();
    }
  }, [listTrending, setListType, currentActiveIndex]);
  const handleClickTrailer = async (slider) => {
    let currentUrl;
    console.log({ slider });
    const { id: idMovie, media_type: type } = slider;
    const resultAction = await handleGetTrailer(idMovie, type, {
      api_key: process.env.REACT_APP_API_KEY,
    });
    const newResult = unwrapResult(resultAction);
    const { results } = newResult;
    if (results?.length) {
      currentUrl = results[results.length - 1].key;
      handleToggleModal({
        visible: true,
        title: "Trailer movie",
        typeModal: TYPEMODAL.MODAL_TRAILER,
        propsModal: {
          idMovie: idMovie,
          currentUrl,
        },

        attrModal: {
          maskClosable: false,
          width: 1000,
        },
      });
      handleToggleAutoBanner(true);
    } else {
      handleOpenNotification("error", "", "Trailer is unavailable");
    }
  };

  return (
    <div onMouseEnter={() => swiperRef.current.swiper.autoplay.start()}>
      <Swiper
        ref={swiperRef}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="banner-wrapper"
        pagination={false}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onSlideChange={(event) => {
          console.log(event.activeIndex);
          setCurrentActiveIndex(event.activeIndex);
          setListType("");
        }}
      >
        {listTrending.map((slider, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="group relative ">
                <img src={getImage(slider.backdrop_path)} alt="" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b0bd9] to-transparent "></div>
                {/* vote_average */}
                <div className="flex justify-center items-center rounded-2xl text-red absolute top-[4%] right-[2%] bg-primary py-[6px] px-3 text-[18px]">
                  <p className="text-white m-0 pr-1 text-[16px]">
                    {slider.vote_average}
                  </p>
                  <FontAwesomeIcon icon={faStar} className="text-white" />
                </div>
                {/* title */}
                <div className="absolute top-[40%] left-[5%] -translate-y-1/2">
                  <h2 className="flex text-[32px] text-primary max-w-[500px]">
                    {slider.title ? slider.title : slider.original_name}
                  </h2>

                  <div>
                    <p className="flex mt-[32px] ">
                      {t("First air day")}:{" "}
                      <span className="pl-[12px]">
                        {slider.release_date
                          ? slider.release_date
                          : slider.first_air_date}
                      </span>
                    </p>
                    <div className="text-left max-w-[500px] flex text-base line-clamp-3">
                      <p className="stroke-[red]">{slider.overview}</p>
                    </div>
                  </div>
                  {/* genres */}
                  <div>
                    <p>{listType}</p>
                  </div>

                  {/* trailer */}
                  <div
                    className="absolute bottom-[-72px] mt-[32px]  px-[32px] py-[10px] rounded-md bg-[#fff] hover:bg-[#ffffffbf] flex items-center gap-2 text-black cursor-pointer"
                    onClick={() => {
                      handleClickTrailer(slider);
                    }}
                  >
                    <FontAwesomeIcon icon={faCaretRight} className="text-2xl" />
                    <button className="font-medium">Trailer</button>
                  </div>
                </div>
                {/* button change banner */}
                {/* <div className="absolute  right-[1%] bottom-[3%] flex gap-3">
                <div
                  className="px-6 py-3
                  rounded-[999px] cursor-pointer bg-[#ccc]   ease-in-out delay-250 hover:scale-110 duration-300"
                  onClick={handlePrev}
                >
                  <FontAwesomeIcon icon={faAngleLeft} />
                </div>
                <div
                  className=" px-6 py-3
                  rounded-[999px] cursor-pointer bg-[#ccc]   ease-in-out delay-250 hover:scale-110 duration-300"
                  onClick={handleNext}
                >
                  <FontAwesomeIcon icon={faAngleRight} />
                </div>
              </div> */}

                {/* button play */}

                <div
                  className=" w-5 h-5 px-7 py-7 absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2
                  rounded-[999px] cursor-pointer bg-gradient-to-br from-primary to-[#f80223]    ease-in-out delay-250 hover:scale-110 duration-300 hidden group-hover:block"
                >
                  <FontAwesomeIcon
                    icon={faCaretRight}
                    className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2"
                  />
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
