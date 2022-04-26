import axios, { config } from "../api/axios";
import ICommentLike from "../interfaces/ICommentLike";
import {
  COMMENTLIKE_GET_URL,
  COMMENTLIKE_POST_URL,
  COMMENTLIKE_GETID_URL,
  COMMENTLIKE_PUT_URL,
  COMMENTLIKE_DELETE_URL,
  COMMENTLIKE_TOGGLE_URL,
} from "../api/routes";

type getCommentLikeProps = {
  setIsLoading: any;
};

export const getCommentLike = async ({ setIsLoading }: getCommentLikeProps) => {
  setIsLoading(true);
  let response = null;
  await axios
    .get(COMMENTLIKE_GET_URL)
    .then((res) => {
      response = res.data;
    })
    .catch((err) => {
      console.error(
        `CommentLike getCommentLike(): ${err.response.status}:` + err
      );
    })
    .finally(() => {
      setIsLoading(false);
    });
  console.log(response);
  return response;
};

type getCommentLikeIdProps = {
  setIsLoading: any;
  commentId: number;
};

export const getCommentLikeId = async ({
  setIsLoading,
  commentId,
}: getCommentLikeIdProps) => {
  setIsLoading(true);
  let response = null;
  await axios
    .get(COMMENTLIKE_GETID_URL.replace(":id", commentId.toString()))
    .then((res) => {
      response = res.data;
    })
    .catch((err) => {
      console.error(
        `CommentLikeId getCommentLikeId(): ${err.response.status}:` + err
      );
    })
    .finally(() => {
      setIsLoading(false);
    });
  console.log(response);
  return response;
};

type addCommentLikeProps = {
  setIsLoading: any;
  token: string;
  addData: {
    commentId: number;
    bloggerId: number;
  };
};

export const addCommentLike = async ({
  setIsLoading,
  token,
  addData,
}: addCommentLikeProps) => {
  setIsLoading(true);
  let response: any;
  await axios
    .post(
      COMMENTLIKE_POST_URL,
      {
        commentId: addData.commentId,
        bloggerId: addData.bloggerId,
      },
      config(token)
    )
    .then((res: any) => {
      if (res.status === 200) {
        console.log("add comment complete!");
        response = res.data;
      }
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

type updateCommentLikeProps = {
  setIsLoading: any;
  token: string;
  editCommentId: number;
  addData: {
    commentId: number;
    bloggerId: number;
  };
};

export const updateCommentLike = async ({
  token,
  setIsLoading,
  editCommentId,
  addData,
}: updateCommentLikeProps) => {
  setIsLoading(true);
  let result = false;
  await axios
    .put(
      COMMENTLIKE_PUT_URL.replace(":id", editCommentId.toString()),
      {
        commentId: addData.commentId,
        bloggerId: addData.bloggerId,
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

type deleteCommentLikeProps = {
  setIsLoading: any;
  token: string;
  commentId: number;
};

export const deleteCommentLike = async ({
  token,
  setIsLoading,
  commentId,
}: deleteCommentLikeProps) => {
  setIsLoading(true);
  let result = false;
  await axios
    .delete(
      COMMENTLIKE_DELETE_URL.replace(":id", commentId.toString()),
      config(token)
    )
    .then((res: any) => {
      if (res.status === 200) {
        console.log("delete comment complete!");
        result = true;
      }
    })
    .catch((err) => {
      console.error(`Comment deleteComment(): ${err.response.status}:` + err);
      result = false;
    })
    .finally(() => {
      setIsLoading(false);
    });
  return result;
};

type toggleCommentLikeProps = {
  setIsLoading: any;
  commentId: number;
  bloggerId: number;
  token: string;
};

export const toggleCommentLike = async ({
  setIsLoading,
  commentId,
  bloggerId,
  token,
}: toggleCommentLikeProps) => {
  setIsLoading(true);
  let response = null;
  await axios
    .get(
      COMMENTLIKE_TOGGLE_URL.replace(
        ":commentId",
        commentId.toString()
      ).replace(":bloggerId", bloggerId.toString()),
      config(token)
    )
    .then((res) => {
      response = res.data;
    })
    .catch((err) => {
      console.error(
        `CommentLikeId getCommentLikeId(): ${err.response.status}:` + err
      );
    })
    .finally(() => {
      setIsLoading(false);
    });
  console.log(response);
  return response;
};
