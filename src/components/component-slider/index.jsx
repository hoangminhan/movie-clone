import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Tooltip } from "antd";
import iconImg from "assets";
import { ButtonPlay, SkeletonCustom } from "components";
import { UserContext } from "contexts";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { formatNumber, getImage } from "utils";
import "./style.scss";

export const ComponentSlider = React.memo(
  ({ dataPopular, children, title, slidesPerGroup = "4", type, isLoading }) => {
    const stateContext = useContext(UserContext);
    const { currentTabGlobal } = stateContext;
    const [tabGlobal, setTabGlobal] = currentTabGlobal;
    const navigate = useNavigate();

    const [t] = useTranslation();
    return (
      <div className={`${title ? "mt-[64px]" : "mt-[0px]"}`}>
        <p className="text-white uppercase font-[600] tracking-[2px] text-[20px] mb-3">
          {t(`${title ? title : ""}`)}
        </p>
        {!isLoading ? (
          <div>
            <Swiper
              slidesPerView={7.3}
              spaceBetween={30}
              // slidesPerGroup={4}
              loop={true}
              loopFillGroupWithBlank={true}
              navigation={true}
              modules={[Pagination, Navigation]}
              breakpoints={{
                300: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                500: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                600: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 6,
                  spaceBetween: 20,
                },
                1300: {
                  slidesPerView: 7.3,
                  spaceBetween: 30,
                },
              }}
              className="swiper-popular"
            >
              {dataPopular?.map((item, index) => {
                return (
                  <SwiperSlide key={index} className="cursor-pointer">
                    <div
                      className="group relative delay-150 hover:scale-110 duration-[250ms]"
                      onClick={() => {
                        sessionStorage.setItem(
                          "currentTab",
                          type === "movie" ? "/" : "tab-tv-show"
                        );
                        setTabGlobal(type === "movie" ? "/" : "tab-tv-show");

                        navigate(`/${type}/${item.id}`);
                      }}
                    >
                      <img
                        // typeEffect="opacity"
                        alt="Poster"
                        src={
                          getImage(item.poster_path, "w500").includes("null")
                            ? iconImg.Img404
                            : getImage(item.poster_path, "w500")
                        }
                        className="w-full object-cover rounded-[6px]"
                      />
                      {/* name film */}
                      <div className="absolute bottom-0 bg-[#0d0c0f] w-full rounded-b-[6px]">
                        <Tooltip
                          title={!item?.title ? item?.name : item?.title}
                        >
                          <p className="text-[16px] line-clamp-1 text-center text-textSecond">
                            {!item?.title ? item?.name : item?.title}
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
                          color="#158370"
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
        ) : (
          // <span className="mb-[64px] inline-block">{t("Updating")}...</span>
          // <Skeleton active />
          <SkeletonCustom quantity={5} />
        )}
      </div>
    );
  }
);
