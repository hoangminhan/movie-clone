import { faHeart, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { message, notification, Skeleton, Tooltip } from "antd";
import iconImg from "assets";
import { ButtonAddList } from "components";
import { useHomePage } from "hooks/use-homepage";
import { t } from "i18next";
import { Link } from "react-router-dom";
import { getImage } from "utils";

import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  query,
  where,
  setDoc,
} from "firebase/firestore";
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "contexts";
import { useAddList } from "hooks";
import { useState } from "react";

export const Hero = ({ dataDetail, handleChangeUrl, isLoadingDetail }) => {
  const { handleAddBookMarked, handleAddHistory } = useAddList();
  const [isFavorite, setIsFavorite] = useState(false);
  const stateContext = useContext(UserContext);
  const { currentDataUser, currentTabGlobal } = stateContext;
  const [dataUser, setDataUser] = currentDataUser;
  const [tabGlobal, setTabGlobal] = currentTabGlobal;

  useEffect(() => {
    if (dataDetail.id) {
      const handleCheckIsFavorite = async (dataDetail) => {
        let idCheck = "123";
        if (dataDetail?.id) {
          const db = getFirestore();

          const querySnapsot = query(
            collection(db, "bookmark"),
            where("user_id", "==", dataUser?.uid),
            where("id", "==", dataDetail.id)
          );
          const querySnapshot = await getDocs(querySnapsot);
          querySnapshot.forEach((item, index) => {
            if (item.data().id === dataDetail.id) {
              idCheck = item.data().id;
              // setIsFavorite(!isFavorite);
              setIsFavorite(true);
            }
          });
        }
        return idCheck;
      };
      handleCheckIsFavorite(dataDetail);
    }
  }, [dataDetail, dataUser.uid, isFavorite]);
  console.log(isFavorite);

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

  // const handleAddHistory = async (data) => {
  //   const db = getFirestore();
  //   console.log(dataUser.id);

  //   console.log(data);
  //   const queryDb = query(
  //     collection(db, "history"),
  //     where("user_id", "==", dataUser.uid),
  //     where("id", "==", data.id)
  //   );
  //   const dataResult = await getDocs(queryDb);
  //   let checkExist = false;
  //   dataResult.forEach((doc) => {
  //     if (data.id === doc.data().id) {
  //       checkExist = true;
  //     }
  //   });
  //   if (checkExist) {
  //     return;
  //   } else {
  //     try {
  //       await addDoc(collection(db, "history"), {
  //         name: data.title ? data.title : data.name,
  //         rate: data.vote_average,
  //         user_id: dataUser.uid,
  //         type: tabGlobal === "/" ? "movie" : "tv",
  //         id: data.id,
  //         url: data.poster_path,
  //       });
  //     } catch (error) {
  //       console.log(error.message);
  //       console.log("có lỗi xảy ra");
  //     }
  //   }
  // };

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
              const isLogin = localStorage.getItem("accessToken") || "";
              if (isLogin) {
                setIsFavorite(!isFavorite);
                await handleAddBookMarked(dataDetail);
              } else {
                notification.warning({
                  message: "Bạn cần đăng nhập để thực hiện chức năng",
                });
              }
            }}
          >
            <Tooltip
              title={
                isFavorite
                  ? "Xóa khỏi danh sách ưa thích"
                  : "Thêm vào danh sách của tôi"
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
