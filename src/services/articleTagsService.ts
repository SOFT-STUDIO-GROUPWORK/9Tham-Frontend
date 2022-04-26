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
        `ArticleTags getArticleTags(): ${err.status}:` + err
      );
    })
    .finally(() => {
      setIsLoading(false);
    });
  console.log(response);
  return response;
};

type getArticleTagProps = {
  setIsLoading: any;
  ArticleTagsId: number;
};
export const getArticleTag = async ({
  setIsLoading,
  ArticleTagsId,
}: getArticleTagProps) => {
  setIsLoading(true);
  let response = null;
  await axios
    .get(ARTICLETAGS_GETID_URL.replace(":id", ArticleTagsId.toString()))
    .then((res) => {
      response = res.data;
    })
    .catch((err) => {
      console.error(
        `ArticleTags getArticleTag(): ${err.status}:` + err
      );
    })
    .finally(() => {
      setIsLoading(false);
    });
  console.log(response);
  return response;
};

type addArticleTagProps = {
  setIsLoading: any;
  token: string;
  addData: IArticleTags
};

export const addArticleTag = async ({
  setIsLoading,
  token,
  addData,
}: addArticleTagProps) => {
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
      console.log("add ArticleTag complete!");
      response = res.data;
    })
    .catch((err) => {
      console.error(`ArticleTags addArticleTag(): ${err.status}:` + err);
      response = null;
    })
    .finally(() => {
      setIsLoading(false);
    });
  console.log(response);
  return response;
};

type updateArticleTagProps = {
  setIsLoading: any;
  token: string;
  editArticleTagsId: number;
  addData: IArticleTags
};

export const updateArticleTag = async ({
  token,
  setIsLoading,
  editArticleTagsId,
  addData,
}: updateArticleTagProps) => {
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
      console.log("update ArticleTags complete!");
      result = true;
    })
    .catch((err) => {
      console.error(
        `ArticleTags updateArticleTag(): ${err.response.status}:` + err
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

export const deleteArticleTag = async ({
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

      console.log("delete ArticleTag complete!");
      result = true;

    })
    .catch((err) => {
      console.error(
        `ArticleTags deleteArticleTag(): ${err.response.status}:` + err
      );
      result = false;
    })
    .finally(() => {
      setIsLoading(false);
    });
  return result;
};
