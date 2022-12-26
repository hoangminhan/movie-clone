import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import iconImg from "assets";
import { ImageCustom } from "components";
import React from "react";
import { useTranslation } from "react-i18next";
import { getImage } from "utils";

export const EpisodeTv = ({
  dataEpisode,
  currentSeason,
  currentEpisode,
  handleChangeEpisode,
  setIsHiddenDrawer,
}) => {
  const [t] = useTranslation();
  const { episodes } = dataEpisode;

  return (
    <div className="mb-10">
      {/* season */}
      <div className="flex item-center justify-between">
        <h3 className="text-white mb-4 text-[16px] lg:text-[22px] uppercase">
          {t("Season")} <span>{currentSeason}</span>
        </h3>
        <div
          onClick={() => {
            setIsHiddenDrawer(true);
            sessionStorage.setItem("isHiddenDrawer", true);
          }}
        >
          <FontAwesomeIcon
            icon={faArrowRight}
            className="cursor-pointer text-white text-[18px] lg:text-[22px]"
          />
        </div>
      </div>
      {/* content */}
      <div>
        {episodes?.map((item, index) => {
          return (
            <div
              key={index}
              className={`flex flex-col justify-center items-center gap-y-1 mb-4 cursor-pointer hover:opacity-70 ${
                currentEpisode === item.episode_number ? "opacity-70" : ""
              }`}
              onClick={() => {
                handleChangeEpisode(item.episode_number);
              }}
            >
              <p className="text-[15px] lg:text-[20px]">
                {t("Episode")}: <span>{item.episode_number}</span>
              </p>
              <div className="max-w-[185px]">
                <img
                  src={
                    getImage(item.still_path, "w185").includes("null")
                      ? iconImg.Img404
                      : getImage(item.still_path, "w185")
                  }
                  alt=""
                  className="max-h-[104px] w-[185px] rounded-md"
                />
              </div>
              <p className="text-[14px] lg:text-[16px]">{item.air_date}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
