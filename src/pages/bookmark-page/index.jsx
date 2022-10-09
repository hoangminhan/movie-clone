import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import {
  faClose,
  faPenSquare,
  faStar,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Col, Collapse, message, Row, Skeleton, Tooltip } from "antd";
import { ImageCustom } from "components";
import { UserContext } from "contexts";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
  doc,
  updateDoc,
  deleteField,
  deleteDoc,
} from "firebase/firestore";
import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { formatNumber, getImage } from "utils";

const StyledCollapse = styled(Collapse)`
  &.ant-collapse {
    background-color: #333335;
    border-color: #333335;
  }
  .ant-collapse-content > .ant-collapse-content-box {
    background-color: #333335;
  }
  &.ant-collapse > .ant-collapse-item {
    border-bottom: none;
  }
`;
const { Panel } = Collapse;

const BookMarkedPage = () => {
  const db = getFirestore();
  const [dataFavorite, setDataFavorite] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const stateContext = useContext(UserContext);
  const { currentDataUser, currentTabGlobal } = stateContext;
  const [dataUser, setDataUser] = currentDataUser;
  const [tabGlobal, setTabGlobal] = currentTabGlobal;

  const navigate = useNavigate();
  const [currentOption, setCurrentOption] = useState("multi");
  const [t] = useTranslation();

  const filterOption = [
    { name: "All", value: "multi" },
    { name: "Movie", value: "movie" },
    { name: "Tv show", value: "tv" },
  ];
  useEffect(() => {
    if (dataUser.uid) {
      const getData = async () => {
        setIsLoading(true);
        let data = [];
        let dataQuery;
        if (currentOption === "multi") {
          dataQuery = query(
            collection(db, "bookmark"),
            where("user_id", "==", dataUser?.uid)
          );
        } else {
          dataQuery = query(
            collection(db, "bookmark"),
            where("user_id", "==", dataUser?.uid),
            where("type", "==", currentOption === "movie" ? "movie" : "tv")
          );
        }

        const querySnapshot = await getDocs(dataQuery);
        querySnapshot.forEach((item, index) => {
          if (item.data().id) {
            data.push({ ...item.data(), id_field: item.id });
          }
        });
        setDataFavorite([...data]);
        setIsLoading(false);
      };
      getData();
    }
  }, [dataUser, currentOption]);
  const [isEdit, setIsEdit] = useState(false);

  const handleDeleteFavorite = async (dataDelete) => {
    const itemDeleteRef = doc(db, "bookmark", dataDelete.id_field);
    deleteDoc(itemDeleteRef)
      .then((data) => {
        message.success("Delete success");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-[100vh]">
      {isLoading ? (
        <Skeleton active paragraph={{ rows: 20 }} />
      ) : (
        <Row gutter={[24, 24]} className="mt-8">
          <Col span={19}>
            {isEdit ? (
              <div className="mb-7">
                <p
                  className="group hover:cursor-pointer"
                  onClick={() => {
                    setIsEdit(false);
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} className=" text-white" />
                  <span className="ml-1">{t("Remove all")}</span>
                </p>
              </div>
            ) : (
              <div className="mb-7">
                <p
                  className="group hover:cursor-pointer hover:underline"
                  onClick={() => {
                    setIsEdit(true);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    className="group-hover:underline"
                  />
                  <span className="ml-1">{t("Edit")}</span>
                </p>
              </div>
            )}
            <div className="flex gap-10 flex-wrap">
              {dataFavorite.map((favorite, index) => {
                return (
                  <div
                    key={favorite.id}
                    className="max-w-[185px] relative flex flex-col cursor-pointer hover:scale-110 hover:duration-200"
                  >
                    <ImageCustom
                      src={getImage(favorite.url, "w342")}
                      className="rounded-md flex-1"
                      onClick={() => {
                        if (favorite.type === "movie") {
                          setTabGlobal("/");
                          sessionStorage.setItem("currentTab", "/");
                        } else {
                          setTabGlobal("tab-tv-show");
                          sessionStorage.setItem("currentTab", "tab-tv-show");
                        }
                        navigate(`/${favorite.type}/${favorite.id}`);
                      }}
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
                    <div
                      className={`absolute top-[-15px] ${
                        isEdit ? "block" : "hidden"
                      }`}
                    >
                      <Tooltip title={t("Click to delete")}>
                        <p
                          className=" w-[24px] h-[24px] hover:scale-110 hover:duration-150"
                          onClick={() => {
                            handleDeleteFavorite(favorite);
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faClose}
                            className="w-[24px] h-[24px] bg-[red] rounded-full"
                          />
                        </p>
                      </Tooltip>
                    </div>
                  </div>
                );
              })}
            </div>
          </Col>
          <Col span={5}>
            <StyledCollapse
              defaultActiveKey={["1"]}
              // onChange={onChange}
              expandIconPosition="end"
            >
              <Panel
                header={
                  <div className="">
                    <p className="text-white text-[20px] font-medium">
                      {t("Search results")}
                    </p>
                  </div>
                }
                key="1"
              >
                <div className="text-[white]">
                  <div className="mt-2 ">
                    {filterOption.map((item, index) => {
                      return (
                        <div
                          key={item.value}
                          className={`text-[18px] mb-3 text-center hover:bg-[#49494b] py-1 rounded-md cursor-pointer ${
                            item.value === currentOption ? "bg-[#49494b]" : ""
                          }`}
                          onClick={() => {
                            if (currentOption === item.value) return;
                            else {
                              setCurrentOption(item.value);
                              // handleChangeFilterType(item.value);
                            }
                          }}
                        >
                          {item.name}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Panel>
            </StyledCollapse>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default BookMarkedPage;
