import {
  faClose,
  faHeart,
  faStar,
  faThumbsDown,
  faThumbsUp,
  faThumbTack,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Modal, Row, Spin, Tooltip } from "antd";
import { ButtomCustom, SimilarContent } from "components";
import { UserContext } from "contexts";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { useAddList, useNotification } from "hooks";
import { useHomePage } from "hooks/use-homepage";

import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactPlayer from "react-player";
import { Link, useNavigate } from "react-router-dom";
import ShowMoreText from "react-show-more-text";
import { embedMovieTrailer, formatNumber } from "utils";
import "./style.scss";

export const ModalTrailer = ({
  currentUrl,
  dataDetail,
  dataSimilar,
  visibleModal,
  handleCloseModal,
}) => {
  const { listCastsMovie } = useHomePage();
  const [t] = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const currentType =
    sessionStorage.getItem("currentTab") === "/tv-show" ? "tv" : "movie";
  const navigate = useNavigate();
  const { handleAddBookMarked, handleAddHistory } = useAddList();
  const [isFavorite, setIsFavorite] = useState(false);
  const accessToken = localStorage.getItem("accessToken") || "";

  const stateContext = useContext(UserContext);
  const { currentDataUser } = stateContext;
  const [dataUser, setDataUser] = currentDataUser;
  const { handlePopupNotification } = useNotification();

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
  }, [dataDetail, dataUser?.uid, isFavorite]);

  return (
    <Modal
      visible={visibleModal}
      wrapClassName="modal-config"
      style={{
        top: 0,
      }}
      closable={false}
      footer={null}
      maskClosable={false}
      width={1000}
    >
      <div className="relative flex justify-center flex-col">
        {/* button close */}
        <div className="absolute right-[-18px] top-[-5px]">
          <Tooltip title="Click to exit" placement="right">
            <div
              className="px-[14px] py-[8px] bg-[#fff] rounded-full cursor-pointer border-solid border-[1px] border-[black] hover:scale-110 duration-300"
              onClick={() => {
                // handleToggleModal({ type: "", visible: false });
                // handleToggleAutoBanner(false);
                handleCloseModal(false);
              }}
            >
              <FontAwesomeIcon
                icon={faClose}
                color="black"
                className="text-[22px]"
              />
            </div>
          </Tooltip>
        </div>
        {/* video trailer modal */}
        {!isLoading ? (
          <div className="min-h-[500px] w-full mt-8">
            <ReactPlayer
              url={embedMovieTrailer(currentUrl)}
              width="100%"
              height={500}
              playing
              muted
              controls
              loop
            />
          </div>
        ) : (
          <div className="min-h-[500px] flex items-center justify-center">
            <Spin />
          </div>
        )}

        {/* content modal */}
        <div className="mt-[32px] text-white text-[16px] ">
          <Row>
            <div className="mb-8">
              <Link to={`/${currentType}/${dataDetail.id}`}>
                <ButtomCustom
                  title="Play"
                  nameIcon="iconPlay"
                  onClick={() => {
                    handleAddHistory(dataDetail);
                  }}
                />
              </Link>
            </div>
            {/* add playlist */}
            <div
              className={`ml-8 cursor-pointer hover:scale-110 duration-200`}
              onClick={async () => {
                if (accessToken) {
                  setIsFavorite(!isFavorite);
                  await handleAddBookMarked(dataDetail);
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

            {/* like */}
            {/* dis like */}

            <div className="ml-8 mr-[32px] group relative w-[50px] h-[50px] cursor-pointer duration-300">
              <div className="absolute z-[2]">
                <Tooltip title={t("Like")}>
                  <p className="bg-[white] w-10 h-10 flex items-center justify-center rounded-full border-solid border-black border-[1px]">
                    <FontAwesomeIcon icon={faThumbsUp} color="black" />
                  </p>
                </Tooltip>
              </div>
              <div className="absolute invisible group-hover:visible left-0 group-hover:left-[-50px] duration-300 z-[1]">
                <Tooltip title={t("Dis Like")}>
                  <p className="bg-[white] w-10 h-10 flex items-center justify-center rounded-full border-solid border-black border-[1px]">
                    <FontAwesomeIcon icon={faThumbsDown} color="black" />
                  </p>
                </Tooltip>
              </div>
              <div className="absolute invisible group-hover:visible right-[9px] group-hover:right-[-45px] duration-300 z-[1]">
                <Tooltip title={t("Perfect")}>
                  <p className="bg-[white] w-10 h-10 flex items-center justify-center rounded-full border-solid border-black border-[1px]">
                    <FontAwesomeIcon icon={faThumbTack} color="black" />
                  </p>
                </Tooltip>
              </div>
            </div>
          </Row>
          <Row
            gutter={[32, 16]}
            className="border-solid border-[1px] border-[#ccc] py-4"
          >
            <Col xs={24} md={12}>
              {/* run time */}
              <div className="flex flex-col tablet:flex-row items-start tablet:items-center justify-start tablet:justify-between gap-2 tablet:gap-4">
                <p>
                  <span>{t("Run time")}: </span>
                  {dataDetail?.runtime} phút
                </p>
                <p>
                  <span>{t("Release date")}: </span>
                  {dataDetail?.release_date}
                </p>
              </div>
              <p className="mt-2">
                <span>{t("Rating")}: </span>
                <span className="mr-1">
                  {formatNumber(dataDetail?.vote_average, 10)}
                </span>
                <FontAwesomeIcon icon={faStar} color="yellow" />
              </p>
              {/* overview */}
              <div className="mt-2">
                <span className="mr-2">{t("Overview")}:</span>
                <ShowMoreText
                  /* Default options */
                  lines={3}
                  more={
                    <span className="text-[#45b1df] font-bold">Show more</span>
                  }
                  less={
                    <span className="text-[#45b1df] font-bold">Show less</span>
                  }
                  // onClick={executeOnClick}
                  expanded={true}
                  truncatedEndingComponent={"...    "}
                >
                  <p>{dataDetail?.overview}</p>
                </ShowMoreText>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div>
                <div className="flex">
                  <span className="text-[16px] mr-2">{t("Cast")}:</span>
                  <p className="line-clamp-2">
                    {listCastsMovie?.map((cast, index) => {
                      return index < listCastsMovie.length - 1 ? (
                        <Link
                          key={index}
                          to={`/cast/${cast.id}`}
                        >{`${cast.name},  `}</Link>
                      ) : (
                        // cast.name
                        <Link to={`/cast/${cast.id}`}>{`${cast.name}`}</Link>
                      );
                    })}
                  </p>
                </div>
                <div className="mt-2 flex flex-wrap">
                  <span className="text-[16px] mr-2">{t("Genres")}:</span>
                  <div className="flex flex-wrap">
                    {dataDetail?.genres?.map((genre, index) => {
                      const currentType =
                        sessionStorage.getItem("currentTab") === "/tv-show"
                          ? "tv"
                          : "movie";
                      return (
                        <div
                          key={index}
                          className="flex"
                          onClick={() => {
                            if (currentType === "tv") {
                              return;
                            } else {
                              navigate(`/genres/${genre.id}-${genre.name}`);
                            }
                          }}
                        >
                          <p
                            className={
                              currentType !== "tv" ? "cursor-pointer" : ""
                            }
                          >
                            {index < dataDetail.genres.length - 1 ? (
                              <span>{genre.name},&nbsp; </span>
                            ) : (
                              <span>{genre.name}</span>
                            )}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <p className="mt-2">
                  <span className="text-[16px] mr-2">
                    {t("Production companies")}:
                  </span>
                  <p>
                    {dataDetail?.production_companies?.map((company, index) => {
                      return (
                        <span key={index}>
                          {index < dataDetail.production_companies.length - 1
                            ? `${company.name},  `
                            : company.name}
                        </span>
                      );
                    })}
                  </p>
                </p>
                <p className="mt-2">
                  <span className="text-[16px] mr-2">{t("Collection")}:</span>
                  <span>
                    {dataDetail?.belongs_to_collection?.name
                      ? dataDetail?.belongs_to_collection?.name
                      : "Updating..."}
                  </span>
                </p>
              </div>
            </Col>
          </Row>
          {/*  similar content */}
          <Row>
            <div>
              <h2 className="text-white text-[24px] mt-4">
                {t("Similar content")}
              </h2>
              <div className="mt-8">
                <SimilarContent dataSimilar={dataSimilar} />
              </div>
            </div>
          </Row>
        </div>
      </div>
    </Modal>
  );
};
