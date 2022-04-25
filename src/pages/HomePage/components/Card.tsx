import { Link } from "react-router-dom";
import IArticle from "../../../interfaces/IArticle";
import IArticleTags from "../../../interfaces/IArticleTags";
import logo from "../../../assets/budda-logo.png";
type Props = {
  article: IArticle;
  articleTag?: IArticleTags;
};

const Card = ({ article, articleTag }: Props) => {
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
            style={{ width: "300px", height: "200px"  }}
            src={coverPhoto}
            alt=""
          />
        </div>
        {/* right */}
        <div className="flex flex-col justify-between p-4 ml-4 w-full">
          <h4 className="mb-2 font-semibold tracking-tight text-gray-900 ">
            {article.title}
          </h4>
          <p className="mb-3 text-gray-700 ">{article.description}</p>
          <button className="btn bg-amber-600 rounded-full text-white px-2 py-1 max-w-fit">
            {/* {articleTag.} */}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default Card;
