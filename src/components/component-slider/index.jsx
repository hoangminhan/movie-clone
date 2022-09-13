import { faCaretRight, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge } from "antd";
import { ImageCustom } from "components";
import { useHomePage } from "hooks/use-homepage";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { formatNumber, getImage } from "utils";
import "./style.scss";

export const ComponentSlider = React.memo(
  ({ dataPopular, children, title }) => {
    return (
      <div className={`${title ? "mt-[64px]" : "mt-[128px]"}`}>
        <div>
          <p className="text-white uppercase font-[600] tracking-[2px] mb-4">
            {title}
          </p>
        </div>
        <Swiper
          slidesPerView={7}
          spaceBetween={30}
          slidesPerGroup={4}
          loop={true}
          loopFillGroupWithBlank={true}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="swiper-popular"
        >
          {dataPopular?.map((item, index) => {
            return (
              <SwiperSlide key={index} className="">
                <div className="group relative delay-150 hover:scale-110 duration-[250ms]">
                  <ImageCustom
                    data-aos="flip-up"
                    typeEffect="opacity"
                    alt="Poster"
                    src={getImage(item.poster_path, "w185")}
                    className="max-w-full w-full object-cover rounded-[6px]"
                  />
                  {/* btn play */}
                  <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 px-[12px] py-[2px] rounded-full bg-gradient-to-br from-primary to-[#f80223] hidden group-hover:block cursor-pointer delay-250 hover:scale-110 duration-300">
                    <FontAwesomeIcon
                      icon={faCaretRight}
                      className="text-white"
                    />
                  </div>
                  {/* rate */}
                  <div className="absolute top-[-8px] right-[0px] text-[13px]">
                    <Badge.Ribbon
                      color="#1890ff"
                      text={
                        <p className="rounded-[10px]  m-0 leading-6">
                          {formatNumber(item.vote_average, 10)}
                          <span className="inline-block ml-1">
                            <FontAwesomeIcon
                              icon={faStar}
                              className="text-white"
                            />
                          </span>
                        </p>
                      }
                    ></Badge.Ribbon>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    );
  }
);
