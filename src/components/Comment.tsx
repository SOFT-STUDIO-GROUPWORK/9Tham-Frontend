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
import Input from "./Input";
import Button from "./Button";
import IArticle from "../interfaces/IArticle";

type Props = {
  comment: IComment;
  article: IArticle;
};

const Comment = ({ comment, article }: Props) => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [commentContent, setCommentContent] = useState<string>(comment.content);

  const handleDeleteComment = async () => {
    let commentId = comment?.id!;
    DeleteComment({ token, setIsLoading, commentId }).then((res: any) => {
      navigate(0);
    });
  };

  const handleIsEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleUpdateComment = async () => {
    let addData = {
      content: commentContent,
      visible: true,
      bloggerId: comment.bloggerId,
      articleId: article.id!,
    };

    await updateComment({
      setIsLoading,
      token,
      editCommentId: comment?.id!,
      addData,
    });
  };

  return (
    <div className="w-full border-0 border-red-600 mt-6">
      <ProfileTopBar
        account={comment.blogger}
        userId={user?.id}
        commentId={comment?.id}
        isNewPost={false}
        isComment={true}
        handleDeleteOnClick={handleDeleteComment}
        handleEditOnClick={handleIsEdit}
      />
      {isEdit === false ? (
        <p className="pl-2">{comment.content}</p>
      ) : (
        <div className="flex flex-row gap-2">
          <Input
            className="ml-16 w-9/12"
            placeholder={"กรุณากรอกคอมเมนต์"}
            value={commentContent}
            onChange={(e: any) => setCommentContent(e.target.value)}
          />
          <Button
            onClick={handleUpdateComment}
            children={"บันทึก"}
            color="amber"
            className=" py-2.5 w-20"
          />
          <Button
            onClick={() => setIsEdit(false)}
            children={"ยกเลิก"}
            color="amber"
            className="bg-gray-400 py-2.5 w-20 hover:bg-gray-500"
          />
        </div>
      )}

      <hr className="mt-8" />
    </div>
  );
};

export default Comment;
