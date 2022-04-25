import axios, { config } from "../api/axios";
import ILike from "../interfaces/ILike";
import {
  LIKE_GET_URL,
  LIKE_POST_URL,
  LIKE_GETID_URL,
  LIKE_PUT_URL,
  LIKE_DELETE_URL,
} from "../api/routes";

type getLikeProps = {
  setIsLoading: any;
};

export const getCommentLike = async ({ setIsLoading }: getLikeProps) => {
  setIsLoading(true);
  let response = null;
  await axios
    .get(LIKE_GET_URL)
    .then((res) => {
      response = res.data;
    })
    .catch((err) => {
      console.error(`Like getLike(): ${err.response.status}:` + err);
    })
    .finally(() => {
      setIsLoading(false);
    });
  console.log(response);
  return response;
};

type getLikeIdProps = {
  setIsLoading: any;
  likeId: number;
};

export const getLikeId = async ({ setIsLoading, likeId }: getLikeIdProps) => {
  setIsLoading(true);
  let response = null;
  await axios
    .get(LIKE_GETID_URL.replace(":id", likeId.toString()))
    .then((res) => {
      response = res.data;
    })
    .catch((err) => {
      console.error(`LikeId getLikeId(): ${err.response.status}:` + err);
    })
    .finally(() => {
      setIsLoading(false);
    });
  console.log(response);
  return response;
};

type addLikeProps = {
  setIsLoading: any;
  token: string;
  addData: {
    articleId: number;
    bloggerId: number;
  };
};

export const addLike = async ({
  setIsLoading,
  token,
  addData,
}: addLikeProps) => {
  setIsLoading(true);
  let response: any;
  await axios
    .post(
      LIKE_POST_URL,
      {
        articleId: addData.articleId,
        bloggerId: addData.bloggerId,
      },
      config(token)
    )
    .then((res: any) => {
      if (res.status === 200) {
        console.log("add like complete!");
        response = res.data;
      }
    })
    .catch((err) => {
      console.error(`Like addLike(): ${err.response.status}:` + err);
      response = null;
    })
    .finally(() => {
      setIsLoading(false);
    });
  console.log(response);
  return response;
};

type updateLikeProps = {
  setIsLoading: any;
  token: string;
  editLikeId: number;
  addData: {
    articleId: number;
    bloggerId: number;
  };
};

export const updateLike = async ({
  token,
  setIsLoading,
  editLikeId,
  addData,
}: updateLikeProps) => {
  setIsLoading(true);
  let result = false;
  await axios
    .put(
      LIKE_PUT_URL.replace(":id", editLikeId.toString()),
      {
        articleId: addData.articleId,
        bloggerId: addData.bloggerId,
      },
      config(token)
    )
    .then((res: any) => {
      if (res.status === 200) {
        console.log("update like complete!");
        result = true;
      }
    })
    .catch((err) => {
      console.error(`Like updateLike(): ${err.response.status}:` + err);
      result = false;
    })
    .finally(() => {
      setIsLoading(false);
    });
  return result;
};

type deleteLikeProps = {
  setIsLoading: any;
  token: string;
  likeId: number;
};

export const deleteLike = async ({
  token,
  setIsLoading,
  likeId,
}: deleteLikeProps) => {
  setIsLoading(true);
  let result = false;
  await axios
    .delete(LIKE_DELETE_URL.replace(":id", likeId.toString()), config(token))
    .then((res: any) => {
      if (res.status === 200) {
        console.log("delete like complete!");
        result = true;
      }
    })
    .catch((err) => {
      console.error(`Like deleteLike(): ${err.response.status}:` + err);
      result = false;
    })
    .finally(() => {
      setIsLoading(false);
    });
  return result;
};
