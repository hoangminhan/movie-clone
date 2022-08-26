import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

import "./style.scss";

import {
  faAngleLeft,
  faAngleRight,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHomePage } from "hooks/use-homepage";
import { t } from "i18next";
import { Autoplay, Navigation, Pagination } from "swiper";
import { getImage } from "utils";
import { useCallback, useRef } from "react";

export const Banner = () => {
  const sliderRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  const { listTrending } = useHomePage();
  console.log(listTrending);
  return (
    <Swiper
      ref={sliderRef}
      // autoplay={{
      //   delay: 5000,
      //   disableOnInteraction: false,
      // }}
      pagination={false}
      navigation={false}
      modules={[Autoplay, Pagination, Navigation]}
    >
      {listTrending.map((slider, index) => {
        return (
          <SwiperSlide>
            <div className="relative ">
              <img src={getImage(slider.backdrop_path)} />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b0bd9] to-transparent "></div>
              {/* vote_average */}
              <div className="flex justify-center items-center rounded-2xl text-red absolute top-[4%] right-[2%] bg-primary py-[6px] px-3">
                <p className="text-white m-0 pr-1">{slider.vote_average}</p>
                <FontAwesomeIcon icon={faStar} />
              </div>
              {/* title */}
              <div className="absolute top-[50%] left-[5%] -translate-y-1/2">
                <h2 className="flex text-[32px] text-primary max-w-[500px]">
                  {slider.title ? slider.title : slider.original_name}
                </h2>

                <div className="text-[#ccc]">
                  <p className="flex mt-[32px] text-[#ccc]">
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
              </div>
              <div className="absolute  right-[1%] bottom-[3%] flex gap-3">
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
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
