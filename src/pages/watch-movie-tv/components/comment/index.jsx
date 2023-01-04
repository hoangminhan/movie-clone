import {
  Avatar,
  Comment,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Popover,
  Skeleton,
  Tooltip,
} from "antd";
import { UserContext } from "contexts";
import { ReactionBarSelector } from "@charkour/react-reactions";

import {
  arrayRemove,
  arrayUnion,
  doc,
  getFirestore,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import ReactTimeAgo from "react-time-ago";
import { uid } from "uid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import {
  handleFilterReactionOfComment,
  handleFilterReactionOfReply,
  handleGenerateTitleReaction,
  handleShowReactionOfComment,
} from "./utils-comment";
import { useNotification } from "hooks";
import { AVATAR_EMPTY } from "constant";

const { TextArea } = Input;

export const CommentMovie = ({
  dataComment,
  dataUser,
  idDetail,
  currentKey,
  dataReply,
  nameCurrentUser,
  urlImgUser,
  handleHideReply,
  handleHideComment,
  lenghtShow,
  handleChangeQuantityComment,
  dataReaction,
  dataReplyReaction,
  isLoadingComment,
}) => {
  const stateContext = useContext(UserContext);
  const { localeGlobal } = stateContext;

  const [globalLocale] = localeGlobal;

  const { comment: commentList } = dataComment;
  const [t] = useTranslation();

  const [formValue] = Form.useForm();
  const [formReply] = Form.useForm();
  const [formUpdateComment] = Form.useForm();
  const [formUpdateReply] = Form.useForm();

  const [valueComment, setValueComment] = useState("");

  const replyRef = useRef();
  const repUpdateRely = useRef();
  const repUpdateComment = useRef();

  const [commentSelect, setCommentSelect] = useState();
  const [valueCommentUpdate, setValueCommentUpdate] = useState();
  const [commentSelectUpdate, setCommentSelectUpdate] = useState();
  const [indexUpdate, setIndexUpdate] = useState();
  const [valueReplyUpdate, setValueReplyUpdate] = useState();
  const [replySelectUpdate, setReplySelectUpdate] = useState();
  const [indexUpdateReply, setIndexUpdateReply] = useState();
  const [currentReplyPosition, setCurrentReplyPosition] = useState();
  const [dataModal, setDataModal] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const accessToken = localStorage.getItem("accessToken") || "";

  const { handlePopupNotification } = useNotification();
  const findReactionOfComment = (dataReaction, comment) => {
    return dataReaction?.reaction?.find(
      (reaction) =>
        reaction?.id_comment === comment?.id_comment &&
        dataUser?.uid === reaction?.user_id
    );
  };
  const handleCheckIsUserReaction = (dataReaction, comment) => {
    const result = dataReaction?.reaction?.find((reaction) => {
      return (
        reaction?.user_id === dataUser?.uid &&
        comment?.id_comment === reaction?.id_comment
      );
    });
    return Object.keys(result || {}).length ? true : false;
  };
  const findReactionOfReply = (dataReplyReaction, dataReply) => {
    return dataReplyReaction?.reaction_reply?.find(
      (reply) =>
        reply?.id_reply === dataReply?.id_reply &&
        dataUser?.uid === reply?.user_id
    );
  };
  const handleCheckIsUserReply = (dataReplyReaction, dataReply) => {
    const result = dataReplyReaction?.reaction_reply?.find((reply) => {
      return (
        reply?.user_id === dataUser?.uid &&
        dataReply?.id_reply === reply?.id_reply
      );
    });
    return Object.keys(result || {}).length ? true : false;
  };

  const handleSubmitComment = async (value) => {
    const accessToken = localStorage.getItem("accessToken") || "";
    if (Boolean(accessToken)) {
      const dbfireStore = getFirestore();

      const commentRef = doc(dbfireStore, "detail", currentKey || idDetail);
      const { value_comment } = value;
      const dataAdd = {
        user_id: dataUser.uid,
        user_name: nameCurrentUser,
        user_url: urlImgUser || "",
        content_comment: value_comment,
        createAt: Timestamp.fromDate(new Date()),
        id_comment: uid(16),
      };
      formValue.resetFields();
      setValueComment("");

      await updateDoc(commentRef, {
        comment: arrayUnion(dataAdd),
      });
    } else {
      handlePopupNotification(
        "You need to login to perform this function",
        "warning"
      );
    }
  };

  const handleAddReaction = async (value, idCommentReaction) => {
    const accessToken = localStorage.getItem("accessToken") || "";
    if (Boolean(accessToken)) {
      const dbfireStore = getFirestore();

      const ReactionRef = doc(dbfireStore, "reaction", currentKey || idDetail);
      const dataAdd = {
        user_id: dataUser.uid,
        user_name: nameCurrentUser,
        user_url: urlImgUser || "",
        reaction_value: value,
        createAt: Timestamp.fromDate(new Date()),
        id_comment: idCommentReaction,
        id_reaction: uid(16),
      };
      if (!dataReaction.reaction.length) {
        await updateDoc(ReactionRef, {
          reaction: arrayUnion(dataAdd),
        });
      } else {
        const checkExistReaction = dataReaction.reaction.find(
          (item) =>
            item.user_id === dataUser.uid &&
            item.id_comment === idCommentReaction
        );
        if (checkExistReaction) {
          updateDoc(ReactionRef, {
            reaction: arrayRemove(checkExistReaction),
          });
          updateDoc(ReactionRef, {
            reaction: arrayUnion(dataAdd),
          });
        } else {
          await updateDoc(ReactionRef, {
            reaction: arrayUnion(dataAdd),
          });
        }
      }
    } else {
      handlePopupNotification(
        "You need to login to perform this function",
        "warning"
      );
    }
  };
  // add reaction reply
  const handleAddReactionReply = async (value, idReplyReaction) => {
    // debugger;
    const dbfireStore = getFirestore();

    const ReplyReactionRef = doc(dbfireStore, "reaction_reply", idDetail);
    const dataAdd = {
      user_id: dataUser.uid,
      user_name: nameCurrentUser,
      user_url: urlImgUser || "",
      reply_reaction_value: value,
      createAt: Timestamp.fromDate(new Date()),
      id_reply: idReplyReaction,
      id_reply_reaction: uid(16),
    };
    if (!dataReplyReaction.reaction_reply.length) {
      await updateDoc(ReplyReactionRef, {
        reaction_reply: arrayUnion(dataAdd),
      });
    } else {
      const checkExistReaction = dataReplyReaction.reaction_reply.find(
        (item) =>
          item.user_id === dataUser.uid && item.id_reply === idReplyReaction
      );
      if (checkExistReaction) {
        updateDoc(ReplyReactionRef, {
          reaction_reply: arrayRemove(checkExistReaction),
        });
        updateDoc(ReplyReactionRef, {
          reaction_reply: arrayUnion(dataAdd),
        });
      } else {
        await updateDoc(ReplyReactionRef, {
          reaction_reply: arrayUnion(dataAdd),
        });
      }
    }
  };

  const onFinishFailed = (value) => {};

  const handleConfirmDelete = async (data, type) => {
    const dbfireStore = getFirestore();
    const commentRef = doc(dbfireStore, "detail", idDetail);

    const replyRef = doc(dbfireStore, "reply", idDetail);

    if (type === "comment") {
      const findAllReply = dataReply.reply.filter(
        (item) => item.id_comment === data.id_comment
      );

      await updateDoc(commentRef, {
        comment: arrayRemove(data),
      });
      findAllReply.forEach((item) => {
        updateDoc(replyRef, {
          reply: arrayRemove(item),
        });
      });

      message.success("delete success");
    } else {
      updateDoc(replyRef, {
        reply: arrayRemove(data),
      });
      message.success("delete success");
    }
  };
  const handleCancelDelete = (e) => {};

  const handleSubmitUpdateComment = async (value) => {
    const dbfireStore = getFirestore();

    const commentRef = doc(dbfireStore, "detail", currentKey || idDetail);
    const dataUpdate = {
      ...commentSelectUpdate,
      content_comment: valueCommentUpdate,
    };
    formUpdateComment.resetFields();
    setIndexUpdate("");

    updateDoc(commentRef, {
      comment: arrayRemove(commentSelectUpdate),
    });
    updateDoc(commentRef, {
      comment: arrayUnion(dataUpdate),
    });
  };

  // add reply

  const handleAddReply = async (value) => {
    const dbfireStore = getFirestore();

    const { value_reply } = value;

    const commentRef = doc(dbfireStore, "reply", currentKey || idDetail);

    const dataAdd = {
      user_id: dataUser.uid,
      user_name: nameCurrentUser,
      user_url: urlImgUser || "",
      content_reply: value_reply,
      createAt: Timestamp.fromDate(new Date()),
      id_comment: commentSelect,
      id_reply: uid(16),
    };
    formValue.resetFields();
    setValueComment("");

    updateDoc(commentRef, {
      reply: arrayUnion(dataAdd),
    });
    formReply.resetFields();
    setCommentSelect("");
  };

  const handleSubmitUpdateReply = (data) => {
    const dbfireStore = getFirestore();

    const commentRef = doc(dbfireStore, "reply", idDetail);
    const dataUpdate = {
      ...replySelectUpdate,
      content_reply: valueReplyUpdate,
    };
    formUpdateReply.resetFields();
    setIndexUpdateReply("");

    updateDoc(commentRef, {
      reply: arrayRemove(replySelectUpdate),
    });
    updateDoc(commentRef, {
      reply: arrayUnion(dataUpdate),
    });
  };

  useEffect(() => {
    replyRef?.current?.focus();
    const elementInput = document.querySelector("#replyInput");
    if (elementInput) {
      elementInput.focus();
    }
  }, [commentSelect]);
  useEffect(() => {
    repUpdateComment?.current?.focus();
  }, [indexUpdate]);

  useEffect(() => {
    const elementInput = document.querySelector("#repUpdateRely");
    if (elementInput) {
      elementInput.focus();
    }
  }, [indexUpdateReply]);

  const handleClickEsc = () => {
    console.log("pressed Esc ✅");
    setCommentSelect("");
    setIndexUpdateReply("");
    formReply.resetFields();

    // update comment
    setIndexUpdate("");
  };

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();

        // 👇️ your logic here
        handleClickEsc();
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    // 👇️ clean up event listener
    // return () => {
    //   console.log("clean up");
    //   document.removeEventListener("keydown", keyDownHandler);
    // };
  }, []);

  return (
    <>
      <div>
        <Comment
          avatar={
            <Avatar
              src={accessToken ? urlImgUser : AVATAR_EMPTY}
              alt="Han Solo"
            />
          }
          content={
            <Form
              onFinish={handleSubmitComment}
              form={formValue}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item name="value_comment">
                <TextArea
                  rows={4}
                  placeholder={t("Write comment...")}
                  onChange={(e) => {
                    const value = e.target.value;
                    setValueComment(value);
                  }}
                  value={valueComment}
                  className="bg-[#333335] border-none outline-none rounded-lg text-white text-[16px]"
                />
              </Form.Item>
              <Form.Item>
                {/* <Button htmlType="submit" loading={submitting} type="primary"> */}
                <button
                  htmlType="submit"
                  className="bg-transparent w-[130px] h-[35px] text-white rounded-md border-solid border-[#54a4f3] border-[1px] hover:bg-[#2690fa] hover:text-black"
                >
                  {t("Add Comment")}
                </button>
              </Form.Item>
            </Form>
          }
        />
        {commentList?.length || !isLoadingComment ? (
          <ul>
            {commentList?.map((comment, index) => {
              return (
                <li
                  key={index}
                  className={`mb-10 ${index < lenghtShow ? "block" : "hidden"}`}
                >
                  <div className="flex gap-2">
                    <Avatar src={comment.user_url} alt={comment.user_name} />
                    <div className="flex-1">
                      <div className="text-[18px] flex justify-between">
                        <div className="w-full">
                          <div>{comment.user_name}</div>
                          <div className="text-[16px] flex gap-10 items-centers">
                            {comment.id_comment === indexUpdate ? (
                              <div className="flex-1">
                                <Form
                                  onFinish={handleSubmitUpdateComment}
                                  // form={formValue}
                                  onFinishFailed={(errorValue) => {}}
                                  form={formUpdateComment}
                                >
                                  <div className="flex item-center">
                                    <Form.Item
                                      name="value_update_comment"
                                      className="flex-1"
                                    >
                                      <input
                                        ref={repUpdateComment}
                                        type="text"
                                        className="w-full outline-none border-none px-4 py-2 h-[42px] rounded-2xl bg-[#333335] text-white"
                                        value={valueCommentUpdate}
                                        onChange={(event) => {
                                          const value = event.target.value;
                                          setValueCommentUpdate(value);
                                        }}
                                      />
                                      <div className="">
                                        <p className="mt-2 text-blue-400">
                                          Press Esc to cancel
                                        </p>
                                      </div>
                                    </Form.Item>
                                    <Form.Item className="mb-0 pt-[5px]">
                                      <button
                                        htmlType="submit"
                                        className="ml-3"
                                      >
                                        <svg
                                          stroke="currentColor"
                                          fill="currentColor"
                                          stroke-width="0"
                                          viewBox="0 0 24 24"
                                          className="text-primary "
                                          height="30"
                                          width="30"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            fill="none"
                                            d="M0 0h24v24H0z"
                                          ></path>
                                          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
                                        </svg>
                                      </button>
                                    </Form.Item>
                                  </div>
                                </Form>
                              </div>
                            ) : (
                              <p>{comment.content_comment}</p>
                            )}

                            <div>
                              <Popover
                                placement="bottom"
                                content={
                                  <div className="text-black w-[40px] flex justify-center flex-col items-center">
                                    {dataUser.uid === comment.user_id ? (
                                      <>
                                        <p
                                          className="text-black cursor-pointer hover:font-bold hover:duration-150"
                                          onClick={() => {
                                            if (Boolean(accessToken)) {
                                              setIndexUpdate(
                                                comment.id_comment
                                              );
                                              setValueCommentUpdate(
                                                comment.content_comment
                                              );
                                              setCommentSelectUpdate(comment);
                                            } else {
                                              handlePopupNotification(
                                                "You need to login to perform this function",
                                                "warning"
                                              );
                                            }
                                          }}
                                        >
                                          Edit
                                        </p>
                                        <Popconfirm
                                          okType="default"
                                          title="Are you sure to delete this comment?"
                                          onConfirm={() => {
                                            if (Boolean(accessToken)) {
                                              handleConfirmDelete(
                                                comment,
                                                "comment"
                                              );
                                            } else {
                                              handlePopupNotification(
                                                "You need to login to perform this function",
                                                "warning"
                                              );
                                            }
                                          }}
                                          onCancel={handleCancelDelete}
                                          okText="Yes"
                                          cancelText="No"
                                        >
                                          <p className="text-black cursor-pointer hover:font-bold hover:duration-150">
                                            Delete
                                          </p>
                                        </Popconfirm>
                                      </>
                                    ) : (
                                      <p
                                        className="text-black cursor-pointer"
                                        onClick={() => {
                                          handleHideComment(comment);
                                        }}
                                      >
                                        {t("Hide")}
                                      </p>
                                    )}
                                  </div>
                                }
                                trigger="hover"
                              >
                                <div className="relative cursor-pointer">
                                  ...
                                </div>
                              </Popover>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* list reaction */}
                      <div className="flex gap-2 mt-2 items-center justify-start max-w-[100px]">
                        <Tooltip
                          title={t(
                            "Click to see detail reaction of this comment"
                          )}
                        >
                          <div
                            className="flex mb-0 cursor-pointer"
                            onClick={() => {
                              setVisibleModal(true);
                              setDataModal((pre) => {
                                return handleFilterReactionOfComment(
                                  dataReaction,
                                  comment
                                );
                              });
                            }}
                          >
                            {handleFilterReactionOfComment(
                              dataReaction,
                              comment
                            ).map((action, index) => {
                              return (
                                <div
                                  key={index}
                                  className={`${
                                    index < 2 && index >= 0 ? "block" : "hidden"
                                  }`}
                                >
                                  <img
                                    style={{
                                      width: "20px",
                                      height: "20px",
                                    }}
                                    src={handleShowReactionOfComment(
                                      action.reaction_value
                                    )}
                                    alt=""
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </Tooltip>
                        <p className="text-[16px]">
                          {handleFilterReactionOfComment(dataReaction, comment)
                            .length
                            ? handleFilterReactionOfComment(
                                dataReaction,
                                comment
                              ).length
                            : ""}
                        </p>
                      </div>
                      <div className="flex text-[14px] gap-2">
                        <div className="group relative text-[#b2a28e] cursor-pointer">
                          {handleGenerateTitleReaction(
                            findReactionOfComment(dataReaction, comment) &&
                              handleCheckIsUserReaction(dataReaction, comment)
                              ? findReactionOfComment(dataReaction, comment)
                                  ?.reaction_value
                              : "Reaction"
                          )}
                          <p className="absolute top-[-45px] z-20 hidden group-hover:block">
                            <ReactionBarSelector
                              iconSize="20px"
                              onSelect={(key) => {
                                if (Boolean(accessToken)) {
                                  handleAddReaction(key, comment.id_comment);
                                } else {
                                  handlePopupNotification(
                                    "You need to login to perform this function",
                                    "warning"
                                  );
                                }
                              }}
                              style={{ backgroundColor: "#333335" }}
                            />
                          </p>
                        </div>
                        <p
                          className="text-[#b2a28e] cursor-pointer"
                          onClick={() => {
                            const accessToken =
                              localStorage.getItem("accessToken") || "";
                            if (Boolean(accessToken)) {
                              setCommentSelect(comment.id_comment);
                              replyRef.current.focus();
                            } else {
                              handlePopupNotification(
                                "You need to login to perform this function",
                                "warning"
                              );
                            }
                          }}
                        >
                          {t("Reply")}
                        </p>
                        {/* <p>{moment(comment.createAt)}</p> */}
                        <p>
                          <ReactTimeAgo
                            className=""
                            date={new Date(comment.createAt.seconds * 1000)}
                            locale={globalLocale}
                          />
                        </p>
                      </div>
                      {/* reply input */}
                      <Form
                        form={formReply}
                        onFinish={handleAddReply}
                        style={
                          commentSelect === comment.id_comment
                            ? {
                                display: "block",
                                marginTop: "16px",
                              }
                            : {
                                display: "none",
                              }
                        }
                      >
                        <Form.Item name="value_reply">
                          <div
                            className={`${
                              commentSelect === comment.id_comment
                                ? "flex"
                                : "hidden"
                            }`}
                          >
                            <Avatar
                              src={comment.user_url}
                              alt="user-img"
                              className="mr-4"
                            />
                            <input
                              id="replyInput"
                              type="text"
                              ref={replyRef}
                              className="w-full outline-none border-none px-4 py-2 h-[42px] rounded-2xl bg-[#333335] text-white"
                              placeholder="Write reply..."
                              // onChange={(e) => {
                              //   const value = e.target.value;
                              //   setValueReply(value);
                              // }}
                              // value={valueReply}
                            />
                            <button htmlType="submit" className="ml-3">
                              <svg
                                stroke="currentColor"
                                fill="currentColor"
                                stroke-width="0"
                                viewBox="0 0 24 24"
                                className="text-primary "
                                height="30"
                                width="30"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
                              </svg>
                            </button>
                          </div>
                        </Form.Item>
                      </Form>
                      {/* reply */}
                      {dataReply ? (
                        <ul>
                          {dataReply?.reply?.map((reply, index) => {
                            return (
                              <li
                                key={index}
                                className={`duration-200 ${
                                  reply.id_comment === comment.id_comment
                                    ? "block"
                                    : "hidden"
                                }`}
                              >
                                <div className="flex gap-2">
                                  <Avatar
                                    src={reply.user_url}
                                    alt={reply?.user_name}
                                  />
                                  <div className="w-full">
                                    <div className="text-[18px]">
                                      <p className="text-[#989898]">
                                        {reply?.user_name}
                                      </p>
                                      <div className="text-[16px] flex gap-10 items-center">
                                        {reply.id_comment ===
                                          indexUpdateReply &&
                                        currentReplyPosition === index ? (
                                          <div className="flex-1">
                                            <Form
                                              onFinish={handleSubmitUpdateReply}
                                              onFinishFailed={(
                                                errorValue
                                              ) => {}}
                                              form={formUpdateReply}
                                            >
                                              <div className="flex item-center">
                                                <Form.Item
                                                  name="value_update_reply"
                                                  className="flex-1"
                                                >
                                                  <input
                                                    ref={repUpdateRely}
                                                    id="repUpdateRely"
                                                    type="text"
                                                    className="w-full outline-none border-none px-4 py-2 h-[42px] rounded-2xl bg-[#333335] text-white"
                                                    value={valueReplyUpdate}
                                                    onChange={(event) => {
                                                      const value =
                                                        event.target.value;
                                                      setValueReplyUpdate(
                                                        value
                                                      );
                                                    }}
                                                  />
                                                  <div className="">
                                                    <p className="mt-2 text-blue-400">
                                                      Press Esc to cancel
                                                    </p>
                                                  </div>
                                                </Form.Item>
                                                <Form.Item className="mb-0 pt-[5px]">
                                                  <button
                                                    htmlType="submit"
                                                    className="ml-3"
                                                  >
                                                    <svg
                                                      stroke="currentColor"
                                                      fill="currentColor"
                                                      stroke-width="0"
                                                      viewBox="0 0 24 24"
                                                      className="text-primary "
                                                      height="30"
                                                      width="30"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                      <path
                                                        fill="none"
                                                        d="M0 0h24v24H0z"
                                                      ></path>
                                                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
                                                    </svg>
                                                  </button>
                                                </Form.Item>
                                              </div>
                                            </Form>
                                          </div>
                                        ) : (
                                          <p>{reply.content_reply}</p>
                                        )}
                                        {/* edit delete reply */}
                                        <div>
                                          <Popover
                                            placement="bottom"
                                            content={
                                              <div className="text-black w-[40px] flex justify-center flex-col items-center">
                                                {dataUser.uid ===
                                                reply.user_id ? (
                                                  <>
                                                    <p
                                                      className="text-black cursor-pointer hover:font-bold hover:duration-150"
                                                      onClick={() => {
                                                        if (
                                                          Boolean(accessToken)
                                                        ) {
                                                          setIndexUpdateReply(
                                                            reply.id_comment
                                                          );
                                                          setCurrentReplyPosition(
                                                            index
                                                          );
                                                          setValueReplyUpdate(
                                                            reply.content_reply
                                                          );
                                                          setReplySelectUpdate(
                                                            reply
                                                          );
                                                          replyRef.current.focus();
                                                        } else {
                                                          handlePopupNotification(
                                                            "You need to login to perform this function",
                                                            "warning"
                                                          );
                                                        }
                                                      }}
                                                    >
                                                      {" "}
                                                      Edit
                                                    </p>
                                                    <Popconfirm
                                                      okType="default"
                                                      title="Are you sure to delete this comment?"
                                                      onConfirm={() => {
                                                        if (
                                                          Boolean(accessToken)
                                                        ) {
                                                          handleConfirmDelete(
                                                            reply,
                                                            "reply"
                                                          );
                                                        } else {
                                                          handlePopupNotification(
                                                            "You need to login to perform this function",
                                                            "warning"
                                                          );
                                                        }
                                                      }}
                                                      onCancel={
                                                        handleCancelDelete
                                                      }
                                                      okText="Yes"
                                                      cancelText="No"
                                                    >
                                                      <p className="text-black cursor-pointer hover:font-bold hover:duration-150">
                                                        Delete
                                                      </p>
                                                    </Popconfirm>
                                                  </>
                                                ) : (
                                                  <p
                                                    className="text-black cursor-pointer"
                                                    onClick={() => {
                                                      handleHideReply(reply);
                                                    }}
                                                  >
                                                    {t("Hide")}
                                                  </p>
                                                )}
                                              </div>
                                            }
                                            trigger="hover"
                                          >
                                            <div className="relative cursor-pointer">
                                              ...
                                            </div>
                                          </Popover>
                                        </div>
                                      </div>
                                    </div>
                                    {/* list reaction reply*/}
                                    <div className="flex gap-2 mt-2 items-center justify-start max-w-[100px]">
                                      <Tooltip
                                        title={t(
                                          "Click to see detail reaction of this reply"
                                        )}
                                      >
                                        <div
                                          className="flex mb-0 cursor-pointer"
                                          onClick={() => {
                                            setVisibleModal(true);
                                            setDataModal((pre) => {
                                              return handleFilterReactionOfReply(
                                                dataReplyReaction,
                                                reply
                                              );
                                            });
                                          }}
                                        >
                                          {handleFilterReactionOfReply(
                                            dataReplyReaction,
                                            reply
                                          ).map((action, index) => {
                                            return (
                                              <div
                                                key={index}
                                                className={`${
                                                  index < 2 && index >= 0
                                                    ? "block"
                                                    : "hidden"
                                                }`}
                                              >
                                                <img
                                                  style={{
                                                    width: "20px",
                                                    height: "20px",
                                                  }}
                                                  src={handleShowReactionOfComment(
                                                    action.reply_reaction_value
                                                  )}
                                                  alt=""
                                                />
                                              </div>
                                            );
                                          })}
                                        </div>
                                      </Tooltip>
                                      <p className="text-[16px]">
                                        {handleFilterReactionOfComment(
                                          dataReplyReaction,
                                          reply
                                        )?.length
                                          ? handleFilterReactionOfComment(
                                              dataReplyReaction,
                                              reply
                                            )?.length
                                          : ""}
                                      </p>
                                    </div>
                                    <div className="flex text-[14px] gap-2">
                                      {/* reaction reply */}
                                      <div className="group relative text-[#b2a28e] cursor-pointer">
                                        {handleGenerateTitleReaction(
                                          findReactionOfReply(
                                            dataReplyReaction,
                                            reply
                                          ) &&
                                            handleCheckIsUserReply(
                                              dataReplyReaction,
                                              reply
                                            )
                                            ? findReactionOfReply(
                                                dataReplyReaction,
                                                reply
                                              )?.reply_reaction_value
                                            : "Reaction"
                                        )}

                                        <p className="absolute top-[-45px] z-20 hidden group-hover:block">
                                          <ReactionBarSelector
                                            iconSize="20px"
                                            onSelect={(key) => {
                                              if (Boolean(accessToken)) {
                                                handleAddReactionReply(
                                                  key,
                                                  reply.id_reply
                                                );
                                              } else {
                                                handlePopupNotification(
                                                  "You need to login to perform this function",
                                                  "warning"
                                                );
                                              }
                                            }}
                                            style={{
                                              backgroundColor: "#333335",
                                            }}
                                          />
                                        </p>
                                      </div>
                                      <p>
                                        <ReactTimeAgo
                                          className="text-[#b2a28e]"
                                          date={
                                            new Date(
                                              reply.createAt.seconds * 1000
                                            )
                                          }
                                          locale={globalLocale}
                                        />
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <Skeleton paragraph={{ rows: 10 }} />
        )}
        {/* load more */}
        {dataComment?.comment?.length >= 5 ? (
          <div>
            <p
              className="cursor-pointer text-[#fff] text-[18px]"
              onClick={() => {
                const data = lenghtShow < dataComment?.comment?.length ? 5 : -5;
                handleChangeQuantityComment(data);
              }}
            >
              {lenghtShow < dataComment?.comment?.length
                ? t("Load more comments")
                : t("Show less comments")}
              {` (${
                lenghtShow < dataComment?.comment?.length
                  ? lenghtShow
                  : dataComment?.comment?.length
              }/${dataComment?.comment?.length})`}
            </p>
          </div>
        ) : (
          ""
        )}
      </div>

      <Modal
        footer={null}
        closable={false}
        visible={visibleModal}
        wrapClassName="modal-config"
        width={350}
        style={{
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <div>
          <div className="flex justify-between items-center">
            <h2 className="text-[20px] text-white">{t("Reaction list")}</h2>
            <p>
              <FontAwesomeIcon
                icon={faClose}
                color="white"
                className="text-[20px] cursor-pointer"
                onClick={() => {
                  setVisibleModal(false);
                }}
              />
            </p>
          </div>
          <div className="mt-5 px-5 min-h-[100px]">
            {dataModal.map((item, index) => {
              return (
                <div key={index} className="flex justify-between mb-2">
                  <div className="flex gap-2 items-center">
                    <p>
                      <img
                        src={item.user_url}
                        alt=""
                        className="w-[30px] h-[30px] rounded-full"
                      />
                    </p>
                    <p className="text-white">{item.user_name}</p>
                  </div>

                  <p>
                    <img
                      className="w-[28px] h-[28px]"
                      src={handleShowReactionOfComment(
                        item.reaction_value
                          ? item.reaction_value
                          : item.reply_reaction_value
                      )}
                      alt=""
                    />
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Modal>
    </>
  );
};
