import ICommentLike from "./ICommentLike";

export default interface IComment {
  id: number;
  published: string;
  content: string;
  visible: true;
  blogger?: any;
  bloggerId: number;
  article?: any;
  articleId: number;
  commentLikes?: ICommentLike[];
}
//   content: string;
//   visible: true;
//   bloggerId: number;
//   articleId: number;
