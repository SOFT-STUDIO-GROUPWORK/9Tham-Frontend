import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { FiMoreHorizontal } from "react-icons/fi";

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
import IBlogger from "../interfaces/IBlogger";

type Props = {
  account: IAccount;
  article?: IArticle;
  isNewPost: boolean;
  isComment: boolean;
  handleEditOnClick?: () => any;
  handleHideOnClick?: () => any;
  handleDeleteOnClick?: () => any;
};

const ProfileTopBar = ({
  account,
  isNewPost,
  isComment,
  article,
  handleHideOnClick,
  handleEditOnClick,
  handleDeleteOnClick,
}: Props) => {
  Moment.locale("th");
  const dateFormat = Moment(article?.published?.split(".")[0]).fromNow();

  const [isMore, setIsMore] = useState<boolean>(false);

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
            {isComment === false && (
              <div className="flex flex-row items-center text-sm text-gray-800 mt-1">
                <AiOutlineEye className="mr-1" />
                <span className="text-sm">ผู้เข้าชม {article?.viewCount}</span>
              </div>
            )}
          </p>
        </div>
      </div>
      <div className="relative flex flex-row gap-2 mr-2">
        {isComment === true && (
          <>
            {" "}
            <AiFillLike className="w-auto h-1/2" />
            <p>100</p>
          </>
        )}
        {isMore === true && (
          <div className="absolute top-0 -right-40 bg-white border rounded border-gray-400 w-36">
            <button
              onClick={handleEditOnClick}
              className="flex flex-row items-center w-full h-8 hover:bg-gray-100"
            >
              <AiOutlineEdit className="mx-2 h-full" />
              {isComment === false ? "แก้ไขโพสต์" : "แก้ไขคอมเมนต์"}
            </button>
            {isComment === false && (
              <button
                onClick={handleHideOnClick}
                className="flex flex-row items-center  w-full h-8 hover:bg-gray-100"
              >
                {article?.visible === true ? (
                  <>
                    <AiOutlineEyeInvisible className="mx-2 h-ful" />
                    ซ่อนโพสต์
                  </>
                ) : (
                  <>
                    <AiOutlineEye className="mx-2 h-ful" />
                    แสดงโพสต์
                  </>
                )}
              </button>
            )}
            <hr />
            <button
              onClick={handleDeleteOnClick}
              className="flex flex-row items-center  w-full h-8 hover:bg-gray-100"
            >
              <BsTrash className="mx-2 h-ful" />
              {isComment === false ? "ลบโพสต์" : "ลบคอมเมนต์"}
            </button>
          </div>
        )}

        <button
          className="ml-2 w-auto h-1/2"
          onClick={() => {
            console.log(isMore);
            setIsMore(!isMore);
          }}
        >
          <FiMoreHorizontal className="w-full h-full" />
        </button>
      </div>
    </div>
  );
};

export default ProfileTopBar;
