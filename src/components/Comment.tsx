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

  // const accountData = {
  //   id: comment.bloggerId,
  //   firstName: comment.blogger.firstName,
  //   lastName: comment.blogger.lastName,
  //   nickName: comment.blogger.nickName,
  //   email: comment.blogger.email,
  //   role: comment.blogger.role,
  //   isBanned: comment.blogger.isBanned,
  //   imageUrl: comment.blogger.imageUrl,
  //   bannerUrl: comment.blogger.BannerUrl,
  // };
  const handleDeleteComment = async () => {
    let commentId = comment?.id!;
    DeleteComment({ token, setIsLoading, commentId });
    navigate(0);
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
