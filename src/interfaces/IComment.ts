export default interface IComment {
  id: number;
  published: string;
  content: string;
  visible: true;
  blogger?: any;
  bloggerId: number;
  article?: any;
  articleId: number;
  commentLikes?: any;
}
//   content: string;
//   visible: true;
//   bloggerId: number;
//   articleId: number;
