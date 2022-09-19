import { faCaretRight, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Tooltip } from "antd";
import { ButtonPlay, ImageCustom } from "components";
import { useHomePage } from "hooks/use-homepage";
import { t } from "i18next";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { formatNumber, getImage } from "utils";
import "./style.scss";

export const ComponentSlider = React.memo(
  ({ dataPopular, children, title }) => {
    const navigate = useNavigate();
    return (
      <div className={`${title ? "mt-[64px]" : "mt-[128px]"}`}>
        <div>
          <p className="text-white uppercase font-[600] tracking-[2px] mb-4">
            {t(`${title}`)}
          </p>
        </div>
        <Swiper
          slidesPerView={7.3}
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
              <SwiperSlide key={index} className="cursor-pointer">
                <div
                  className="group relative delay-150 hover:scale-110 duration-[250ms]"
                  onClick={() => {
                    navigate(`movie/${item.id}`);
                  }}
                >
                  <ImageCustom
                    data-aos="zoom-in"
                    typeEffect="opacity"
                    alt="Poster"
                    src={getImage(item.poster_path, "w185")}
                    className="max-w-full w-full object-cover rounded-[6px]"
                  />
                  {/* name film */}
                  <div className="absolute bottom-0 bg-[#0d0c0f] w-full rounded-b-[6px]">
                    <Tooltip
                      title={!item?.title ? item?.original_title : item?.title}
                    >
                      <p className="text-[16px] line-clamp-1 text-center text-[#999898]">
                        {!item?.title ? item?.original_title : item?.title}
                      </p>
                    </Tooltip>
                  </div>
                  {/* btn play */}
                  <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2  hidden group-hover:block delay-250 hover:scale-110 duration-300">
                    <ButtonPlay size="small" />
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
