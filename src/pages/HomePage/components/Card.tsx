import { Link } from "react-router-dom";
import IArticle from "../../../interfaces/IArticle";
import IArticleTags from "../../../interfaces/IArticleTags";
import logo from "../../../assets/budda-logo.png";
import { useEffect } from "react";
import Moment from "moment";
import "moment/locale/th";

import { AiOutlineEye } from "react-icons/ai";

type Props = {
  article: IArticle;
};

const Card = ({ article }: Props) => {
  Moment.locale("th");
  const dateFormat = Moment(article.published?.split(".")[0]).fromNow();

  let coverPhoto = "";
  if (article.thumbnailUrl === "") {
    coverPhoto = logo;
  } else {
    coverPhoto = article.thumbnailUrl;
  }

  return (
    <Link to={"/post/" + article.id?.toString()}>
      <div className="p-1 px-1.5 flex w-full items-center bg-white rounded-lg border shadow-sm flex-row hover:bg-gray-100 ">
        {/* left */}
        <div className="flex flex-col justify-between">
          <img
            className="object-cover rounded"
            style={{ width: "300px", height: "200px" }}
            src={coverPhoto}
            alt=""
          />
        </div>
        {/* right */}
        <div className="flex flex-col justify-between p-1 ml-4 w-full h-full">
          <div className="flex flex-col w-full">
            <h4 className="mb-2 font-semibold tracking-tight text-gray-900 ">
              {article.title}
            </h4>
            <p className="mb-3 text-gray-700 ">{article.description}</p>
            <button className="btn bg-amber-600 rounded-full text-white px-2 py-1 max-w-fit">
              {article.articleTags?.[0]?.tag?.name}
            </button>
          </div>

          <div className="flex flex-row justify-between w-full mt-4 text-gray-500 text-sm gap-4">
            <p>{dateFormat}</p>
            <div className="flex flex-row items-center gap-1 mr-6">
              <AiOutlineEye className="" />
              <span>ผู้เข้าชม {article.viewCount}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
