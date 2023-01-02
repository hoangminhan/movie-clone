import {
  faArrowRight,
  faPlus,
  faStar,
  faThumbsDown,
  faThumbsUp,
  faThumbTack,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, message, Rate, Row, Skeleton, Tooltip } from "antd";
import ReactLoading from "react-loading";

import { ComponentSlider, SkeletonCustom } from "components";
import { reducerClearSimilarMovie } from "features";
import { useHomePage } from "hooks/use-homepage";
import { useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Iframe from "react-iframe";
import { useDispatch } from "react-redux";
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  embedMovie,
  embedTV,
  formatNumber,
  getImage,
  handleScrollToTop,
} from "utils";
import { BodyWatch, CommentMovie, EpisodeTv, Hero } from "./components";
import { useContext } from "react";
import { UserContext } from "contexts";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNotification, useTitle } from "hooks";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import { query } from "firebase/database";
const handleGetRateCurrent = (dataRate, uid) => {
  const result = dataRate.find((item) => item.id_rate === uid);
  return result;
};

const WatchMovieTv = () => {
  const {
    handleGetDetailMovie,
    dataDetail,
    handleGetSimilarMovie,
    listSimilarMovie,
    handleGetListCasts,
    handleGetListKeywords,
    handleGetRecommendationMovie,
    handleGetListReviews,
    handleGetTrailer,
    handleGetSeasonTv,
    handleGetEpisodeTv,
    listCastsMovie,
    listKeywordsMovie,
    listRecommendationMovie,
    infoTrailerMovie,
    dataSeasonTv,
    isLoading,
    dataEposideTv,
  } = useHomePage();
  const { handleChangeTitle } = useTitle();

  let { idDetail } = useParams();
  const [t] = useTranslation();

  const [isLoadingDetail, setIsLoadingDetail] = useState(true);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams({});
  const [season, setSeason] = useState({
    numberSearson: 1,
    currentSeason: searchParams.get("currentSeason") || 1,
    currentEpisode: searchParams.get("currentEpisode") || 1,
  });

  const stateContext = useContext(UserContext);
  const { currentTabGlobal, currentDataUser } = stateContext;
  const [tabGlobal] = currentTabGlobal;
  const [dataUser, setDataUser] = currentDataUser;

  const [dataComment, setDataComment] = useState({});
  const [dataReply, setDataReply] = useState({});
  const [dataReaction, setDataReaction] = useState({});
  const [dataReplyReaction, setDataReplyReaction] = useState({});
  const [currentKey, setCurrentKey] = useState();
  const [nameCurrentUser, setNameCurrentUser] = useState();
  const [urlImgUser, setUrlImgUser] = useState(false);
  const [lenghtShow, setLengthShow] = useState(5);
  const [isLoadingComment, setIsLoadingComment] = useState(false);

  const [currentUrl, setCurrentUrl] = useState("");
  const { handlePopupNotification } = useNotification();

  const location = useLocation();
  const { pathname } = location;
  const [dataRaTe, setDataRate] = useState();
  const handleChangeQuantityComment = (data) => {
    setLengthShow((pre) => pre + data);
  };

  // render season
  const handleRenderSeason = (number) => {
    let i = [];
    for (let n = 1; n <= number; n++) {
      if (n <= number) {
        i.push(n);
      }
    }
    return i;
  };

  const executeScroll = () => {
    const elementToScroll = document.getElementById("similar-movie");
    if (elementToScroll) {
      elementToScroll.scrollIntoView({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // load more
  const handleLoadMoreSimilar = async () => {
    setIsLoadMore(true);
    const locale = sessionStorage.getItem("currentLocale") || "vi-VN";
    // check tv or movie
    const type = sessionStorage.getItem("currentTab") || "/";
    const currentType = type === "/" ? "movie" : "pv";

    await handleGetSimilarMovie(
      idDetail,
      {
        api_key: process.env.REACT_APP_API_KEY,
        language: locale,
        page: currentPage + 1,
      },
      currentType
    );
    setCurrentPage((page) => page + 1);
    setIsLoadMore(false);
  };

  // change episode
  const handleChangeEpisode = (episode) => {
    if (+episode !== +season.currentEpisode) {
      setSeason({ ...season, currentEpisode: episode });
      handleScrollToTop();
    } else {
      message.warning(`Bạn đang ở episode ${episode}`);
    }
  };

  // handle hide comment
  const handleHideComment = async (data) => {
    const newDataComment = dataComment.comment.filter(
      (item) => item.id_comment !== data.id_comment
    );

    setDataComment({ ...dataComment, comment: [...newDataComment] });
  };

  // handle hide reply
  const handleHideReply = async (data) => {
    const newDataReply = dataReply.reply.filter(
      (item) => item.id_reply !== data.id_reply
    );
    setDataReply({ ...dataReply, reply: [...newDataReply] });
  };

  //  syn params with url
  useEffect(() => {
    const type = sessionStorage.getItem("currentTab") || "/";
    const currentType = type === "/tv-show" ? "tv" : "movie";
    if (currentType === "tv") {
      setSearchParams({
        ...season,
      });
    }
  }, [season]);

  // sync title
  useEffect(() => {
    handleChangeTitle(dataDetail.title ? dataDetail.title : dataDetail.name);
  }, [dataDetail]);

  //   get data detail movie
  useLayoutEffect(() => {
    const handleGetData = async () => {
      const locale = sessionStorage.getItem("currentLocale") || "vi-VN";
      setIsLoadingDetail(true);
      dispatch(reducerClearSimilarMovie());
      const type = sessionStorage.getItem("currentTab") || "/";
      const currentType = type === "/" ? "movie" : "tv";

      const result = await handleGetDetailMovie(
        idDetail,
        {
          api_key: process.env.REACT_APP_API_KEY,
          language: locale,
          append_to_response: "videos",
        },
        currentType
      );
      // to get season of tv
      const newResults = unwrapResult(result);
      const { number_of_seasons } = newResults;
      setSeason({ ...season, numberSearson: number_of_seasons });

      await handleGetTrailer(idDetail, currentType, {
        api_key: process.env.REACT_APP_API_KEY,
      });
      // executeScroll();
      if (currentType === "movie") {
        await handleGetSimilarMovie(
          idDetail,
          {
            api_key: process.env.REACT_APP_API_KEY,
            language: locale,
            page: currentPage,
          },
          currentType
        );
      }

      // tv
      if (currentType === "tv") {
        // get season tv

        await handleGetSeasonTv(idDetail, season.currentSeason, {
          api_key: process.env.REACT_APP_API_KEY,
          language: locale,
          append_to_response: "videos",
        });
        await handleGetEpisodeTv(
          idDetail,
          season.currentSeason,
          season.currentEpisode,
          {
            api_key: process.env.REACT_APP_API_KEY,
            language: locale,
            append_to_response: "videos",
          }
        );
      }

      setIsLoadingDetail(false);
      handleGetRecommendationMovie(
        idDetail,
        {
          api_key: process.env.REACT_APP_API_KEY,
          language: locale,
        },
        currentType
      );
      handleGetListCasts(
        idDetail,
        {
          api_key: process.env.REACT_APP_API_KEY,
          language: locale,
        },
        currentType
      );
      handleGetListKeywords(
        idDetail,
        {
          api_key: process.env.REACT_APP_API_KEY,
        },
        currentType
      );
      handleGetListReviews(idDetail, {
        api_key: process.env.REACT_APP_API_KEY,
        // language: locale,
        page: 1,
      });
      setCurrentUrl(
        currentType === "movie"
          ? embedMovie(idDetail)
          : embedTV(idDetail, season.currentSeason, season.currentEpisode)
      );
    };
    handleGetData();
  }, [idDetail, season.currentEpisode, season.currentSeason]);

  // get name user current
  useEffect(() => {
    const getNameCurrentUser = async () => {
      const dbfireStore = getFirestore();

      const queryUser = query(
        collection(dbfireStore, "user"),
        where("user_id", "==", dataUser.uid)
      );
      const dataUserQuery = await getDocs(queryUser);
      dataUserQuery.forEach((doc) => {
        setNameCurrentUser(doc.data().name);
        setUrlImgUser(doc.data().url);
      });
    };
    if (dataUser) {
      getNameCurrentUser();
    }
  }, [dataUser]);

  // check movie have at realtime yet, to push item
  useEffect(() => {
    const handleGetdata = async () => {
      setIsLoadingComment(true);
      const dbfireStore = getFirestore();

      const checkDocumentComment = doc(dbfireStore, "detail", idDetail);
      const querySnapsotComment = query(
        collection(dbfireStore, "detail"),
        where("id_detail", "==", idDetail)
      );
      const querySnapsotReply = query(
        collection(dbfireStore, "reply"),
        where("id_detail", "==", idDetail)
      );
      const querySnapsotReaction = query(
        collection(dbfireStore, "reaction"),
        where("id_detail", "==", idDetail)
      );

      const docSnap = await getDoc(checkDocumentComment);
      if (!docSnap.exists()) {
        setDoc(
          doc(dbfireStore, "detail", idDetail),
          {
            comment: [],
            listRate: [],
            id_detail: idDetail,
          },
          { merge: true }
        );
      }
      // check reply exits
      const checkDocumentReply = doc(dbfireStore, "reply", idDetail);
      const docSnapReply = await getDoc(checkDocumentReply);
      if (!docSnapReply.exists()) {
        setDoc(
          doc(dbfireStore, "reply", idDetail),
          {
            reply: [],
            id_detail: idDetail,
          },
          { merge: true }
        );
      }
      // check reaction exist
      const checkDocumentReaction = doc(dbfireStore, "reaction", idDetail);
      const docSnapReaction = await getDoc(checkDocumentReaction);

      if (!docSnapReaction.exists()) {
        setDoc(
          doc(dbfireStore, "reaction", idDetail),
          {
            reaction: [],
            id_detail: idDetail,
          },
          { merge: true }
        );
      }

      const checkReplyReactionExits = doc(
        dbfireStore,
        "reaction_reply",
        idDetail
      );
      const refReplyReaction = await getDoc(checkReplyReactionExits);
      if (!refReplyReaction.exists()) {
        setDoc(doc(dbfireStore, "reaction_reply", idDetail), {
          id_detail: idDetail,
          reaction_reply: [],
        });
      }
      // listent db reaction reply
      const queryReplyReaction = query(
        collection(dbfireStore, "reaction_reply"),
        where("id_detail", "==", idDetail)
      );
      onSnapshot(queryReplyReaction, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setDataReplyReaction({
            ...dataReplyReaction,
            ...doc.data(),
          });
        });
      });

      // listening db reaction
      onSnapshot(querySnapsotReaction, (querySnapshot) => {
        querySnapshot.forEach((docs) => {
          setDataReaction({
            ...docs.data(),
          });
        });
      });
      // listening db reply
      onSnapshot(querySnapsotReply, (querySnapshot) => {
        querySnapshot.forEach((docs) => {
          setDataReply({
            id_detail: docs.data().id_detail,
            reply: docs.data().reply.sort(function (x, y) {
              return y.createAt.seconds - x.createAt.seconds;
            }),
          });
        });
      });

      // listening db comment
      onSnapshot(querySnapsotComment, (querySnapshot) => {
        querySnapshot.forEach((docs) => {
          setDataRate((pre) => {
            const result = handleGetRateCurrent(
              docs.data().listRate,
              dataUser.uid
            );
            return result ? result.value_rate : pre;
          });
          setDataComment({
            id_detail: docs.data().id_detail,
            comment: docs.data().comment.sort(function (x, y) {
              return y.createAt.seconds - x.createAt.seconds;
            }),
            listRate: docs.data().listRate,
          });
          setCurrentKey(docs.data().id_detail);
        });
      });
      setIsLoadingComment(false);
    };
    handleGetdata();
  }, [idDetail, dataUser]);

  const handleGenerateText = (pathname) => {
    return pathname.includes("/movie/") ? "movie" : "tv";
  };

  const [isHiddenDrawer, setIsHiddenDrawer] = useState(
    sessionStorage.getItem("isHiddenDrawer") === "true" ? true : false
  );

  const handleAddRateMovie = async (value) => {
    const isLogin = Boolean(localStorage.getItem("accessToken"));
    if (isLogin) {
      const dbfireStore = getFirestore();
      const rateRef = doc(dbfireStore, "detail", idDetail);
      try {
        const { uid } = dataUser;
        const docSnap = await getDoc(rateRef);
        if (docSnap.exists()) {
          const isExistRate = handleGetRateCurrent(
            docSnap.data().listRate,
            uid
          );
          const dataAdd = {
            id_rate: uid,
            value_rate: value,
          };
          if (isExistRate) {
            // remove current to add new
            updateDoc(rateRef, {
              listRate: arrayRemove(isExistRate),
            });
            updateDoc(rateRef, {
              listRate: arrayUnion(dataAdd),
            });
          } else {
            // add
            updateDoc(rateRef, {
              listRate: arrayUnion(dataAdd),
            });
          }
        } else {
          console.log("k co");
        }
      } catch (error) {}
    } else {
      handlePopupNotification(
        "You need to login to perform this function",
        "warning"
      );
    }
  };

  return (
    <div>
      <Row
        className={`h-full transition-all duration-150 ease-linear ${
          isHiddenDrawer ? "mr-[0px]" : "mr-0 lg:mr-[160px] xl:mr-[250px]"
        }`}
      >
        <Col span={24}>
          {/* hero */}
          <Hero
            dataDetail={dataDetail}
            // handleChangeUrl={handleChangeUrl}
            isLoadingDetail={isLoadingDetail}
          />
          {isLoading ? (
            ""
          ) : (
            <div
              className={`z-[2] right-[72px] fixed bottom-9 mt-3 transition-all duration-200 ease-linear ${
                isHiddenDrawer ? "opacity-100" : "opacity-0"
              }`}
            >
              <Tooltip
                title={t(`Open similar ${handleGenerateText(pathname)}`)}
              >
                <p
                  className="cursor-pointer w-[50px] h-[50px] bg-primarybg rounded-full flex justify-center items-center hover:scale-105 transition-all duration-150 ease-linear"
                  onClick={() => {
                    setIsHiddenDrawer(false);
                    sessionStorage.setItem("isHiddenDrawer", false);
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} beat />
                </p>
              </Tooltip>
            </div>
          )}

          <div className="w-full mt-10">
            <BodyWatch
              isLoadingDetail={isLoading}
              listCastsMovie={
                tabGlobal === "/"
                  ? listCastsMovie
                  : dataEposideTv?.guest_stars?.filter(
                      (item, index) => index < 8 && item
                    )
              }
              dataDetail={tabGlobal === "/" ? dataDetail : dataEposideTv}
              currenTab={tabGlobal}
              dataSeason={season}
              listKeywordsMovie={listKeywordsMovie}
              infoTrailerMovie={
                tabGlobal === "/"
                  ? infoTrailerMovie
                  : dataEposideTv?.videos?.results[0] ||
                    dataSeasonTv?.videos?.results[0] ||
                    dataDetail?.videos?.results[0]
              }
            />

            {/* xem phim */}
            <div className="my-10 px-8 overflow-hidden" id="movie-id">
              {currentUrl && (
                <Iframe
                  id="movie-id"
                  src={currentUrl}
                  className="h-[300px] tablet:h-[500px] overflow-hidden"
                  width="100%"
                  allowFullScreen
                ></Iframe>
              )}
            </div>

            <div>
              {/* season */}
              {handleRenderSeason(season.numberSearson)?.length === 1 ? (
                ""
              ) : (
                <div className="flex gap-5 gap-y-7 flex-wrap mb-2 mt-[32px]">
                  {handleRenderSeason(season.numberSearson).map(
                    (item, index) => {
                      return (
                        <p
                          key={index}
                          className={`transition-all duration-150 hover:scale-105 ease-linear px-2 py-[2px] rounded-md overflow-hidden cursor-pointer flex text-[18px] ${
                            +season.currentSeason === +item
                              ? "bg-black text-white"
                              : "bg-primarybg"
                          }`}
                          onClick={() => {
                            if (season.currentSeason === +item) {
                              message.warning(t(`Bạn đang ở Season ${item}`));
                            } else {
                              setSeason({
                                ...season,
                                currentSeason: +item,
                                currentEpisode: 1,
                              });
                              handleScrollToTop();
                            }
                          }}
                        >
                          Season &nbsp;<span>{item}</span>
                        </p>
                      );
                    }
                  )}
                </div>
              )}
            </div>
            {/* rating */}
            <div className="">
              <p className="text-[16px] mr-1">{t("Your rating")}:</p>
              <Rate
                allowHalf
                value={dataRaTe}
                onChange={(value) => {
                  handleAddRateMovie(value);
                }}
              />
            </div>
            {/* eposide tv */}

            {tabGlobal === "/" ? (
              ""
            ) : (
              <div className="flex flex-col justify-end items-end px-[24px]">
                <p className="italic font-bold text-[18px]">
                  {t("Episode")}&nbsp;
                  <span className="italic text-[18px]">
                    {season.currentEpisode}
                  </span>
                </p>
                <div className="flex">
                  <p className="text-[18px]">
                    {t("Season")}{" "}
                    <span className="text-[18px]">{season.currentSeason}</span>
                  </p>
                  &nbsp; -&nbsp;{" "}
                  <span className="text-[18px]">{t("Episode")}</span>
                  <span className="ml-1 text-[18px]">
                    &nbsp;
                    {season.currentEpisode}
                  </span>{" "}
                </div>
              </div>
            )}

            {/* action */}
            <div className="flex justify-start mr-6 mt-[24px]">
              <div className="ml-[50px] mr-[32px] group relative w-[50px] h-[50px] cursor-pointer duration-300">
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
            </div>

            {/* commment */}
            <div>
              <CommentMovie
                dataComment={dataComment}
                dataReply={dataReply}
                dataReaction={dataReaction}
                dataReplyReaction={dataReplyReaction}
                dataUser={dataUser}
                idDetail={idDetail}
                currentKey={currentKey}
                nameCurrentUser={nameCurrentUser}
                urlImgUser={urlImgUser}
                handleHideReply={handleHideReply}
                handleHideComment={handleHideComment}
                lenghtShow={lenghtShow}
                handleChangeQuantityComment={handleChangeQuantityComment}
                isLoadingComment={isLoadingComment}
              />
            </div>

            {/* recommendation */}
            <div className="pb-4">
              <ComponentSlider
                type={tabGlobal === "/" ? "movie" : "tv"}
                dataPopular={listRecommendationMovie}
                title="Recommendations"
              />
            </div>
          </div>
        </Col>
      </Row>

      <div
        className={`
        fixed top-0 xl:top-[70px] right-0 bottom-0 lg:absolute bg-black border-l-[#ccc] border-l-[1px] border-l-solid z-[2] h-full overflow-y-auto scroll-smooth no-scrollbar
      transition-all duration-150 ease-linear ${
        isHiddenDrawer ? "w-[0px] p-0" : "w-[160px] xl:w-[250px] p-2 tablet:p-4"
      }
      `}
      >
        {/* milimar movie */}
        {tabGlobal === "/" ? (
          <div className="h-[100%]">
            <div className="flex justify-between items-center mb-4">
              <p
                id="similar-movie"
                className="text-white uppercase text-[18px] xl:text-[22px]"
              >
                {t("Similar")}
              </p>
              <div
                onClick={() => {
                  setIsHiddenDrawer(true);
                  sessionStorage.setItem("isHiddenDrawer", true);
                }}
              >
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="cursor-pointer text-white"
                />
              </div>
            </div>
            <div className="flex flex-col gap-5">
              {listSimilarMovie?.map((similarContent, index) => {
                return (
                  <Link key={index} to={`/movie/${similarContent.id}`}>
                    <div
                      className="group flex justify-center flex-col xl:flex-row flex-wrap-reverse xl:flex-wrap gap-4 text-[#fff] cursor-pointer hover:brightness-125
                
                "
                      onClick={() => {
                        // navigate(`movie/${similarContent.id}`);
                      }}
                    >
                      <div className="max-w-full xl:max-w-[100px] w-full group-hover:scale-110 duration-200 delay-150">
                        <img
                          src={getImage(similarContent.poster_path, "w154")}
                          className="w-[154px] object-contain rounded-lg rounded-global"
                          alt=""
                        />
                      </div>
                      <div className="flex-1 text-center xl:text-left">
                        <Tooltip
                          title={
                            similarContent.title
                              ? similarContent.title
                              : similarContent.name
                          }
                        >
                          <p className="text-[15px] line-clamp-2">
                            {similarContent.title
                              ? similarContent.title
                              : similarContent.name}
                          </p>
                        </Tooltip>
                        <p className="text-[14px] text-[#ccc]">
                          {similarContent.release_date
                            ? similarContent.release_date
                            : similarContent.first_air_date}
                        </p>
                        <p className="text-[16px] text-yellow-400">
                          {formatNumber(similarContent.vote_average, 10)} &nbsp;
                          <FontAwesomeIcon icon={faStar} color="yellow" />
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {listSimilarMovie?.length ? (
              <div className="my-8 text-center">
                {isLoadMore ? (
                  <div className="flex justify-center">
                    <ReactLoading type="bubbles" color="white" height={40} />
                  </div>
                ) : (
                  <button
                    className={`bg-primarybg min-w-[120px] px-1 py-1 rounded-lg cursor-pointer text-white text-[16px] mb-8 ${
                      isLoadMore && "cursor-not-allowed pointer-events-none	"
                    } ${!isLoadMore ? "hover:scale-110 duration-150" : ""}`}
                    onClick={() => {
                      handleLoadMoreSimilar();
                    }}
                  >
                    {t("Load more")}
                  </button>
                )}
              </div>
            ) : (
              <div>
                <SkeletonCustom quantity={10} />
              </div>
            )}
          </div>
        ) : (
          <div className="h-[100%]">
            {isLoading ? (
              <Skeleton active paragraph={{ rows: 20 }} />
            ) : (
              <EpisodeTv
                handleChangeEpisode={handleChangeEpisode}
                dataEpisode={dataSeasonTv}
                currentSeason={season.currentSeason}
                currentEpisode={season.currentEpisode}
                setIsHiddenDrawer={setIsHiddenDrawer}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchMovieTv;
