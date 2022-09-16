import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Skeleton } from "antd";
import { ImageCustom } from "components";
import { useHomePage } from "hooks/use-homepage";
import { embedMovie, getImage } from "utils";

export const Hero = ({ dataDetail, handleChangeUrl }) => {
  console.log({ dataDetail });
  const { isLoading } = useHomePage();
  return (
    <div className="max-h-[500px]">
      <div className="max-h-[500px] w-full relative">
        {isLoading ? (
          <Skeleton />
        ) : (
          <ImageCustom
            src={getImage(dataDetail.backdrop_path, "w1280")}
            className="object-fill max-h-[500px] w-full rounded-b-lg"
          />
        )}

        {/* poster */}
        <div className="absolute bottom-[-15%] left-[15%]">
          <ImageCustom
            src={getImage(dataDetail.poster_path, "w185")}
            className="rounded-lg"
          />
        </div>

        {/* name phim */}
        <div className="absolute  left-[30%] bottom-[20%] max-w-[500px] ">
          <p className="text-white text-[40px] font-medium drop-shadow-2xl shadow-[red] line-clamp-2  p-5 ml-3 pr-0  leading-10">
            {dataDetail?.title ? dataDetail?.title : dataDetail?.original_title}
          </p>
        </div>

        {/* genres */}
        <div className="absolute left-[30%] bottom-[8%] p-5 ml-3 flex">
          {dataDetail?.genres?.map((genre, index) => {
            return (
              <p
                key={index}
                className="py-1 px-3 border-solid border-white border-[1px] mr-3 rounded-3xl text-white text-[18px] uppercase cursor-pointer hover:scale-110 duration-150"
              >
                {genre.name}
              </p>
            );
          })}
        </div>
        {/* watch */}

        <div
          className="absolute bottom-3 right-3"
          onClick={() => {
            console.log("xem");

            handleChangeUrl(embedMovie(dataDetail.id));
          }}
        >
          <div className="flex items-center justify-center px-4 py-3 bg-primary text-white rounded-[20px] hover:scale-110 duration-200 cursor-pointer">
            <p className="w-5 h-5 bg-[red] flex items-center justify-center p-4 rounded-full">
              <FontAwesomeIcon icon={faPlay} fontSize="16px" />
            </p>
            <p className="ml-2">Watch now</p>
          </div>
        </div>
      </div>
    </div>
  );
};