import { AiFillLike, AiOutlineGlobal, AiOutlineLike } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { FiMoreHorizontal } from "react-icons/fi";
import { VscLock } from "react-icons/vsc";

import Moment from "moment";
import "moment/locale/th";
import { useEffect, useState } from "react";

import {
  AiOutlineEye,
  AiOutlineEdit,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import IArticle from "../interfaces/IArticle";
import IAccount from "../interfaces/IAccount";
import { Link } from "react-router-dom";
import IBlogger from "../interfaces/IBlogger";
import IComment from "../interfaces/IComment";
import ICommentLike from "../interfaces/ICommentLike";

import { toggleCommentLike } from "../services/commentLikeService";

import { getCommentId } from "../services/commentService";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

type Props = {
  account: IAccount;
  userId?: number;
  article?: IArticle;
  commentId?: number;
  isNewPost: boolean;
  isComment: boolean;
  handleEditOnClick?: () => any;
  handleHideOnClick?: () => any;
  handleDeleteOnClick?: () => any;
};

const ProfileTopBar = ({
  account,
  userId,
  article,
  commentId,
  isNewPost,
  isComment,
  handleHideOnClick,
  handleEditOnClick,
  handleDeleteOnClick,
}: Props) => {
  Moment.locale("th");

  const navigate = useNavigate();

  const { user, token } = useAuth();
  const [isMore, setIsMore] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [comment, setComment] = useState<IComment | null>();
  const [isLike, setIsLike] = useState<boolean>(false);
  const [likeAmounts, setLikeAmounts] = useState<number>(0);
  // const [isUser, setIsUser] = useState<boolean>(false);
  const [dateFormat, setDateFormat] = useState<string>("");

  useEffect(() => {
    // if (
    //   comment.commentLikes.bloggerId === userId &&
    //   comment.commentLikes.commentId === comment.id
    // )
    if (isComment === false) {
      setDateFormat(Moment(article?.published?.split(".")[0]).fromNow());
    }
    if (commentId === undefined) return;
    getCommentId({ setIsLoading, commentId }).then((res) => {
      if (res === undefined || res === null) return;
      let x: IComment = res;
      const www = x.commentLikes?.filter(
        (commentLike) =>
          commentLike.bloggerId === userId && commentLike.commentId === x.id
      );
      setLikeAmounts(x.commentLikes?.length!);
      console.log(www);
      if (www?.length !== 0) {
        setIsLike(true);
      } else {
        setIsLike(false);
      }

      setComment(res);
      if (isComment === true) {
        let x: IComment = res;
        setDateFormat(Moment(x.published?.split(".")[0]).fromNow());
      }
    });

    // if (user.role === 0) {
    //   setIsUser(true);
    // } else {
    //   setIsUser(false);
    // }
  }, [article?.published, commentId, isComment]);

  const handleLike = async () => {
    if (commentId === undefined) return;
    if (userId === undefined) return;
    //if (islike === false)
    // console.log(com)
    toggleCommentLike({ setIsLoading, commentId, bloggerId: userId, token });

    if (isLike === true) {
      if (likeAmounts > 0) setLikeAmounts(likeAmounts - 1);
    } else if (isLike === false) {
      setLikeAmounts(likeAmounts + 1);
    }
    setIsLike(!isLike);
    //navigate(0);
    // getCommentId({ setIsLoading, commentId }).then((res) => {
    //   setComment(res);
    // });
    // console.log(comment)
    console.log(comment);
  };

  const handlemeatballcomment = async () => {
    if (user.role === 0 && userId === comment?.bloggerId) {
      console.log(isMore);
      setIsMore(!isMore);
    } else if (user.role === 1) {
      console.log(isMore);
      setIsMore(!isMore);
    }
  };

  const handlemeatballpost = async () => {
    if (user.role === 1) {
      console.log(isMore);
      setIsMore(!isMore);
    }
  };

  return (
    <div className="flex flex-row justify-between w-full h-12 mb-4 border-0 border-blue-600">
      <div className="flex flex-row">
        {account?.imageUrl ? (
          <img
            id="img-preview"
            src={account.imageUrl}
            className="object-cover w-14 h-14 mr-4 rounded-full border-2 border-amber-500"
            alt=""
          />
        ) : (
          <BsPersonCircle className="w-14 h-full mr-4" />
        )}
        <div className="flex flex-col">
          <p>
            {account?.firstName} {account?.lastName}
          </p>
          <p>
            <span className="font-semibold text-amber-500">
              @{account?.email}
            </span>{" "}
            {isNewPost === false && (
              <span className="text-sm text-gray-500">{dateFormat}</span>
            )}
            {isNewPost === false && isComment === false && (
              <div className="flex flex-row items-center text-sm text-gray-800 mt-1">
                {article?.visible === true ? (
                  <AiOutlineGlobal className="mr-1" />
                ) : (
                  <VscLock className="mr-1" />
                )}
                <span className="text-sm">
                  {article?.visible === true ? "สาธารณะ" : "ส่วนตัว"}
                </span>
                <AiOutlineEye className="ml-3 mx-1" />
                <span className="text-sm">ผู้เข้าชม {article?.viewCount}</span>
              </div>
            )}
          </p>
        </div>
      </div>
      <div className="relative flex flex-row gap-2 mr-2">
        {isComment === true && (
          <button
            onClick={handleLike}
            className="flex flex-row justify-around items-center w-12 h-8"
          >
            {isLike ? (
              <AiFillLike className="w-6 h-6" />
            ) : (
              <AiOutlineLike className="w-6 h-6" />
            )}

            {/* {comment?.commentLikes?.length === 0 && (
              <AiOutlineLike className="w-6 h-6" />
            )} */}

            {likeAmounts}
          </button>
        )}
        {isMore === true && (
          <div className="absolute top-0 -right-40 bg-white border rounded border-gray-400 w-36">
            <button
              onClick={handleEditOnClick}
              className="flex flex-row items-center w-full h-8 hover:bg-gray-100"
            >
              <AiOutlineEdit className="mx-2 h-full" />
              {isComment === false ? "แก้ไขบทความ" : "แก้ไขคอมเมนต์"}
            </button>
            {isComment === false && (
              <button
                onClick={handleHideOnClick}
                className="flex flex-row items-center  w-full h-8 hover:bg-gray-100"
              >
                {article?.visible === true ? (
                  <>
                    <AiOutlineEyeInvisible className="mx-2 h-full" />
                    ซ่อนบทความ
                  </>
                ) : (
                  <>
                    <AiOutlineEye className="mx-2 h-full" />
                    แสดงบทความ
                  </>
                )}
              </button>
            )}
            <hr />
            <button
              onClick={handleDeleteOnClick}
              className="flex flex-row items-center  w-full h-8 hover:bg-gray-100"
            >
              <BsTrash className="mx-2 h-full" />
              {isComment === false ? "ลบบทความ" : "ลบคอมเมนต์"}
            </button>
          </div>
        )}
        {isComment === true ? (
          <button className="ml-2 w-6 h-6" onClick={handlemeatballcomment}>
            <FiMoreHorizontal className="w-6 h-6" />
          </button>
        ) : (
          <button className="ml-2 w-6 h-6" onClick={handlemeatballpost}>
            <FiMoreHorizontal className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileTopBar;
