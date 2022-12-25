import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Skeleton } from "antd";
import iconImg from "assets";
import { UserContext } from "contexts";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { formatNumber, getImage } from "utils";

export const ContentSearch = ({ dataContentSearch, isLoading, type }) => {
  const stateContext = useContext(UserContext);
  const { currentTabGlobal } = stateContext;
  const [tabGlobal, setTabGlobal] = currentTabGlobal;

  const getLinkRedirect = (type, check) => {
    switch (type) {
      case "multi":
        if (check === "movie") {
          sessionStorage.setItem("currentTab", "/");
          setTabGlobal("/");
          return "movie";
        } else {
          sessionStorage.setItem("currentTab", "tab-tb-show");
          setTabGlobal("tab-tb-show");
          return "tv";
        }
      case "tv":
        sessionStorage.setItem("currentTab", "tab-tb-show");
        setTabGlobal("tab-tb-show");
        return "tv";
      case "movie":
        sessionStorage.setItem("currentTab", "/");
        setTabGlobal("/");
        return "movie";
      case "people":
        return "people";
      default:
        return "";
    }
  };
  return (
    <>
      <div>
        <div className="flex flex-wrap justify-evenly gap-2 lg:gap-3">
          {dataContentSearch?.map((item, index) => {
            return (
              <Link
                key={item.id}
                to={`/${getLinkRedirect(type, item.media_type || "movie")}/${
                  item.id
                }`}
              >
                <div className="relative hover:scale-110 hover:duration-150 transition-all ease-linear cursor-pointer max-w-[185px] h-full flex flex-col">
                  <img
                    className="flex-1 rounded-md"
                    src={
                      getImage(
                        item.poster_path ? item.poster_path : item.profile_path,
                        "w342"
                      ).includes("null") ||
                      getImage(
                        item.poster_path ? item.poster_path : item.profile_path,
                        "w342"
                      ).includes("undefined")
                        ? iconImg.Img404
                        : getImage(
                            item.poster_path
                              ? item.poster_path
                              : item.profile_path,
                            "w342"
                          )
                    }
                    alt=""
                  />
                  <p className="text-[16px] text-center line-clamp-1">
                    {item.name ? item.name : item.title}
                  </p>
                  <div className="absolute top-[-8px] right-[0px] text-[13px]">
                    <Badge.Ribbon
                      color="#158370"
                      text={
                        <p className="rounded-[10px] m-0 leading-6">
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
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};
