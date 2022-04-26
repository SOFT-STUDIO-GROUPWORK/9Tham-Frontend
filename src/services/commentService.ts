import axios, { config } from "../api/axios";
import IComment from "../interfaces/IComment";
import {
  COMMENT_GET_URL,
  COMMENT_POST_URL,
  COMMENT_GETID_URL,
  COMMENT_PUT_URL,
  COMMENT_DELETE_URL,
} from "../api/routes";

type getCommentProps = {
  setIsLoading: any;
};

export const getComment = async ({ setIsLoading }: getCommentProps) => {
  setIsLoading(true);
  let response = null;
  await axios
    .get(COMMENT_GET_URL)
    .then((res) => {
      response = res.data;
    })
    .catch((err) => {
      console.error(`Comment getComment(): ${err.response.status}:` + err);
    })
    .finally(() => {
      setIsLoading(false);
    });
  console.log(response);
  return response;
};

type getCommentIdProps = {
  setIsLoading: any;
  commentId: number;
};

export const getCommentId = async ({
  setIsLoading,
  commentId,
}: getCommentIdProps) => {
  setIsLoading(true);
  let response = null;
  await axios
    .get(COMMENT_GETID_URL.replace(":id", commentId.toString()))
    .then((res) => {
      response = res.data;
    })
    .catch((err) => {
      console.error(`CommentId getCommentId(): ${err.response.status}:` + err);
    })
    .finally(() => {
      setIsLoading(false);
    });
  console.log(response);
  return response;
};

type addCommentProps = {
  setIsLoading: any;
  token: string;
  addData: {
    content: string;
    visible: boolean;
    bloggerId: number;
    articleId: number;
  };
};

export const addComment = async ({
  setIsLoading,
  token,
  addData,
}: addCommentProps) => {
  setIsLoading(true);
  let response: any;
  await axios
    .post(
      COMMENT_POST_URL,
      {
        content: addData.content,
        visible: addData.visible,
        bloggerId: addData.bloggerId,
        articleId: addData.articleId,
      },
      config(token)
    )
    .then((res: any) => {
      console.log("add comment complete!");
      response = res.data;
    })
    .catch((err) => {
      console.error(`Comment addComment(): ${err.response.status}:` + err);
      response = null;
    })
    .finally(() => {
      setIsLoading(false);
    });
  console.log(response);
  return response;
};

type updateCommentProps = {
  setIsLoading: any;
  token: string;
  editCommentId: number;
  addData: {
    content: string;
    visible: true;
    bloggerId: number;
    articleId: number;
  };
};

export const updateComment = async ({
  token,
  setIsLoading,
  editCommentId,
  addData,
}: updateCommentProps) => {
  setIsLoading(true);
  let result = false;
  await axios
    .put(
      COMMENT_PUT_URL.replace(":id", editCommentId.toString()),
      {
        content: addData.content,
        visible: addData.visible,
        bloggerId: addData.bloggerId,
        articleId: addData.articleId,
      },
      config(token)
    )
    .then((res: any) => {
      if (res.status === 200) {
        console.log("update comment complete!");
        result = true;
      }
    })
    .catch((err) => {
      console.error(`Comment updateComment(): ${err.response.status}:` + err);
      result = false;
    })
    .finally(() => {
      setIsLoading(false);
    });
  return result;
};

type deleteCommentProps = {
  setIsLoading: any;
  token: string;
  commentId: number;
};

export const DeleteComment = async ({
  token,
  setIsLoading,
  commentId,
}: deleteCommentProps) => {
  setIsLoading(true);
  let result = false;
  await axios
    .delete(
      COMMENT_DELETE_URL.replace(":id", commentId.toString()),
      config(token)
    )
    .then((res: any) => {
      if (res.status === 200) {
        console.log("delete comment complete!");
        alert("ลบคอมเมนต์สำเร็จ");
        result = true;
      }
    })
    .catch((err) => {
      alert("คุณไม่สามารถลบคอมเมนต์นี้ได้");
      console.error(`Comment deleteComment(): ${err.response.status}:` + err);
      result = false;
    })
    .finally(() => {
      setIsLoading(false);
    });
  console.log(result);
  return result;
};
