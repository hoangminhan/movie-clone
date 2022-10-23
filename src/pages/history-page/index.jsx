import React, { useContext } from "react";

import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faClose, faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Col, Collapse, Empty, Row, Tooltip } from "antd";
import { ModalConfirm, SkeletonCustom } from "components";
import { UserContext } from "contexts";
import {
  collection,
  getFirestore,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { formatNumber, getImage } from "utils";
import { useFirebaseRealTime, useTitle } from "hooks";

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

const HistoryPage = () => {
  const db = getFirestore();
  const [dataHistory, setDataHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const stateContext = useContext(UserContext);
  const { currentDataUser, currentTabGlobal } = stateContext;
  const [dataUser, setDataUser] = currentDataUser;
  const [tabGlobal, setTabGlobal] = currentTabGlobal;

  const [showModal, setShowModal] = useState(false);
  const [dataDeleteOne, setDataDeleteOne] = useState({});
  const [typeDelete, setTypeDelete] = useState("one");

  const navigate = useNavigate();
  const [currentOption, setCurrentOption] = useState("multi");
  const [t] = useTranslation();
  const { handleChangeTitle } = useTitle();

  const filterOption = [
    { name: "All", value: "multi" },
    { name: "Movie", value: "movie" },
    { name: "Tv show", value: "tv" },
  ];

  useEffect(() => {
    handleChangeTitle(t("History"));
  }, []);

  useEffect(() => {
    if (dataUser.uid) {
      setIsLoading(true);
      const getData = async () => {
        const dbfireStore = getFirestore();

        const queryReplyReaction = query(
          collection(dbfireStore, "user"),
          where("user_id", "==", dataUser?.uid)
        );
        onSnapshot(queryReplyReaction, (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (currentOption === "multi") {
              setDataHistory([...doc.data().history]);
            } else if (currentOption === "movie") {
              setDataHistory([
                ...doc.data().history.filter((item) => item.type === "movie"),
              ]);
            } else {
              setDataHistory([
                ...doc.data().history.filter((item) => item.type === "tv"),
              ]);
            }
          });
        });
      };
      getData();
      setIsLoading(false);
    }
  }, [dataUser, currentOption, db]);
  const [isEdit, setIsEdit] = useState(false);
  const {
    handleDeleteOneBookmarkOrHistory,
    handleDeleteAllBookmarkOrHistory,
  } = useFirebaseRealTime();

  const handleClickDelete = (dataHistory, type) => {
    setIsEdit(false);
    setShowModal(true);
    if (type === "one") {
      setDataDeleteOne({ ...dataHistory });
      setTypeDelete(type);
    } else {
      setTypeDelete(type);
    }
  };
  // approve delete
  const handleClickAccept = async () => {
    if (typeDelete === "one") {
      await handleDeleteOneBookmarkOrHistory(
        dataDeleteOne,
        "user",
        dataUser.uid,
        "history"
      );
      setDataDeleteOne({});
    } else {
      await handleDeleteAllBookmarkOrHistory(
        "user",
        dataUser.uid,
        currentOption,
        "history"
      );
    }
    setShowModal(false);
  };

  // handle Cancel delete
  const handleClickCancel = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="min-h-[100vh]">
        {isLoading ? (
          // <Skeleton active paragraph={{ rows: 20 }} />
          <SkeletonCustom />
        ) : (
          <>
            <Row gutter={[24, 24]} className="mt-8">
              {dataHistory?.length ? (
                <Col span={19}>
                  <>
                    {isEdit ? (
                      <div className="mb-7 flex items-center gap-4">
                        <div
                          className="group hover:cursor-pointer flex"
                          onClick={() => {
                            setIsEdit(false);
                          }}
                        >
                          <p className="">
                            <FontAwesomeIcon
                              icon={faClose}
                              className=" text-[#ccc] text-[22px] border-[#ccc] border-solid border-[1px] rounded-full w-[18px] h-[18px] "
                            />
                          </p>
                          <span className="ml-1 text-[22px]">
                            {t("Cancel")}
                          </span>
                        </div>

                        <div
                          className="group hover:cursor-pointer"
                          onClick={() => {
                            handleClickDelete(dataHistory, "all");
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            className=" text-[#ccc] text-[22px]"
                          />
                          <span className="ml-1 text-[22px]">
                            {t("Remove all")}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="mb-7">
                        <div
                          className="group hover:cursor-pointer hover:underline"
                          onClick={() => {
                            setIsEdit(true);
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            className="group-hover:underline text-[22px]"
                          />
                          <span className="ml-1 text-[22px]">{t("Edit")}</span>
                        </div>
                      </div>
                    )}
                  </>

                  <div className="flex gap-10 flex-wrap">
                    {dataHistory.map((history, index) => {
                      return (
                        <div
                          key={history.id}
                          className="max-w-[185px] relative flex flex-col cursor-pointer hover:scale-110 hover:duration-200"
                        >
                          <img
                            alt=""
                            src={getImage(history.url, "w342")}
                            className="rounded-md flex-1"
                            onClick={() => {
                              if (history.type === "movie") {
                                setTabGlobal("/");
                                sessionStorage.setItem("currentTab", "/");
                              } else {
                                setTabGlobal("tab-tv-show");
                                sessionStorage.setItem(
                                  "currentTab",
                                  "tab-tv-show"
                                );
                              }
                              navigate(`/${history.type}/${history.id}`);
                            }}
                          />
                          <div>
                            <p className="text-[18px] text-center line-clamp-1">
                              {history.name}
                            </p>
                          </div>
                          <div className="absolute top-[-8px] right-[0px] text-[13px]">
                            <Badge.Ribbon
                              color="#1890ff"
                              text={
                                <p className="rounded-[10px]  m-0 leading-6">
                                  {formatNumber(history.rate, 10)}
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
                            className={`absolute top-[-15px] left-[50%] -translate-x-1/2 ${
                              isEdit ? "block" : "hidden"
                            }`}
                          >
                            <Tooltip title={t("Click to delete")}>
                              <p
                                className=" hover:scale-110 hover:duration-150"
                                onClick={() => {
                                  handleClickDelete(history, "one");
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
              ) : (
                <Col span={19}>
                  <div className="h-[100vh] flex justify-center items-center">
                    <Empty />
                  </div>
                </Col>
              )}

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
                                item.value === currentOption
                                  ? "bg-[#49494b]"
                                  : ""
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
          </>
        )}
      </div>

      {/* modal confirm */}

      <ModalConfirm
        showModal={showModal}
        handleClickCancel={handleClickCancel}
        handleClickAccept={handleClickAccept}
      />
    </>
  );
};

export default HistoryPage;
