import IArticle from "./IArticle";
import ITag from "./ITag";

export default interface IArticleTags {
  id?: number;
  articleId: number;
  tagId: number;
  article?: IArticle;
  tag?: ITag;
}
