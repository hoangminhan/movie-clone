import { faHeart, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Skeleton, Tooltip } from "antd";
import iconImg from "assets";
import { useHomePage } from "hooks/use-homepage";

import { Link } from "react-router-dom";
import { getImage } from "utils";

import { UserContext } from "contexts";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { useAddList, useNotification } from "hooks";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const Hero = ({ dataDetail }) => {
  const [t] = useTranslation();
  const { handleAddBookMarked, handleAddHistory } = useAddList();
  const [isFavorite, setIsFavorite] = useState(false);
  const stateContext = useContext(UserContext);
  const { currentDataUser, currentTabGlobal } = stateContext;
  const [dataUser, setDataUser] = currentDataUser;
  const [tabGlobal, setTabGlobal] = currentTabGlobal;
  const accessToken = localStorage.getItem("accessToken") || "";
  const { handlePopupNotification } = useNotification();
  const [replaceStatus, setReplaceStatus] = useState(false);
  const { isLoading } = useHomePage();

  const executeScroll = () => {
    const elementToScroll = document.getElementById("movie-id");
    elementToScroll.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (dataDetail.id) {
      const handleCheckIsFavorite = async (dataDetail) => {
        let checkExist = false;
        if (dataDetail?.id) {
          const db = getFirestore();

          const querySnapsot = query(
            collection(db, "user"),
            where("user_id", "==", dataUser?.uid)
          );
          const querySnapshot = await getDocs(querySnapsot);
          querySnapshot.forEach((doc, index) => {
            doc.data().bookmark.forEach((item) => {
              if (item.id === dataDetail.id) {
                checkExist = true;
                setIsFavorite(true);
              }
            });
          });
        }
        if (!checkExist) {
          setIsFavorite(false);
        }
        return checkExist;
      };
      handleCheckIsFavorite(dataDetail);
    }
  }, [dataDetail, dataUser.uid, isFavorite, replaceStatus]);

  return (
    <div className="min-h-[400px] max-h-[500px] mt-6">
      {isLoading ? (
        <Skeleton active round paragraph={{ rows: 17 }}></Skeleton>
      ) : (
        <div className="min-h-[400px] max-h-[500px] w-full relative">
          <img
            src={
              getImage(dataDetail.backdrop_path).includes("null")
                ? iconImg.Img404Backdrop
                : getImage(dataDetail.backdrop_path)
            }
            className="object-cover sm:object-fill min-h-[400px] max-h-[500px] w-full rounded-xl overflow-hidden"
            alt="hero"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b0bd9] to-transparent "></div>

          {/* add list */}
          <div
            className="absolute right-2 top-2 cursor-pointer hover:scale-110 duration-200"
            onClick={async () => {
              if (accessToken) {
                await handleAddBookMarked(dataDetail);
                setReplaceStatus(!replaceStatus);
              } else {
                handlePopupNotification(
                  "You need to login to perform this function",
                  "warning"
                );
              }
            }}
          >
            <Tooltip
              title={
                !accessToken
                  ? t("Sign in to add to favorites")
                  : isFavorite && accessToken
                  ? t("Remove from favorites")
                  : t("Add to favorites")
              }
            >
              <p
                className={`group bg-transparent w-10 h-10 flex items-center justify-center rounded-full border-solid 
              ${isFavorite ? "border-primarybg" : "border-[white]"}
              border-[2px] hover:border-primarybg`}
              >
                <FontAwesomeIcon
                  icon={faHeart}
                  className={`text-[13px] group-hover:text-primarybg ${
                    isFavorite ? "text-primarybg" : ""
                  }`}
                />
              </p>
            </Tooltip>
          </div>
          {/* poster */}
          <div className="absolute bottom-[-15%] left-[5%] tablet:left-[15%] max-w-[185px]">
            <img
              src={
                getImage(dataDetail.poster_path, "w185").includes("null")
                  ? iconImg.Img404
                  : getImage(dataDetail.poster_path, "w185")
              }
              className="rounded-lg w-[80%] tablet:w-full"
              alt="poster"
            />
          </div>

          <div className="absolute sm:left-[30%] tablet:left-[40%] lg:left-[35%] xl:left-[30%] xxl:left-[25%] bottom-[40%] sm:bottom-[15%]">
            {/* name phim */}
            <p className="text-white text-[25px] sm:text-[30px] xl:text-[35px] font-medium drop-shadow-2xl shadow-[red] ml-3 pr-0 leading-10 stroke-text max-w-[500px] line-clamp-1 overflow-hidden">
              {dataDetail?.title ? dataDetail?.title : dataDetail?.name}
            </p>

            {/* genres */}
            <div className="p-5 ml-3 flex">
              {dataDetail?.genres?.map((genre, index) => {
                return (
                  <Tooltip title={genre.name} key={index}>
                    <Link
                      to={`/genres/${genre.id}-${genre.name}`}
                      state={{ genreName: genre.name }}
                    >
                      <p className="text-center text-[13px] sm:text-[14px] max-w-[120px] min-w-[80px] line-clamp-1 px-3 border-solid border-white border-[1px] mr-3 rounded-3xl text-white  uppercase cursor-pointer hover:scale-110 duration-150 ">
                        {genre.name.replace("Phim", "")}
                      </p>
                    </Link>
                  </Tooltip>
                );
              })}
            </div>
          </div>

          {/* watch */}

          <div
            className="absolute bottom-3 right-3"
            onClick={() => {
              executeScroll();
              handleAddHistory(dataDetail);
            }}
          >
            <div className="flex items-center justify-center px-4 py-1 bg-primarybg text-white rounded-[20px] hover:scale-110 duration-200 cursor-pointer">
              <p className="w-5 h-5 bg-[red] flex items-center justify-center p-3 rounded-full">
                <FontAwesomeIcon icon={faPlay} fontSize="16px" />
              </p>
              <p className="ml-2 text-[20px]">{t("Watch now")}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
