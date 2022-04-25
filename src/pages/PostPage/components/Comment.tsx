import IAccount from "../../../interfaces/IAccount";
import ProfileTopBar from "./ProfileTopBar";
import {
  getComment,
  getCommentId,
  deleteComment,
  updateComment,
  addComment,
} from "../../../services/commentService";
import IComment from "../../../interfaces/IComment";
type Props = {
  account: IAccount;
  comment: string;
};

const Comment = ({ account, comment }: Props) => {
  return (
    <div className="w-full border-0 border-red-600 mt-6">
      <ProfileTopBar account={account} isNewPost={false} />
      <p className="pl-2">{comment}</p>
      <hr className="mt-8" />
    </div>
  );
};

export default Comment;
