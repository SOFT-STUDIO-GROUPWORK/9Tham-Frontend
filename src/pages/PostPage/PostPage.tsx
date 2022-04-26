import Comment from "../../components/Comment";

import MOCK_COMMENTS from "../../mocks/Post/comments.json";

import IAccount, { initialAccount } from "../../interfaces/IAccount";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";

import { Navigate, useParams, useNavigate } from "react-router-dom";
import { getArticle } from "../../services/articlesService";
import IArticle from "../../interfaces/IArticle";
import htmlToDraft from "html-to-draftjs";
import ProfileTopBar from "../../components/ProfileTopBar";
import NewComment from "../../components/NewComment";

import { deleteArticle } from "../../services/articlesService";

import {
  getComment,
  getCommentId,
  DeleteComment,
  updateComment,
  addComment,
} from "../../services/commentService";
import IComment from "../../interfaces/IComment";

type Props = {};

const PostPage = (props: Props) => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  let articleId: number = parseInt(params.id!);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // who post this post
  const [article, setArticle] = useState<IArticle | undefined>(undefined);
  const [postAccount, setPostAccount] = useState(initialAccount);
  //const [comments, setComments] = useState();

  const [comments, setComments] = useState<IComment[] | undefined>();
  //let allComment = {comments};
  const [allcomments, setAllComments] = useState<IComment[] | undefined>();
  //const allComments = getComment({ setIsLoading });

  useEffect(() => {
    getArticle({
      articleId,
      setIsLoading,
      setArticle,
      setPostAccount,
      setComments,
    });

    console.log(article);
    getComment({ setIsLoading }).then((res: any) => {
      if (res === null) return;
      setAllComments(res);
    });
    //const allComment = getComment({ setIsLoading });
  }, [articleId]);

  const handleDeletePost = async () => {
    let articleId = article?.id!;
    deleteArticle({ token, setIsLoading, articleId })
      .then((res) => {
        alert("ลบโพสต์สำเร็จ");
        navigate(-1);
      })
      .catch((err) => {
        alert("ไม่สามารถลบโพสต์ได้ กรุณาลองใหม่อีกครั้ง");
      });
  };

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
                <ProfileTopBar
                  account={postAccount}
                  article={article}
                  isNewPost={false}
                  isComment={false}
                  handleDeleteOnClick={handleDeletePost}
                />
              </div>

              <h2 className="w-full pt-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600">
                {article?.title}
              </h2>
              <div className="w-full pb-6 pt-3">
                <button className="btn bg-amber-600 rounded-full text-white px-2 py-1">
                  {article?.articleTags?.[0].tag?.name}
                </button>
              </div>

              {article ? (
                <>
                  {" "}
                  <div dangerouslySetInnerHTML={{ __html: article.content }} />
                </>
              ) : (
                <></>
              )}

              <hr className="w-full" />
              <div className="w-full py-4 px-9">
                <h4>แสดงความคิดเห็น 5 รายการ</h4>
              </div>
              <hr className="w-full" />
              <div className="w-full">
                {allcomments?.map((comment) => {
                  return <Comment comment={comment} />;
                })}
                {/* <Comment account={user} comment={comments} />; */}
              </div>
              <NewComment account={user} articleId={articleId} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PostPage;
