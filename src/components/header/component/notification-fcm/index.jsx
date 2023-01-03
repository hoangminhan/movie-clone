import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Empty, Popover, Tooltip } from "antd";
import { UserContext } from "contexts";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getFirestore,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./styles.scss";
import styled from "styled-components";
import { t } from "i18next";
import ReactTimeAgo from "react-time-ago";
// const StyledPopover = styled(Popover)`
//   &.ant-popover {
//   }
//   &.ant-popover-content {
//     min-width: 350px;
//     max-width: 350px;
//     border-radius: 8px;
//     overflow: hidden;
//   }
//   .ant-popover-title {
//     font-size: 18px;
//     padding: 8px 16px;
//   }
//   &.ant-popover-inner-content {
//     padding: 0 !important;
//   }
// `;
const ContentPopover = ({
  dataContent,
  handleDeleteNotification,
  handleUpdateNotification,
}) => {
  const stateContext = useContext(UserContext);
  const { localeGlobal } = stateContext;

  const [globalLocale] = localeGlobal;
  return (
    <div className="max-h-[400px] overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-[#a09f9f] scrollbar-track-[#ffffff] scrollbar-h-5px">
      <ul className="pb-1">
        {dataContent?.map((data, index) => {
          return (
            <li
              className="py-[2px] relative mt-2 px-4 hover:bg-[#0000000d] group transition-all duration-150 ease-linear flex items-center cursor-pointer gap-4"
              key={data.noti_id}
              onClick={() => {
                handleUpdateNotification(data);
              }}
            >
              {/* new notification */}
              {!data?.isReview && (
                <p className="w-[6px] h-[6px] rounded-full bg-[#3d3dec] absolute left-[5px]"></p>
              )}
              <div className="flex-1 flex justify-between items-center">
                {/* content */}
                <div>
                  <Tooltip title={t(data?.title)}>
                    <div className="line-clamp-3 text-[15px] text-[#000000]">
                      {data?.description}
                    </div>
                  </Tooltip>
                  <div>
                    <ReactTimeAgo
                      className="text-[12px] text-[#8a8787]"
                      date={
                        data?.createAt?.seconds
                          ? new Date(data?.createAt?.seconds * 1000)
                          : ""
                      }
                      locale={globalLocale}
                    />
                  </div>
                </div>
                {/* close button */}
                <div
                  className="p-1 cursor-pointer"
                  onClick={() => {
                    handleDeleteNotification(data);
                  }}
                >
                  <Tooltip title={t("Delete notification")}>
                    <FontAwesomeIcon icon={faClose} />
                  </Tooltip>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const NotificationFCM = ({ children }) => {
  const [t] = useTranslation();

  // content notification

  // state
  const stateContext = useContext(UserContext);

  const { currentDataUser } = stateContext;
  const [dataUser] = currentDataUser;
  const [dataNoti, setDataNoti] = useState([]);

  // delete notification

  const handleDeleteNotification = async (data) => {
    const dbfireStore = getFirestore();
    const notiRef = doc(dbfireStore, "user", dataUser.uid);
    await updateDoc(notiRef, {
      notification: arrayRemove(data),
    });
  };

  // update status notification
  const handleUpdateNotification = async (dataUpdate) => {
    if (!dataUpdate.isReview) {
      const dbfireStore = getFirestore();
      const notiRef = doc(dbfireStore, "user", dataUser.uid);
      const newData = {
        ...dataUpdate,
        isReview: true,
      };
      try {
        await updateDoc(notiRef, {
          notification: arrayRemove(dataUpdate),
        });
        await updateDoc(notiRef, {
          notification: arrayUnion(newData),
        });
      } catch (error) {
        console.log("error", error);
      }
    }
  };
  // get data
  useEffect(() => {
    const getData = async () => {
      const dbfireStore = getFirestore();
      const querySnapsotUser = query(
        collection(dbfireStore, "user"),
        where("user_id", "==", dataUser.uid)
      );
      onSnapshot(querySnapsotUser, (results) => {
        results.forEach((docs) => {
          setDataNoti([...docs.data().notification]);
        });
      });
    };
    if (dataUser.uid) {
      getData();
    }
  }, [dataUser]);
  return (
    <div>
      <Popover
        content={
          dataNoti?.length ? (
            <ContentPopover
              dataContent={dataNoti}
              handleDeleteNotification={handleDeleteNotification}
              handleUpdateNotification={handleUpdateNotification}
            />
          ) : (
            <div className="py-4">
              <Empty />
            </div>
          )
        }
        placement="bottomLeft"
        title={t("Notification")}
        overlayClassName="movie-fcm"
        trigger="click"
        zIndex={999}
      >
        {children}
      </Popover>
    </div>
  );
};
