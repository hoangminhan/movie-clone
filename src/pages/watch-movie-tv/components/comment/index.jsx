import {
  Avatar,
  Button,
  Comment,
  Form,
  Input,
  List,
  message,
  Popconfirm,
  Popover,
} from "antd";
import { UserContext } from "contexts";
import { ReactionBarSelector } from "@charkour/react-reactions";

import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  FieldValue,
  getDocs,
  getFirestore,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import ReactTimeAgo from "react-time-ago";
import { uid } from "uid";

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
}) => {
  const handleGenerateTitleReaction = (data) => {
    switch (data) {
      case "satisfaction":
        return <p className="text-[#498ae6]">{t("Like")}</p>;
      case "love":
        return <p className="text-[#e64949]">{t("Love")}</p>;
      case "happy":
        return <p className="text-[#d3df58]">{t("Happy")}</p>;
      case "surprise":
        return <p className="text-[#d3df58]">{t("Surprise")}</p>;
      case "sad":
        return <p className="text-[#d3df58]">{t("Sad")}</p>;
      case "angry":
        return <p className="text-[#e64949]">{t("Angry")}</p>;
      default:
        return <p>{t("Reaction")}</p>;
    }
  };
  const findReactionOfComment = (dataReaction, comment) => {
    return dataReaction?.reaction?.find(
      (reaction) => reaction?.id_comment === comment?.id_comment
    );
  };
  const [reactions, setReactions] = useState({
    like: 0,
    haha: 1,
    angry: 0,
    sad: 0,
    wow: 0,
  });
  console.log({ dataReaction });
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
  const [idComment, setIdComment] = useState(false);
  const [valueReply, setValueReply] = useState("");

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

  const handleSubmitComment = async (value) => {
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
  };
  const handleAddReaction = async (value, idCommentReaction) => {
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
      console.log("empty");
      await updateDoc(ReactionRef, {
        reaction: arrayUnion(dataAdd),
      });
    } else {
      const checkExistReaction = dataReaction.reaction.find(
        (item) =>
          item.user_id === dataUser.uid && item.id_comment === idCommentReaction
      );
      console.log(checkExistReaction);
      if (checkExistReaction) {
        console.log("exits", dataAdd);
        await updateDoc(ReactionRef, {
          reaction: arrayRemove(checkExistReaction),
        });
        await updateDoc(ReactionRef, {
          reaction: arrayUnion(dataAdd),
        });
      } else {
        console.log("not e");
        await updateDoc(ReactionRef, {
          reaction: arrayUnion(dataAdd),
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
    <div>
      <Comment
        avatar={<Avatar src={urlImgUser} alt="Han Solo" />}
        content={
          <Form
            onFinish={handleSubmitComment}
            form={formValue}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item name="value_comment">
              <TextArea
                rows={4}
                placeholder="Write comment..."
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
              <Button htmlType="submit" type="primary">
                Add Comment
              </Button>
            </Form.Item>
          </Form>
        }
      />
      {commentList?.length ? (
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
                                          setIndexUpdate(comment.id_comment);
                                          setValueCommentUpdate(
                                            comment.content_comment
                                          );
                                          setCommentSelectUpdate(comment);
                                        }}
                                      >
                                        Edit
                                      </p>
                                      <Popconfirm
                                        title="Are you sure to delete this comment?"
                                        onConfirm={() => {
                                          handleConfirmDelete(
                                            comment,
                                            "comment"
                                          );
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
                              <div className="relative cursor-pointer">...</div>
                            </Popover>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex text-[14px] gap-2">
                      <div className="group relative text-[#b2a28e] cursor-pointer">
                        {handleGenerateTitleReaction(
                          findReactionOfComment(dataReaction, comment)
                            ? findReactionOfComment(dataReaction, comment)
                                ?.reaction_value
                            : "Reaction"
                        )}
                        <p className="absolute top-[-45px] z-20 hidden group-hover:block">
                          <ReactionBarSelector
                            iconSize="25px"
                            // reactions={reactions}
                            onSelect={(key) => {
                              console.log(key);
                              handleAddReaction(key, comment.id_comment);
                            }}
                            style={{ backgroundColor: "#333335" }}
                          />
                        </p>
                      </div>
                      <p
                        className="text-[#b2a28e] cursor-pointer"
                        onClick={() => {
                          setCommentSelect(comment.id_comment);
                          setIdComment(comment.id_comment);
                          replyRef.current.focus();
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
                                      {reply.id_comment === indexUpdateReply &&
                                      currentReplyPosition === index ? (
                                        <div className="flex-1">
                                          <Form
                                            onFinish={handleSubmitUpdateReply}
                                            onFinishFailed={(errorValue) => {}}
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
                                                    setValueReplyUpdate(value);
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
                                                    }}
                                                  >
                                                    {" "}
                                                    Edit
                                                  </p>
                                                  <Popconfirm
                                                    title="Are you sure to delete this comment?"
                                                    onConfirm={() => {
                                                      handleConfirmDelete(
                                                        reply,
                                                        "reply"
                                                      );
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
                                  <div className="flex text-[14px] gap-2">
                                    <p className="text-[#b2a28e]">
                                      {t("Reaction")}
                                    </p>
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
                    {/* load more reply */}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        ""
      )}
      {/* load more */}
      {dataComment?.comment?.length ? (
        <div>
          <p
            className="cursor-pointer text-[#766f6f] text-[18px]"
            onClick={() => {
              const data = lenghtShow < dataComment?.comment?.length ? 5 : -5;
              handleChangeQuantityComment(data);
            }}
          >
            {lenghtShow < dataComment?.comment?.length
              ? t("Load more comments")
              : t("Show less comments")}{" "}
            {`(${
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
  );
};
