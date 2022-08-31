import { faCaretRight, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge } from "antd";
import { useHomePage } from "hooks/use-homepage";
import React from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { formatNumber, getImage } from "utils";
import "./style.scss";

export const Popular = React.memo(({ dataPopular, children }) => {
  console.log({ dataPopular });
  return (
    <div className="my-[64px]">
      <div>
        <p className="text-white uppercase font-[600] tracking-[2px]">
          Popular
        </p>
      </div>
      <div>
        <Swiper
          slidesPerView={6}
          spaceBetween={30}
          slidesPerGroup={4}
          loop={true}
          loopFillGroupWithBlank={true}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="swiper-popular"
        >
          {dataPopular?.map((item, index) => {
            console.log(item.poster_path);
            return (
              <SwiperSlide
                key={index}
                // className="scale-95 hover:scale-125 ease-in duration-500"
              >
                <div className="group relative">
                  <img
                    className=" max-w-full object-cover  rounded-[6px]
                    
                    "
                    src={getImage(item.poster_path, "w185")}
                    alt=""
                  />
                  {/* btn play */}
                  <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 px-[18px] py-2 rounded-full bg-gradient-to-br from-primary to-[#f80223] hidden group-hover:block cursor-pointer delay-250 hover:scale-110 duration-300">
                    <FontAwesomeIcon
                      icon={faCaretRight}
                      className="text-white"
                    />
                  </div>
                  {/* rate */}
                  <div className="absolute top-[-8px] right-[2px] text-[13px]">
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
    </div>
  );
});
