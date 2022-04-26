import { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { useAuth } from "../contexts/AuthContext";
import IAccount from "../interfaces/IAccount";
import IArticle from "../interfaces/IArticle";
import IComment from "../interfaces/IComment";
import { useNavigate } from "react-router-dom";

import {
  getComment,
  getCommentId,
  DeleteComment,
  updateComment,
  addComment,
} from "../services/commentService";
type Props = {
  account: IAccount;
  articleId: number;
};

const NewComment = ({ account, articleId }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [Newcomment, setNewComment] = useState("");
  const { token } = useAuth();
  const navigate = useNavigate();

  let addData = {
    content: Newcomment,
    visible: true,
    bloggerId: account?.id!,
    articleId: articleId,
  };

  const handleSubmitComment = async () => {
    addComment({ setIsLoading, token, addData });
    //getCommentId({ setIsLoading,res });
    console.log(addData.bloggerId);
    alert("คอมเมนต์สำเร็จ");
    //navigate(0);
  };
  return (
    <div className="flex flex-row w-full border-0 border-green-600 py-4">
      {account?.imageUrl ? (
        <img
          id="img-preview"
          src={account?.imageUrl}
          className="object-cover w-14 h-14 rounded-full border-2 border-amber-500"
          alt=""
        />
      ) : (
        <BsPersonCircle className="w-14 h-full " />
      )}
      <input
        type="text"
        className="shadow appearance-none border rounded w-full py-2 px-3 mx-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="username"
        placeholder="เขียนความคิดเห็น..."
        autoComplete="off"
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button
        onClick={handleSubmitComment}
        className="btn py-2 px-4 w-20 bg-amber-500 text-white   rounded shadow-sm hover:bg-amber-600 hover:shadow-lg focus:bg-amber-600  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-amber-700 active:shadow-lg transition duration-150 ease-in-out "
      >
        ส่ง
      </button>
    </div>
  );
};

export default NewComment;
