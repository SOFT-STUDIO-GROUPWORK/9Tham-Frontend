import IAccount from "../interfaces/IAccount";

import {
  getComment,
  getCommentId,
  DeleteComment,
  updateComment,
  addComment,
} from "../services/commentService";
import IComment from "../interfaces/IComment";
import ProfileTopBar from "./ProfileTopBar";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  comment: IComment;
};

const Comment = ({ comment }: Props) => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleDeleteComment = async () => {
    let commentId = comment?.id!;
    DeleteComment({ token, setIsLoading, commentId }).then((res: any) => {
      navigate(0);
    });
  };

  return (
    <div className="w-full border-0 border-red-600 mt-6">
      <ProfileTopBar
        account={comment.blogger}
        isNewPost={false}
        isComment={true}
        handleDeleteOnClick={handleDeleteComment}
      />
      <p className="pl-2">{comment.content}</p>
      <hr className="mt-8" />
    </div>
  );
};

export default Comment;
