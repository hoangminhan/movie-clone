import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Skeleton } from "antd";
import { ImageCustom } from "components";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { formatNumber, getImage } from "utils";

const BookMarkedPage = () => {
  const db = getFirestore();
  const [dataFavorite, setDataFavorite] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      let data = [];
      const querySnapshot = await getDocs(collection(db, "bookmark"));
      querySnapshot.forEach((item, index) => {
        console.log(item.data());
        if (item.data().id) {
          data.push(item.data());
        }
      });
      setDataFavorite([...data]);
      setIsLoading(false);
    };
    getData();
  }, []);
  console.log({ dataFavorite });

  return (
    <div className="min-h-[100vh]">
      {isLoading ? (
        <Skeleton active paragraph={{ rows: 20 }} />
      ) : (
        <div className="flex gap-10 flex-wrap mt-8">
          {dataFavorite.map((favorite, index) => {
            return (
              <div
                key={favorite.id}
                className="max-w-[185px] relative flex flex-col cursor-pointer"
              >
                <ImageCustom
                  src={getImage(favorite.url, "w342")}
                  className="rounded-md flex-1"
                />
                <div>
                  <p className="text-[18px] text-center line-clamp-1">
                    {favorite.title}
                  </p>
                </div>
                <div className="absolute top-[-8px] right-[0px] text-[13px]">
                  <Badge.Ribbon
                    color="#1890ff"
                    text={
                      <p className="rounded-[10px]  m-0 leading-6">
                        {formatNumber(favorite.rate, 10)}
                        <span className="inline-block ml-1">
                          <FontAwesomeIcon
                            icon={faStar}
                            className="text-white"
                          />
                        </span>
                      </p>
                    }
                  ></Badge.Ribbon>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BookMarkedPage;
