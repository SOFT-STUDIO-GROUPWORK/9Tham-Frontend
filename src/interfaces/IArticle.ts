import IArticleTags from "./IArticleTags";

export default interface IArticle {
  id?: number;
  bloggerId: number;
  title: string;
  content: string;
  visible: boolean;
  thumbnailUrl: string;
  description: string;
  published?: string;
  viewCount?: number;
  articleTags?: IArticleTags[];
  blogger?: any;
  comments?: any;
  likes?: any;
}

export const initialArticle = {
  bloggerId: 0,
  title: "",
  description: "",
  thumbnailUrl: "",
  content: "",
  visible: 1,
};
