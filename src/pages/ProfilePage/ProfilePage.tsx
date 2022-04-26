import React, { useEffect, useState } from "react";
import Card from "../HomePage/components/Card";
import { Link } from "react-router-dom";
import "./ProfilePage.css";
import { getArticles } from "../../services/articlesService";
import IArticle from "../../interfaces/IArticle";

import { useAuth } from "../../contexts/AuthContext";
import { BsPersonCircle } from "react-icons/bs";

type Props = {};
const ProfilePage = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [toggleState, setToggleState] = useState(1);

  const [articles, setArticles] = useState<IArticle[]>([]);

  const { user } = useAuth();

  useEffect(() => {
    getArticles({
      setIsLoading,
    }).then((res) => {
      if (res === null) {
        console.error("Cannot load article");
        return;
      }
      setArticles(res);
    });
  }, []);

  const toggleTab = (index: any) => {
    setToggleState(index);
  };
  return (
    <div className="container mx-auto">
      <div>
        <div className="relative h-96 rounded-b flex justify-center">
          <img
            src="https://static.posttoday.com/media/content/2016/09/29/DEEDC61CE9CA41A097A8EF4B85A99344.jpg"
            className="object-cover w-full h-full rounded-b"
            alt="cover"
          />
          <div className="absolute -bottom-6">
            {user?.imageUrl ? (
              <img
                id="img-preview"
                src={user?.imageUrl}
                className="object-cover w-48 h-48 mr-2 rounded-full border-4 border-amber-600"
                alt=""
              />
            ) : (
              <BsPersonCircle className="w-8 h-8 mr-2" />
            )}

          </div>
        </div>
        <div className="text-center mt-6 text-3xl font-bold text-fBlack">
          {user?.firstName} {user?.lastName}
        </div>
        <div className="border border-fGrey mt-6 border-opacity-10" />
        <div className="flex justify-between px-10">
          <div className="flex items-center space-x-4">
            <Link className="w-full min-w-fit" to={"/editPost"}>
              <button className="h-10 m-2 px-4 bg-amber-600 hover:bg-amber-800 rounded-3xl text-white text-md">
                เพิ่มบทความใหม่
              </button>
            </Link>
            <Link className="w-full min-w-fit" to={"/annoucementForm"}>
              <button className="h-10 m-2 px-4 bg-amber-600 hover:bg-amber-800 rounded-3xl text-white text-md">
                ประชาสัมพันธ์
              </button>
            </Link>
            <Link className="w-full min-w-fit" to={"/manageAccount"}>
              <button className="h-10 m-2 px-4 bg-amber-600 hover:bg-amber-800 rounded-3xl text-white text-md">
                จัดการบัญชีผู้ใช้
              </button>
            </Link>
            <Link className="w-full min-w-fit" to={"/tagEdit"}>
              <button className="h-10 m-2 px-4 bg-amber-600 hover:bg-amber-800 rounded-3xl text-white text-md">
                จัดการหมวดหมู่
              </button>
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <img
              src="https://static.xx.fbcdn.net/rsrc.php/v3/yl/r/tmaz0VO75BB.png?_nc_eui2=AeEuBM1eJuum2Q_T_tBTcfs0PeqkNBZWYnQ96qQ0FlZidMXgaqBeeoDM_h2m5VoxD9yhSPYbeUi25vsW0WHMMmlw"
              alt=""
              height="16"
              width="16"
            ></img>
            <Link className="w-full min-w-fit" to={"/detailAccount"}>
              <button className="w-36 h-10 bg-amber-600 hover:bg-amber-800 rounded-3xl text-white text-md">
                แก้ไขโปรไฟล์
              </button>
            </Link>
          </div>
        </div>
        <div className="border border-fGrey border-opacity-10" />
      </div>
      <div>
        <div className="container px-96 pt-10">
          <div className="bloc-tabs">
            <button
              className={
                toggleState === 1
                  ? "tabs active-tabs rounded-t"
                  : "tabs rounded-t"
              }
              onClick={() => toggleTab(1)}
            >
              บทความ
            </button>
            <button
              className={
                toggleState === 2
                  ? "tabs active-tabs rounded-t"
                  : "tabs rounded-t"
              }
              onClick={() => toggleTab(2)}
            >
              ฉบับร่าง
            </button>
          </div>
          <div className="w-full content-tabs">
            <div
              className={
                toggleState === 1
                  ? "w-full content  active-content rounded-b"
                  : "w-full content rounded-b"
              }
            >
              {isLoading ? (
                <>Loading</>
              ) : (
                <>
                  {articles.filter((article) => article.visible === true)
                    .length === 0 ? (
                    <div className="flex flex-row justify-center items-center m-16">
                      ไม่มีเนื้อหา Post สาธารณะ
                    </div>
                  ) : (
                    <>
                      {articles
                        .filter((article) => article.visible === true)
                        .map((article, index) => {
                          return (
                            <React.Fragment key={index}>
                              <Card article={article} />
                            </React.Fragment>
                          );
                        })}
                    </>
                  )}
                </>
              )}
            </div>

            <div
              className={
                toggleState === 2
                  ? "content  active-content rounded-b"
                  : "content rounded-b"
              }
            >
              {isLoading ? (
                <>Loading</>
              ) : (
                <>
                  {articles.filter((article) => article.visible === false)
                    .length === 0 ? (
                    <div className="flex flex-row justify-center items-center m-16 text-white">
                      ไม่มีเนื้อหา Post ฉบับร่าง
                    </div>
                  ) : (
                    <>
                      {articles
                        .filter((article) => article.visible === false)
                        .map((article, index) => {
                          return (
                            <React.Fragment key={index}>
                              <Card article={article} />
                            </React.Fragment>
                          );
                        })}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
