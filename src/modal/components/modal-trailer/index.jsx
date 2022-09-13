import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spin } from "antd";
import { useModal } from "hooks";
import { useHomePage } from "hooks/use-homepage";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { embedMovieTrailer } from "utils";

export const ModalTrailer = ({ idMovie, currentUrl }) => {
  const { handleGetDetailMovie } = useHomePage();
  const { handleToggleModal, handleToggleAutoBanner } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);

      await handleGetDetailMovie(idMovie, {
        api_key: process.env.REACT_APP_API_KEY,
      });
      setIsLoading(false);
    };
    getData();
  }, [idMovie]);
  return (
    <div className="relative flex justify-center">
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
          {/* <Skeleton
            paragraph={{
              rows: 8,
            }}
          /> */}
          <Spin />
        </div>
      )}
    </div>
  );
};
