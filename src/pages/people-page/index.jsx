import { Card } from "antd";
import { ImageCustom } from "components";
import { UsePeople } from "hooks";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getImage } from "utils";
const { Meta } = Card;

const PeoplePage = () => {
  const {
    handleGetListCastPopular,
    listPopularPeople,
    detailPopular,
  } = UsePeople();
  const locale = sessionStorage.getItem("currentLocale") || "vi-VN";

  useEffect(() => {
    handleGetListCastPopular({
      api_key: process.env.REACT_APP_API_KEY,
      language: locale,
    });
  }, []);
  console.log({ listPopularPeople, detailPopular });
  return (
    <div className="flex flex-wrap gap-10 justify-evenly">
      {listPopularPeople.map((people, index) => {
        return (
          <Link to={`/cast/${people.id}`} key={index}>
            <div className="">
              <Card
                hoverable
                style={{
                  width: 240,
                }}
                cover={
                  <ImageCustom
                    alt="people"
                    src={getImage(people.profile_path, "w185")}
                  />
                }
              >
                <Meta title={people.name} description="www.instagram.com" />
              </Card>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default PeoplePage;
