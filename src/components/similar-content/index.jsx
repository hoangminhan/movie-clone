import { Col, Row } from "antd";
import { ButtonPlay, ImageCustom } from "components";
import React from "react";
import { getImage } from "utils";
import ShowMoreText from "react-show-more-text";

export const SimilarContent = ({ dataSimilar }) => {
  console.log(dataSimilar);
  return (
    <div className="flex flex-wrap gap-12 justify-center">
      {dataSimilar.map((similar, index) => {
        return (
          <div className="max-w-[185px] ">
            {/* img */}
            <p className="relative group">
              <ImageCustom
                src={getImage(similar.poster_path, "w185")}
                className="h-[278px]"
              />
              <p>
                <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2  hidden group-hover:block delay-250 hover:scale-110 duration-300">
                  <ButtonPlay size="middle" />
                </div>
              </p>
            </p>
            {/* content */}
            <p
              className="
            bg-[#2f2f2f]
            w-full
            "
            >
              <p className="h-[100px] overflow-y-auto px-2 py-[2px]"></p>
            </p>
            {/* button play */}
          </div>
        );
      })}
    </div>
  );
};
