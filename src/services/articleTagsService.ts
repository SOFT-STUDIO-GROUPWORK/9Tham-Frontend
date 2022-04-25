import axios, { config } from "../api/axios";
import IArticleTags from "../interfaces/IArticleTags";
import {
  ARTICLETAGS_GET_URL,
  ARTICLETAGS_POST_URL,
  ARTICLETAGS_GETID_URL,
  ARTICLETAGS_PUT_URL,
  ARTICLETAGS_DELETE_URL,
} from "../api/routes";

type getArticleTagsProps = {
  setIsLoading: any;
};

export const getArticleTags = async ({ setIsLoading }: getArticleTagsProps) => {
  setIsLoading(true);
  let response = null;
  await axios
    .get(ARTICLETAGS_GET_URL)
    .then((res) => {
      response = res.data;
    })
    .catch((err) => {
      console.error(
        `ArticleTags getArticleTags(): ${err.response.status}:` + err
      );
    })
    .finally(() => {
      setIsLoading(false);
    });
  console.log(response);
  return response;
};

type getArticleTagsIdProps = {
  setIsLoading: any;
  ArticleTagsId: number;
};

export const getArticleTagsId = async ({
  setIsLoading,
  ArticleTagsId,
}: getArticleTagsIdProps) => {
  setIsLoading(true);
  let response = null;
  await axios
    .get(ARTICLETAGS_GETID_URL.replace(":id", ArticleTagsId.toString()))
    .then((res) => {
      response = res.data;
    })
    .catch((err) => {
      console.error(
        `ArticleTagsId getArticleTagsId(): ${err.response.status}:` + err
      );
    })
    .finally(() => {
      setIsLoading(false);
    });
  console.log(response);
  return response;
};

type addArticleTagsProps = {
  setIsLoading: any;
  token: string;
  addData: {
    articleId: number;
    tagId: number;
  };
};

export const addArticleTags = async ({
  setIsLoading,
  token,
  addData,
}: addArticleTagsProps) => {
  setIsLoading(true);
  let response: any;
  await axios
    .post(
      ARTICLETAGS_POST_URL,
      {
        articleId: addData.articleId,
        tagId: addData.tagId,
      },
      config(token)
    )
    .then((res: any) => {
      if (res.status === 200) {
        console.log("add ArticleTags complete!");
        response = res.data;
      }
    })
    .catch((err) => {
      console.error(`ArticleTags addLike(): ${err.response.status}:` + err);
      response = null;
    })
    .finally(() => {
      setIsLoading(false);
    });
  console.log(response);
  return response;
};

type updateArticleTagsProps = {
  setIsLoading: any;
  token: string;
  editArticleTagsId: number;
  addData: {
    articleId: number;
    tagId: number;
  };
};

export const updateArticleTags = async ({
  token,
  setIsLoading,
  editArticleTagsId,
  addData,
}: updateArticleTagsProps) => {
  setIsLoading(true);
  let result = false;
  await axios
    .put(
      ARTICLETAGS_PUT_URL.replace(":id", editArticleTagsId.toString()),
      {
        articleId: addData.articleId,
        tagId: addData.tagId,
      },
      config(token)
    )
    .then((res: any) => {
      if (res.status === 200) {
        console.log("update ArticleTags complete!");
        result = true;
      }
    })
    .catch((err) => {
      console.error(
        `ArticleTags updateArticleTags(): ${err.response.status}:` + err
      );
      result = false;
    })
    .finally(() => {
      setIsLoading(false);
    });
  return result;
};

type deleteArticleTagsProps = {
  setIsLoading: any;
  token: string;
  ArticleTagsId: number;
};

export const deleteArticleTags = async ({
  token,
  setIsLoading,
  ArticleTagsId,
}: deleteArticleTagsProps) => {
  setIsLoading(true);
  let result = false;
  await axios
    .delete(
      ARTICLETAGS_DELETE_URL.replace(":id", ArticleTagsId.toString()),
      config(token)
    )
    .then((res: any) => {
      if (res.status === 200) {
        console.log("delete ArticleTags complete!");
        result = true;
      }
    })
    .catch((err) => {
      console.error(
        `ArticleTags deleteArticleTags(): ${err.response.status}:` + err
      );
      result = false;
    })
    .finally(() => {
      setIsLoading(false);
    });
  return result;
};
