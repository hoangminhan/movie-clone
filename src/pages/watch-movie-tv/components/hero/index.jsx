import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { message, notification, Skeleton, Tooltip } from "antd";
import iconImg from "assets";
import { ButtonAddList } from "components";
import { useHomePage } from "hooks/use-homepage";
import { t } from "i18next";
import { Link } from "react-router-dom";
import { getImage } from "utils";

import { getFirestore, addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";

const db = getFirestore();

export const Hero = ({ dataDetail, handleChangeUrl, isLoadingDetail }) => {
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

  const handleAddBookMarked = async (data) => {
    console.log("click", data);
    const querySnapshot = await getDocs(collection(db, "bookmark"));
    let checkExist = false;
    querySnapshot.forEach((doc) => {
      if (data.id === doc.data().id) {
        checkExist = true;
      }
      // console.log(doc.id, " => ", doc.data());
    });
    if (checkExist) {
      message.warning("Phim này đã được thêm vào bookmark");
    } else {
      await addDoc(collection(db, "bookmark"), {
        id: data.id,
        type: "tv",
        rate: dataDetail.vote_average,
        url: dataDetail.poster_path,
        title: dataDetail?.title ? dataDetail?.title : dataDetail?.name,
      });
      notification.success({
        message: "Thêm thành công vào danh sách ưa thích",
      });
    }
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
            onClick={() => {
              handleAddBookMarked(dataDetail);
            }}
          >
            <ButtonAddList />
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
