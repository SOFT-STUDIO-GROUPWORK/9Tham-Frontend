import Comment from "./components/Comment";
import ProfileTopBar from "./components/ProfileTopBar";
import NewComment from "./components/NewComment";

import MOCK_COMMENTS from "../../mocks/Post/comments.json";

import IAccount, { initialAccount } from "../../interfaces/IAccount";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { getArticle } from "../../services/articlesService";
import IArticle from "../../interfaces/IArticle";
import htmlToDraft from "html-to-draftjs";

type Props = {};

const PostPage = (props: Props) => {
  const { user } = useAuth();
  const params = useParams();
  let articleId: number = parseInt(params.id!);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // who post this post
  const [article, setArticle] = useState<IArticle | undefined>(undefined);
  const [postAccount, setPostAccount] = useState(initialAccount);
  const [comments, setComments] = useState();

  useEffect(() => {
    getArticle({
      articleId,
      setIsLoading,
      setArticle,
      setPostAccount,
      setComments,
    });
    console.log(article);
  }, [articleId]);

  return (
    <>
      {isLoading ? (
        <>Loading</>
      ) : (
        <>
          <div className="container mx-auto pb-32">
            <div
              className="flex flex-col items-center mx-auto w-3/4 bg-slate-50  px-2"
              style={{ minHeight: "calc(100vh - 64px)" }}
            >
              {/* margin top for navbar */}
              <div className="w-full mt-24">
                <ProfileTopBar account={postAccount} isNewPost={false} />
              </div>

              <h2 className="w-full py-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600">
                {article?.title}
              </h2>
              {article ? (
                <>
                  {" "}
                  <div dangerouslySetInnerHTML={{ __html: article.content }} />
                </>
              ) : (
                <></>
              )}

              <hr className="w-full" />
              <div className="w-full">
                {/* {MOCK_COMMENTS.map((c) => {
            return <Comment account={c} comment={""} />;
          })} */}
              </div>
              <NewComment />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PostPage;
