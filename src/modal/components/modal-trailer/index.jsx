import {
  faClose,
  faStar,
  faThumbsDown,
  faThumbsUp,
  faThumbTack,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Modal, Row, Spin, Tooltip } from "antd";
import { ButtomCustom, ButtonAddList, SimilarContent } from "components";
import { useHomePage } from "hooks/use-homepage";
import { t } from "i18next";
import { useState } from "react";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
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
  const { handleGetDetailMovie, listCastsMovie } = useHomePage();
  const [isLoading, setIsLoading] = useState(false);
  const currentType =
    sessionStorage.getItem("currentTab") === "/" ? "movie" : "tv";

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
        <div className="absolute right-[-18px] top-[-18px]">
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
                <ButtomCustom title="Play" nameIcon="iconPlay" />
              </Link>
            </div>
            {/* add playlist */}
            <div className="ml-8 cursor-pointer hover:scale-110 duration-200">
              <ButtonAddList />
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
            {/* <div className="group ml-4 cursor-pointer bg-transparent max-w-[150px]  h-full hover:scale-110 duration-200  flex gap-3">
            <div className="peer-hover:block  translate-x-[130%] group-hover:translate-x-0 duration-300 delay-250">
              <Tooltip title="Dis Like">
                <p className="bg-[white] w-10 h-10 flex items-center justify-center rounded-full">
                  <FontAwesomeIcon icon={faThumbsDown} color="black" />
                </p>
              </Tooltip>
            </div>
            <div>
              <Tooltip title="Like">
                <p className="bg-[white] w-10 h-10 flex items-center justify-center rounded-full">
                  <FontAwesomeIcon icon={faThumbsUp} color="black" />
                </p>
              </Tooltip>
            </div>
            <div className="peer-hover:block translate-x-[-130%] group-hover:translate-x-0 duration-300 delay-250">
              <Tooltip title="Perfect">
                <p className="bg-[white] w-10 h-10 flex items-center justify-center rounded-full">
                  <FontAwesomeIcon icon={faThumbsUp} color="black" />
                </p>
              </Tooltip>
            </div>
          </div> */}
          </Row>
          <Row
            gutter={[32, 16]}
            className="border-solid border-[1px] border-[#ccc] py-4"
          >
            <Col span={12}>
              {/* run time */}
              <div className="flex items-center justify-between gap-4">
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
              <p className="mt-2">
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
              </p>
            </Col>
            <Col span={12}>
              <div>
                <div className="flex">
                  <span className="text-[16px] mr-2">{t("Cast")}:</span>
                  <p className="line-clamp-2">
                    {listCastsMovie?.map((cast, index) => {
                      const currentType =
                        sessionStorage.getItem("currentTab") === "/"
                          ? "movie"
                          : "tv";
                      return index < listCastsMovie.length - 1 ? (
                        <Link
                          key={index}
                          to={`/cast/${cast.id}/${currentType}`}
                        >{`${cast.name},  `}</Link>
                      ) : (
                        // cast.name
                        <Link
                          to={`/cast/${cast.id}/${currentType}`}
                        >{`${cast.name}`}</Link>
                      );
                    })}
                  </p>
                </div>
                <div className="mt-2 flex">
                  <span className="text-[16px] mr-2">{t("Genres")}:</span>
                  <div className="flex">
                    {dataDetail?.genres?.map((genre, index) => {
                      const currentType =
                        sessionStorage.getItem("currentTab") === "/"
                          ? "movie"
                          : "tv";
                      return (
                        <div key={index} className="flex">
                          <Link to={`/genres/${genre.id}/${currentType}`}>
                            {index < dataDetail.genres.length - 1 ? (
                              <span>{genre.name},&nbsp; </span>
                            ) : (
                              <span>{genre.name}</span>
                            )}
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <p className="mt-2">
                  <span className="text-[16px] mr-2">
                    {t("Production companies")}:
                  </span>
                  <span>
                    {dataDetail?.production_companies?.map((company, index) => {
                      return index < dataDetail.production_companies.length - 1
                        ? `${company.name},  `
                        : company.name;
                    })}
                  </span>
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
              <h2 className="text-white text-[30px] mt-4">
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
