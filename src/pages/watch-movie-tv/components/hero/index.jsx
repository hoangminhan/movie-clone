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

export const Hero = ({ dataDetail, handleChangeUrl, isLoadingDetail }) => {
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
  console.log({ dataUser });

  useEffect(() => {
    if (dataDetail.id) {
      const handleCheckIsFavorite = async (dataDetail) => {
        console.log(dataDetail.id);
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

  useEffect(() => {
    const getData = async () => {};
    getData();
  }, []);
  const { isLoading } = useHomePage();
  const executeScroll = () => {
    const elementToScroll = document.getElementById("movie-id");
    elementToScroll.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="max-h-[500px]">
      {isLoading ? (
        <Skeleton active round paragraph={{ rows: 17 }}></Skeleton>
      ) : (
        <div className="max-h-[500px] w-full relative">
          <img
            src={
              getImage(dataDetail.backdrop_path).includes("null")
                ? iconImg.Img404Backdrop
                : getImage(dataDetail.backdrop_path)
            }
            className="object-fill max-h-[500px] w-full rounded-b-lg"
            alt="hero"
          />

          {/* poster */}
          <div className="absolute bottom-[-15%] left-[15%] max-w-[185px]">
            <img
              src={
                getImage(dataDetail.poster_path, "w185").includes("null")
                  ? iconImg.Img404
                  : getImage(dataDetail.poster_path, "w185")
              }
              className="rounded-global"
              alt="poster"
            />
          </div>

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
              ${isFavorite ? "border-[#5179ff]" : "border-[white]"}
              border-[2px] hover:border-[#5179ff]`}
              >
                <FontAwesomeIcon
                  icon={faHeart}
                  color="white"
                  className={`text-[13px] ${
                    isFavorite ? "text-[#5179ff]" : ""
                  }`}
                />
              </p>
            </Tooltip>
          </div>

          {/* name phim */}
          <div className="absolute  left-[30%] bottom-[20%] max-w-[500px] ">
            <p className="text-white text-[40px] font-medium drop-shadow-2xl shadow-[red]  p-5 ml-3 pr-0  leading-10 stroke-text">
              {dataDetail?.title ? dataDetail?.title : dataDetail?.name}
            </p>
          </div>

          {/* genres */}
          <div className="absolute left-[30%] bottom-[8%] p-5 ml-3 flex">
            {dataDetail?.genres?.map((genre, index) => {
              return (
                <Tooltip title={genre.name} key={index}>
                  <Link
                    to={`/genres/${genre.id}-${genre.name}`}
                    state={{ genreName: genre.name }}
                  >
                    <p className="max-w-[140px] line-clamp-1 py-1 px-3 border-solid border-white border-[1px] mr-3 rounded-3xl text-white text-[16px] uppercase cursor-pointer hover:scale-110 duration-150 stroke-text-sm">
                      {genre.name}
                    </p>
                  </Link>
                </Tooltip>
              );
            })}
          </div>
          {/* watch */}

          <div
            className="absolute bottom-3 right-3"
            onClick={() => {
              executeScroll();
              handleAddHistory(dataDetail);

              // handleChangeUrl(embedMovie(dataDetail.id));
            }}
          >
            <div className="flex items-center justify-center px-4 py-3 bg-primary text-white rounded-[20px] hover:scale-110 duration-200 cursor-pointer">
              <p className="w-5 h-5 bg-[red] flex items-center justify-center p-4 rounded-full">
                <FontAwesomeIcon icon={faPlay} fontSize="16px" />
              </p>
              <p className="ml-2">{t("Watch now")}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
