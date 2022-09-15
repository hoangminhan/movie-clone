import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge } from "antd";
import { ButtonPlay, ImageCustom } from "components";
import { formatNumber, getImage } from "utils";

export const SimilarContent = ({ dataSimilar }) => {
  console.log(dataSimilar);
  return (
    <div className="flex flex-wrap gap-12 justify-center">
      {dataSimilar.map((similar, index) => {
        return (
          <div
            key={index}
            rounded-global
            className="rounded-global max-w-[185px] hover:scale-110 duration-300 delay-100 rounded-[6px] overflow-hidden"
          >
            {/* img */}
            <div className="relative group ">
              <ImageCustom
                src={getImage(similar.poster_path, "w185")}
                className="h-[278px]"
              />
              <p>
                <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2  hidden group-hover:block delay-250 hover:scale-110 duration-300">
                  <ButtonPlay size="middle" />
                </div>
              </p>

              {/* rating */}
              <div className="absolute top-[-8px] right-0">
                <Badge.Ribbon
                  color="#1890ff"
                  text={
                    <p className="rounded-[10px]  m-0 leading-6">
                      {formatNumber(similar.vote_average, 10)}
                      <span className="inline-block ml-1">
                        <FontAwesomeIcon icon={faStar} className="text-white" />
                      </span>
                    </p>
                  }
                />
              </div>
            </div>
            {/* content */}
            <div
              className="
            bg-[#2f2f2f]
            w-full
            h-[100px] text-center px-2 pt-[8px] pb-1
            "
            >
              <p className="line-clamp-2">
                {similar.title ? similar.title : similar.original_title}
              </p>
              <p className="">{similar.release_date}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
