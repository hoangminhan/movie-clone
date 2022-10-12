import { Avatar, Button, Comment, Form, Input, List } from "antd";
import {
  child,
  get,
  getDatabase,
  push,
  ref,
  set,
  update,
} from "firebase/database";
import { t } from "i18next";
import moment from "moment";
import React, { useState } from "react";
const { TextArea } = Input;

export const CommentMovie = ({
  dataComment,
  dataUser,
  idDetail,
  currentKey,
}) => {
  const { comment: commentList, id: idComment } = dataComment;
  console.log({ commentList, dataUser });
  const [valueComment, setValueComment] = useState("");
  const dbRealTime = getDatabase();

  const handleSubmitComment = async (value) => {
    const { value_comment } = value;
    const dataAdd = {
      user_uid: dataUser.uid,
      url: dataUser.photoUrl || "",
      title: value_comment,
      reply: [],
    };
    const postListRef = ref(dbRealTime, `posts/${currentKey}/comment`);
    const newPostRef = push(postListRef);
    set(newPostRef, dataAdd);
  };

  const onFinishFailed = (value) => {};

  return (
    <div>
      <Comment
        avatar={
          <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
        }
        content={
          <Form onFinish={handleSubmitComment} onFinishFailed={onFinishFailed}>
            <Form.Item name="value_comment">
              <TextArea
                rows={4}
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
            return (
              <li key={index}>
                <div className="flex gap-2">
                  <Avatar
                    src={
                      comment.url
                        ? comment.url
                        : "https://joeschmoe.io/api/v1/random"
                    }
                    alt={comment.user_comment}
                  />
                  <div>
                    <div className="text-[18px]">
                      <p>{comment.user_comment}</p>
                      <p className="text-[16px]">{comment.title}</p>
                    </div>
                    <div className="flex text-[14px] gap-2">
                      <p>{t("Reaction")}</p>
                      <p className="text-white cursor-pointer">{t("Reply")}</p>
                      <p>{moment(new Date()).format("YYYY-MM-DD")}</p>
                    </div>
                    {/* reply */}
                    <ul>
                      {comment.reply.map((reply, index) => {
                        return (
                          <li key={index}>
                            <div className="flex gap-2">
                              <Avatar
                                src={
                                  comment.url
                                    ? comment.url
                                    : "https://joeschmoe.io/api/v1/random"
                                }
                                alt={reply?.user_reply}
                              />
                              <div>
                                <div className="text-[18px]">
                                  <p>{reply?.user_reply}</p>
                                  <p className="text-[16px]">{reply?.title}</p>
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
