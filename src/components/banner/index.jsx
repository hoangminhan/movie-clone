import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

import "./style.scss";

import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { unwrapResult } from "@reduxjs/toolkit";
import { ButtomCustom, ButtonPlay } from "components";
import { useHomePage } from "hooks/use-homepage";
import { t } from "i18next";
import { ModalTrailer } from "modal/components";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Autoplay, Navigation, Pagination } from "swiper";
import { formatNumber, getImage, handleOpenNotification } from "utils";
import { useModal } from "hooks";

export const Banner = () => {
  const {
    listTrending,
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
    const currentLocale = sessionStorage.getItem("currentLocale") || "vi-VN";
    const { id: idMovie, media_type: type } = slider;
    handleGetListCasts(idMovie, {
      api_key: process.env.REACT_APP_API_KEY,
    });
    const resultAction = await handleGetTrailer(idMovie, type, {
      api_key: process.env.REACT_APP_API_KEY,
    });
    const newResult = unwrapResult(resultAction);
    const { results } = newResult;

    // get data detail movie to send modal
    const resultDetailMovie = await handleGetDetailMovie(idMovie, {
      api_key: process.env.REACT_APP_API_KEY,
      append_to_response: "videos",
      language: currentLocale,
    });
    const newResultDetailMovie = unwrapResult(resultDetailMovie);

    // get data Similar Movie
    const resultSimilarMovie = await handleGetSimilarMovie(idMovie, {
      api_key: process.env.REACT_APP_API_KEY,
      language: currentLocale,
    });
    const newResultSimilarMovie = unwrapResult(resultSimilarMovie);
    const { results: dataSimilar } = newResultSimilarMovie;

    if (results?.length) {
      setCurrentUrl(results[results.length - 1].key);
      setDataSimilar([...dataSimilar]);
      setDataDetail({ ...newResultDetailMovie });
      setVisibleModal(true);

      // handleToggleModal({
      //   visible: true,
      //   title: "Trailer movie",
      //   typeModal: TYPEMODAL.MODAL_TRAILER,
      //   propsModal: {
      //     idMovie: idMovie,
      //     currentUrl,
      //     dataDetail: newResultDetailMovie,
      //     dataSimilar,
      //   },

      //   attrModal: {
      //     maskClosable: false,
      //     width: 1000,
      //   },
      // });
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
        const result = await handleGetDetailMovie(idMovie, {
          api_key: process.env.REACT_APP_API_KEY,
          language: currentLocale,
        });
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
        onMouseEnter={() => swiperRef.current.swiper.autoplay.start()}
        className="max-h-[450px]"
      >
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
          // modules={[Pagination, Navigation]}
          onSlideChange={(event) => {
            setCurrentActiveIndex(event.activeIndex);
            setListType("");
          }}
        >
          {listTrending.map((slider, index) => {
            return (
              <SwiperSlide key={index}>
                <div className="group relative">
                  <img
                    src={getImage(slider.backdrop_path, "w1280")}
                    alt=""
                    className="max-h-[600px] object-cover w-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b0bd9] to-transparent "></div>
                  {/* vote_average */}
                  <div className="flex justify-center items-center rounded-2xl text-red absolute top-[4%] right-[2%] bg-primary py-[3px] px-3 text-[18px]">
                    <p className="text-white m-0 pr-1 text-[16px]">
                      {formatNumber(slider.vote_average, 10)}
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
                    {listType?.length ? (
                      <div className="mt-7 flex gap-3">
                        {listType?.map((item, index) => {
                          return (
                            <Link
                              to={`/genres/${item.id}-${item.name}/movie`}
                              key={index}
                            >
                              <p className="bg-zinc-900  px-2 border-[#ccc] backdrop-opacity-5 text-[18px] border-[1px] border-solid rounded-xl cursor-pointer">
                                <span className="text-[#dcd4d4]">
                                  {item.name}
                                </span>
                              </p>
                            </Link>
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
                      {/* play */}
                      {/* <div
                      className="ease-in-out delay-250 hover:scale-110 duration-300"
                      onClick={() => {
                        navigate(`movie/${slider.id}`);
                      }}
                    >
                      <ButtomCustom nameIcon="iconPlay" title="Play" />
                    </div> */}
                    </div>
                  </div>

                  {/* button play */}

                  <div
                    className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2
                  ease-in-out delay-250 hover:scale-110 duration-300 hidden  group-hover:block"
                    onClick={() => {
                      navigate(`movie/${slider.id}`);
                    }}
                  >
                    <ButtonPlay size="large" sizeImg="30px" />
                    {/* <FontAwesomeIcon
                    icon={faCaretRight}
                    className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2"
                  /> */}
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
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
