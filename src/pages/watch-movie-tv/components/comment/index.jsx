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
import {
  child,
  get,
  getDatabase,
  push,
  ref,
  serverTimestamp,
  set,
  update,
} from "firebase/database";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  FieldValue,
  getFirestore,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { t } from "i18next";
import moment from "moment";
import React, { useState } from "react";
import { uid } from "uid";

const { TextArea } = Input;

export const CommentMovie = ({
  dataComment,
  dataUser,
  idDetail,
  currentKey,
  dataReply,
}) => {
  const { comment: commentList } = dataComment;

  const [valueComment, setValueComment] = useState("");
  const [idComment, setIdComment] = useState(false);
  const [valueReply, setValueReply] = useState("");
  const dbRealTime = getDatabase();
  const [formValue] = Form.useForm();
  const [formReply] = Form.useForm();

  const handleSubmitComment = async (value) => {
    console.log(dataComment);
    const dbfireStore = getFirestore();

    // const intitalComment = collection(dbfireStore, "detail", idDetail);

    const commentRef = doc(dbfireStore, "detail", currentKey || idDetail);
    const { value_comment } = value;
    const dataAdd = {
      user_id: dataUser.uid,
      user_name: "Anh",
      user_url: dataUser.photoUrl || "",
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

  const onFinishFailed = (value) => {};

  const handleConfirmDelete = (data) => {
    const dbfireStore = getFirestore();
    const commentRef = doc(dbfireStore, "detail", currentKey);

    updateDoc(commentRef, {
      comment: arrayRemove(data),
    });

    message.success("delete success");
  };
  const [commentSelect, setCommentSelect] = useState();
  const handleCancelDelete = (e) => {};

  // add reply

  const handleAddReply = async (value) => {
    const dbfireStore = getFirestore();

    const { value_reply } = value;

    const commentRef = doc(dbfireStore, "reply", currentKey || idDetail);
    console.log({ commentRef });
    const dataAdd = {
      user_id: dataUser.uid,
      user_name: "Anh reply",
      user_url: dataUser.photoUrl || "",
      content_reply: value_reply,
      createAt: serverTimestamp(),
      id_comment: idComment,
    };
    formValue.resetFields();
    setValueComment("");

    updateDoc(commentRef, {
      reply: arrayUnion(dataAdd),
    });
    formReply.resetFields();
    setCommentSelect("");
    console.log(value);
  };

  return (
    <div>
      <Comment
        avatar={
          <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
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
                placeholder="Write comment..."
                onChange={(e) => {
                  const value = e.target.value;
                  setValueComment(value);
                }}
                value={valueComment}
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
            console.log(commentSelect === comment.id_comment);
            return (
              <li key={index}>
                <div className="flex gap-2">
                  <Avatar
                    src={
                      comment.url
                        ? comment.url
                        : "https://joeschmoe.io/api/v1/random"
                    }
                    alt={comment.user_name}
                  />
                  <div className="flex-1">
                    <div className="text-[18px] flex justify-between">
                      <div>
                        <div>{comment.user_name}</div>
                        <div className="text-[16px] flex gap-10">
                          <p>{comment.content_comment}</p>
                          <div>
                            <Popover
                              placement="bottom"
                              content={
                                <div className="text-black w-[40px] flex justify-center flex-col items-center">
                                  <p className="text-black cursor-pointer hover:font-bold hover:duration-150">
                                    {" "}
                                    Edit
                                  </p>
                                  <Popconfirm
                                    title="Are you sure to delete this comment?"
                                    onConfirm={() => {
                                      handleConfirmDelete(comment);
                                    }}
                                    onCancel={handleCancelDelete}
                                    okText="Yes"
                                    cancelText="No"
                                  >
                                    <p className="text-black cursor-pointer hover:font-bold hover:duration-150">
                                      Delete
                                    </p>
                                  </Popconfirm>
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
                      <p>{t("Reaction")}</p>
                      <p
                        className="text-white cursor-pointer"
                        onClick={() => {
                          console.log("reply", comment);
                          setCommentSelect(comment.id_comment);
                          setIdComment(comment.id_comment);
                        }}
                      >
                        {t("Reply")}
                      </p>
                      <p>{moment(new Date()).format("YYYY-MM-DD")}</p>
                    </div>
                    {/* reply input */}
                    <Form form={formReply} onFinish={handleAddReply}>
                      <Form.Item name="value_reply">
                        <div
                          className={`${
                            commentSelect === comment.id_comment
                              ? "flex"
                              : "hidden"
                          }`}
                        >
                          <Avatar
                            src={
                              dataUser.url
                                ? dataUser.url
                                : "https://joeschmoe.io/api/v1/random"
                            }
                            alt="user-img"
                            className="mr-4"
                          />
                          <Input
                            className="w-full outline-none border-none"
                            placeholder="Write reply..."
                            // onChange={(e) => {
                            //   const value = e.target.value;
                            //   setValueReply(value);
                            // }}
                            // value={valueReply}
                          />
                          <button htmlType="submit">
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
                        {dataReply?.reply?.map((reply, indexReply) => {
                          console.log({ indexReply });
                          return (
                            <li
                              key={indexReply}
                              className={`${
                                reply.id_comment === comment.id_comment
                                  ? "block"
                                  : "hidden"
                              }`}
                            >
                              <div className="flex gap-2">
                                <Avatar
                                  src={
                                    comment.url
                                      ? comment.url
                                      : "https://joeschmoe.io/api/v1/random"
                                  }
                                  alt={reply?.user_name}
                                />
                                <div>
                                  <div className="text-[18px]">
                                    <p>{reply?.user_name}</p>
                                    <p className="text-[16px]">
                                      {reply?.content_reply}
                                    </p>
                                  </div>
                                  <div className="flex text-[14px] gap-2">
                                    <p>{t("Reaction")}</p>
                                    <p>
                                      {moment(new Date()).format("YYYY-MM-DD")}
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
        ""
      )}
    </div>
  );
};
