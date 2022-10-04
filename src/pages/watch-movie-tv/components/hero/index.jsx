import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Skeleton, Tooltip } from "antd";
import iconImg from "assets";
import { ButtonAddList, ImageCustom } from "components";
import { useHomePage } from "hooks/use-homepage";
import { t } from "i18next";
import { Link } from "react-router-dom";
import { embedMovie, getImage } from "utils";

export const Hero = ({ dataDetail, handleChangeUrl, isLoadingDetail }) => {
  console.log({ dataDetail });
  const { isLoading } = useHomePage();
  const executeScroll = () => {
    const elementToScroll = document.getElementById("movie-id");
    elementToScroll.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="max-h-[500px]">
      <Skeleton active round loading={isLoadingDetail} paragraph={{ rows: 17 }}>
        <div className="max-h-[500px] w-full relative">
          <ImageCustom
            src={
              getImage(dataDetail.backdrop_path, "w1280").includes("null")
                ? iconImg.Img404Backdrop
                : getImage(dataDetail.backdrop_path, "w1280")
            }
            className="object-fill max-h-[500px] w-full rounded-b-lg"
          />

          {/* poster */}
          <div className="absolute bottom-[-15%] left-[15%] max-w-[185px]">
            <ImageCustom
              src={
                getImage(dataDetail.poster_path, "w185").includes("null")
                  ? iconImg.Img404
                  : getImage(dataDetail.poster_path, "w185")
              }
              className="rounded-global"
            />
          </div>

          {/* add list */}
          <div className="absolute right-2 top-2 ml-6 cursor-pointer hover:scale-110 duration-200">
            <ButtonAddList />
          </div>

          {/* name phim */}
          <div className="absolute  left-[30%] bottom-[20%] max-w-[500px] ">
            <p className="text-white text-[40px] font-medium drop-shadow-2xl shadow-[red] line-clamp-2  p-5 ml-3 pr-0  leading-10 stroke-text">
              {dataDetail?.title ? dataDetail?.title : dataDetail?.name}
            </p>
          </div>

          {/* genres */}
          <div className="absolute left-[30%] bottom-[8%] p-5 ml-3 flex">
            {dataDetail?.genres?.map((genre, index) => {
              const currentType =
                sessionStorage.getItem("currentTab") === "/" ? "movie" : "tv";
              return (
                <Tooltip title={genre.name} key={index}>
                  <Link
                    to={`/genres/${genre.id}-${genre.name}/${currentType}`}
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
      </Skeleton>
    </div>
  );
};
