import { ImageCustom } from "components";
import { UsePeople } from "hooks";
import { useHomePage } from "hooks/use-homepage";
import { t } from "i18next";
import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { formatNumber, getImage } from "utils";

const CastPage = () => {
  const params = useParams();
  const { idCast } = params;
  const { dataDetailCast, handleGetDetailCasts } = UsePeople();
  // const { handleGetDetailCasts, dataDetailCast } = useHomePage();
  useEffect(() => {
    const locale = sessionStorage.getItem("currentLocale") || "vi-VN";

    handleGetDetailCasts(idCast, {
      api_key: process.env.REACT_APP_API_KEY,
    });
  }, []);
  return (
    <>
      <div className="px-5 py-10 flex  justify-center">
        <div className="w-[1000px]">
          <h3 className="text-center uppercase text-white text-[35px] mb-8">
            {dataDetailCast.name}
          </h3>
          <div className="flex justify-start gap-4">
            <div className="">
              <ImageCustom
                src={getImage(dataDetailCast.profile_path, "w185")}
                width="185px"
                className="rounded-lg"
              />
            </div>
            <div className="grow-[1]">
              <h3 className="text-white">{t("Information")}: </h3>
              <p>
                {t("Homepage")}:
                {dataDetailCast.homepage ? (
                  <a href={dataDetailCast.homepage}>
                    {dataDetailCast.homepage}
                  </a>
                ) : (
                  <span>{t("Homepage not found")}</span>
                )}
              </p>
              <p>
                {t("Birthday")}: <span>{dataDetailCast.birthday}</span>
              </p>
              <p>
                {t("Place of birthday")}:
                <span>{dataDetailCast.place_of_birth}</span>
              </p>

              <p>
                {t("Gender")}:{" "}
                <span>
                  {dataDetailCast.gender === 2 ? t("Male") : "Female"}
                </span>
              </p>
              <p>
                {t("Popularity ")}:
                <span>{formatNumber(dataDetailCast.popularity, 100)}</span>
              </p>
              <p>
                {t("Known For ")}:
                <span>{dataDetailCast.known_for_department}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="px-5 pb-8  flex justify-center">
        <div className="w-[1000px]">
          <p>{}</p>
        </div>
      </div>
      <div className="px-5 pb-8  flex justify-center">
        <div className="w-[1000px]">
          <h3 className="text-white ">
            {dataDetailCast.name} {t("Biography")}:
          </h3>
          <p>{dataDetailCast.biography}</p>
        </div>
      </div>
    </>
  );
};

export default CastPage;
