import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row, Spin } from "antd";
import Item from "antd/lib/list/Item";
import { ButtomCustom, SimilarContent } from "components";
import { useModal } from "hooks";
import { useHomePage } from "hooks/use-homepage";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import ShowMoreText from "react-show-more-text";
import { embedMovieTrailer, formatNumber } from "utils";
import "./style.scss";

export const ModalTrailer = ({ currentUrl, dataDetail, dataSimilar }) => {
  const { handleGetDetailMovie, listCastsMovie } = useHomePage();
  const { handleToggleModal, handleToggleAutoBanner } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  console.log({ listCastsMovie });

  return (
    <div className="relative flex justify-center flex-col">
      {/* button close */}
      <div className="absolute right-[-18px] top-[-18px]">
        <div
          className="px-[14px] py-[8px] bg-[#ccc] rounded-full cursor-pointer"
          onClick={() => {
            handleToggleModal({ type: "" });
            handleToggleAutoBanner(false);
          }}
        >
          <FontAwesomeIcon
            icon={faClose}
            className="text-[22px] text-[#989898]"
          />
        </div>
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
      <div className="mt-[32px] text-white">
        <Row>
          <div className="mb-8">
            <ButtomCustom title="Play" nameIcon="iconPlay" />
          </div>
        </Row>
        <Row gutter={[32, 16]}>
          <Col span={12}>
            {/* run time */}
            <div className="flex items-center gap-4">
              <p>
                <span>Run time: </span>
                {dataDetail.runtime} phút
              </p>
              <p>
                <span>Release date: </span>
                {dataDetail.release_date}
              </p>
              <p>
                <span>Rating: </span>
                {formatNumber(dataDetail.vote_average, 10)}
              </p>
            </div>
            {/* overview */}
            <p className="mt-4">
              <span className="mr-2">Overview:</span>
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
                <p>{dataDetail.overview}</p>
              </ShowMoreText>
            </p>
          </Col>
          <Col span={12}>
            <div>
              <p className="line-clamp-2">
                <span className="text-[16px] mr-2">Diễn viên:</span>
                <span>
                  {listCastsMovie.map((cast, index) => {
                    return index < listCastsMovie.length - 1
                      ? `${cast.name},  `
                      : cast.name;
                  })}
                </span>
              </p>
              <p className="mt-4">
                <span className="text-[16px] mr-2">Thể loại:</span>
                <span>
                  {dataDetail.genres.map((genre, index) => {
                    return index < dataDetail.genres.length - 1
                      ? `${genre.name},  `
                      : genre.name;
                  })}
                </span>
              </p>
              <p className="mt-4">
                <span className="text-[16px] mr-2">Production companies:</span>
                <span>
                  {dataDetail.production_companies.map((company, index) => {
                    return index < dataDetail.production_companies.length - 1
                      ? `${company.name},  `
                      : company.name;
                  })}
                </span>
              </p>
              <p className="mt-4">
                <span className="text-[16px] mr-2">Collection:</span>
                <span>{dataDetail.belongs_to_collection.name}</span>
              </p>
            </div>
          </Col>
        </Row>
        {/*  similar content */}
        <Row>
          <div>
            <h2 className="text-white text-[30px] mt-4">Similar Content</h2>
            <div className="mt-8">
              <SimilarContent dataSimilar={dataSimilar} />
            </div>
          </div>
        </Row>
      </div>
    </div>
  );
};
