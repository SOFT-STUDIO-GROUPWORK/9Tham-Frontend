import TextEditor from "./components/TextEditor";
import Input from "./components/Input";

import MOCK_POST from "../../mocks/Post/post.json";
import { useEffect, useState } from "react";

import { BsFillImageFill } from "react-icons/bs";
import { AiOutlineGlobal } from "react-icons/ai";
import { FiLock } from "react-icons/fi";

import axios from "axios";
import $, { param } from "jquery";
import Button from "../../components/Button";

import {
  EditorState,
  convertToRaw,
  RawDraftContentState,
  ContentState,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

import Selector from "./components/Selector";
import { Link } from "react-router-dom";

// import IPost from "../../interfaces/post";

import { getTags } from "../../services/tagsService";
import ITag, { ITagMustHaveId } from "../../interfaces/ITag";
import IArticle from "../../interfaces/IArticle";
import { useAuth } from "../../contexts/AuthContext";
import {
  addArticle,
  getArticle,
  updateArticle,
} from "../../services/articlesService";

import { useNavigate } from "react-router-dom";
import IAccount from "../../interfaces/IAccount";
import {
  addArticleTag,
  getArticleTag,
  updateArticleTag,
} from "../../services/articleTagsService";

import ProfileTopBar from "../../components/ProfileTopBar";

import { useParams } from "react-router-dom";
import IComment from "../../interfaces/IComment";
import IArticleTags from "../../interfaces/IArticleTags";
import ReactLoading from "react-loading";

type Props = {};

const EditPostPage = (props: Props) => {
  //general
  const { token, user } = useAuth();
  const [account, setAccount] = useState<IAccount>(user);

  const navigate = useNavigate();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [articleId, setArticleId] = useState<number | null>(() => {
    let result = null;
    if (params.id !== undefined) {
      result = parseInt(params.id);
    }
    return result;
  });

  // Post Content
  // Header
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tagId, setTagId] = useState<number>(0);
  const [tags, setTags] = useState<ITag[]>([]);
  // Cover Image
  const [selectCoverImage, setSelectCoverImage] = useState<undefined | Blob>();
  const [previewCoverImage, setPreviewCoverImage] = useState<string>("");
  // Content in Raw data
  const [content, setContent] = useState<RawDraftContentState>();
  // Editor
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  //Complete Post
  const [visible, setVisible] = useState<boolean>(true);
  const [post, setPost] = useState<IArticle | undefined>(undefined);

  const [articleTagId, setArticleTagId] = useState<number | null>();

  //Comment
  const [comments, setComments] = useState<IComment[]>();

  useEffect(() => {
    console.log(articleId);
    if (articleId !== null) {
      getArticle({
        setIsLoading,
        articleId,
        setComments,
      }).then((res) => {
        if (res != null) {
          let article: IArticle = res;
          console.log(article);
          setTitle(article.title);
          setDescription(article.description);
          setPreviewCoverImage(article.thumbnailUrl);

          if (article.articleTags === undefined) {
            return;
          }
          let articleTagBuffer: IArticleTags = article.articleTags[0];
          setTagId(articleTagBuffer.tagId);
          setArticleTagId(articleTagBuffer.id);
          /** Convert html string to draft JS */
          const contentBlock = htmlToDraft(article.content);
          const contentState = ContentState.createFromBlockArray(
            contentBlock.contentBlocks
          );
          const editorState = EditorState.createWithContent(contentState);
          setEditorState(editorState);
          setVisible(article.visible);
        } else {
          alert("ไม่สามารถโหลดบทความได้");
          navigate("/post/" + articleId.toString());
        }
      });
    }
  }, [articleId]);

  useEffect(() => {}, [visible]);

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    getTags({ setIsLoading }).then((res: any) => setTags(res));
  }, []);

  useEffect(() => {
    console.log("only first");
    if (!selectCoverImage) {
      setPreviewCoverImage("");
      return;
    }

    // for Preview Image Url
    const objectUrl: string = URL.createObjectURL(selectCoverImage);
    setPreviewCoverImage(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectCoverImage]);

  // This will be createPost to endPoint API
  useEffect(() => {
    console.log("only second");
    console.log(post);

    if (post !== undefined) {
      let addFormData: IArticle = post;
      //add new article
      if (articleId === null) {
        addArticle({ token, setIsLoading, addFormData })
          .then(async (res) => {
            if (res !== null) {
              let addData: IArticleTags = {
                articleId: res,
                tagId: tagId,
              };
              console.log(addData);
              await addArticleTag({ setIsLoading, token, addData });
              alert("อัพบทความสำเร็จ ไปยังหน้าบทความ");
              navigate("/");
            } else {
              alert("อัพบทความไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
            }
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        // Update article
        updateArticle({
          token,
          setIsLoading,
          editArticleId: articleId,
          editFormData: addFormData,
        })
          .then(async (res) => {
            if (res === true) {
              let editData: IArticleTags = {
                articleId: articleId,
                tagId: tagId,
              };
              await updateArticleTag({
                setIsLoading,
                token,
                editArticleTagsId: articleTagId!,
                addData: editData,
              });
              alert("อัพเดตบทความสำเร็จ ไปยังหน้าบทความ");
              navigate("/post/" + articleId.toString());
            } else {
              alert("อัพบทความไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
    // CreatePostApi here
  }, [post]);

  // Cover Image start
  const fileSelectHandler = (event: any) => {
    if (!event.target.files[0] || event.target.files[0] === 0) {
      setSelectCoverImage(undefined);
      return;
    }
    setSelectCoverImage(event.target.files[0]);
  };
  // Cover Image End

  // Sigle Image TextEditor Start
  const fileSelectSingleImage = (file: any) => {
    const singleImageBlob = file;
    console.log("file:", singleImageBlob);

    // no return for no image

    const objectUrl: string = URL.createObjectURL(singleImageBlob);
    console.log("objectUrl:", objectUrl);
    return new Promise((resolve, reject) => {
      console.log("image ready to paste");
      resolve({ data: { link: objectUrl } });
    });
  };

  // Create Post
  const createPost = async () => {
    if (
      title === "" ||
      description === "" ||
      tagId === 0 ||
      content === undefined
    ) {
      // setError('Please fill out all fields.');
      // setSuccess('');
      console.log("Please fill out all fields.");
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return null;
    }
    console.log("every thing is fill requirement");
    console.log("begin try...");

    setIsLoading(true);

    try {
      let previewCoverImageBufferUrl: string = "";
      if (previewCoverImage !== "") {
        previewCoverImageBufferUrl = await urlToObjectFile(
          previewCoverImage
        ).then(async (file) => await fileUploadHandler(file));
      }

      await Promise.all(
        Object.entries(content.entityMap).map(
          async (entity: any, index: any) => {
            entity[1].data.src = await urlToObjectFile(entity[1].data.src).then(
              async (file) => await fileUploadHandler(file)
            );
          }
        )
      ).then(() => {
        setPost({
          bloggerId: account.id!,
          title: title,
          description: description,
          thumbnailUrl: previewCoverImageBufferUrl,
          content: draftToHtml(content),
          visible: visible,
        });
      });

      console.log("upload post complete! Yay!");
    } catch (error) {
      console.log("Error! after trying...");
      console.log(error);
    } finally {
      console.log("complete try !");
    }
  };

  const urlToObjectFile = async (url: string) => {
    const min = 1;
    const max = 99999999;
    const rand = Math.round(min + Math.random() * (max - min));

    let file = await fetch(url)
      .then((res) => res.blob())
      .then((blob) => new File([blob], rand.toString(), { type: blob.type }));
    return file;
  };

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      // 'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent: any) => {
      console.log(
        "Upload progress: " +
          Math.round((progressEvent.loaded / progressEvent.total) * 100) +
          "%"
      );
    },
  };

  const fileUploadHandler = async (file: any) => {
    if (!file) {
      console.log("Error: No file to Upload");
      return "";
    }

    const formData = new FormData();
    console.log(file);
    formData.append("Files", file);
    console.log("prepare Loading!");
    console.log(formData);
    return await axios
      .post("https://localhost:7265/api/FileUpload/picture", formData, config)
      .then((res) => {
        console.log(res.data.url);
        return res.data.url;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {isLoading ? (
        <div className="flex flex-row items-center justify-center h-screen w-screen">
          <ReactLoading type={"bubbles"} height={'3%'} width={'3%'} color={"#f59e0b"} />
        </div>
      ) : (
        <>
          <div className="container mx-auto ">
            <div
              className="flex flex-col items-center mx-auto w-3/4 bg-slate-50  px-2 pb-32"
              style={{ minHeight: "calc(100vh - 64px)" }}
            >
              <div className="mt-24"></div>
              <ProfileTopBar
                account={account}
                isNewPost={true}
                isComment={false}
              />
              <h2 className="w-full py-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600">
                เพิ่มบทความใหม่
              </h2>

              <div className="w-full my-3">
                <h4 className="mb-2">
                  <span className="text-amber-500">* </span>
                  หัวข้อเรื่อง
                </h4>
                <Input
                  className="text-2xl font-bold py-4"
                  placeholder="หัวข้อเรื่อง..."
                  value={title}
                  onChange={(e: any) => setTitle(e.target.value)}
                />
              </div>

              <div className="w-full my-3">
                <h4 className="mb-2">
                  <span className="text-amber-500">* </span>
                  คำอธิบายขนาดสั้น
                </h4>
                <Input
                  placeholder="คำอธิบายขนาดสั้น"
                  value={description}
                  onChange={(e: any) => setDescription(e.target.value)}
                />
              </div>

              <div className="w-full my-3">
                <h4 className="mb-2">
                  <span className="text-amber-500">* </span>หมวดหมู่
                </h4>
                <div className="font-normal text-base mb-2">
                  <span className={tagId === 0 ? "text-gray-700 " : ""}>
                    <Selector
                      value={tagId}
                      isDefault={true}
                      onChange={(e: any) => setTagId(e.target.value)}
                      options={tags}
                    />
                  </span>
                </div>
                <p className="ml-2 text-amber-500">
                  หากต้องการเพิ่ม Tag ใหม่ ไปยัง{" "}
                  {/* insert to edit tags page */}
                  <Link to="/tagEdit">
                    <u>สร้าง Tag</u>{" "}
                  </Link>
                </p>
              </div>

              <div className="w-full my-3 flex flex-col items-center bg-slate-50">
                <h4 className="mb-2 self-start w-full bg-slate-50">
                  <span className="text-amber-500">&nbsp;&nbsp;</span>
                  ภาพหน้าปก
                </h4>
                {/* input picture */}
                <div
                  className="relative w-full rounded border bg-white shadow"
                  style={{ height: "400px", width: "600px" }}
                >
                  {selectCoverImage || previewCoverImage !== "" ? (
                    <img
                      id="img-preview"
                      src={previewCoverImage}
                      className="object-fill"
                      style={{ height: "400px", width: "600px" }}
                      alt=""
                    />
                  ) : (
                    <BsFillImageFill className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-40 w-40 text-gray-400" />
                  )}
                </div>
                <div
                  className="flex flex-row items-center justify-center"
                  style={{ width: "600px" }}
                >
                  <input
                    type="file"
                    id="previewImageInputFile"
                    className=" shadow text-center border grow "
                    onChange={fileSelectHandler}
                  />
                  {selectCoverImage ? (
                    <Button
                      onClick={() => {
                        setSelectCoverImage(undefined);
                        $("#previewImageInputFile").val("");
                      }}
                      className="self-stretch w-12 "
                      children="X"
                      color="red"
                    />
                  ) : (
                    <></>
                  )}
                </div>
                <p className="text-amber-500">
                  ขนาดแนะนำ: ผืนผ้า ไม่เกิน 600 x 400 px (Ratios 3:2)
                </p>
              </div>

              <h4
                className="w-full mb-2 sticky bg-slate-50 py-3 z-10"
                style={{ top: "66px" }}
              >
                <span className="text-amber-500">* </span>
                เนื้อหา
              </h4>
              <div className="w-full">
                <TextEditor
                  editorState={editorState}
                  onEditorStateChange={(newState: EditorState) => {
                    setEditorState(newState);
                    setContent(convertToRaw(newState.getCurrentContent()));
                  }}
                  uploadSingleImage={fileSelectSingleImage}
                />
              </div>

              {/* <div
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        /> */}

              <div className="w-full flex flex-col items-center gap-5">
                <div className="w-full flex flex-col items-center my-8">
                  <h4 className="mb-5">รูปแบบบทความ</h4>
                  <ul className="flex flex-row gap-5">
                    <li className="relative">
                      <input
                        className="sr-only peer"
                        type="radio"
                        name="visible"
                        id="private"
                        onChange={() => setVisible(false)}
                        checked={visible === false}
                      />
                      <label
                        className="text-lg flex items-center py-2 px-4 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:bg-amber-500 peer-checked:text-white peer-checked:border-transparent transition duration-150 ease-in-out"
                        htmlFor="private"
                      >
                        <FiLock className="mr-2" /> เฉพาะฉัน
                      </label>
                    </li>
                    <li className="relative">
                      <input
                        className="sr-only peer"
                        type="radio"
                        name="visible"
                        id="public"
                        onChange={() => setVisible(true)}
                        checked={visible === true}
                      />
                      <label
                        className="text-lg flex items-center py-2 px-4 bg-slate-50  rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:bg-amber-500 peer-checked:text-white peer-checked:border-transparent transition duration-150 ease-in-out"
                        htmlFor="public"
                      >
                        <AiOutlineGlobal className="mr-2" /> สาธารณะ
                      </label>
                    </li>
                  </ul>
                </div>
                {/* <Button
                  onClick={() => {
                    console.log(content);
                    console.log(convertToRaw(editorState.getCurrentContent()));
                  }}
                  // onClick={fileUploadHandler}
                  className="w-2/5 rounded-full"
                  children="ตัวอย่างบทความที่แสดง"
                  color="amber"
                  mode="outline"
                /> */}
                {articleId === null && (
                  <Button
                    onClick={createPost}
                    className="w-2/5 py-3 rounded-full"
                    children="บทความ"
                    color="amber"
                  />
                )}
                {articleId !== null && (
                  <Button
                    onClick={createPost}
                    className="w-2/5 py-3 rounded-full"
                    children="อัพเดตบทความ"
                    color="green"
                  />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default EditPostPage;
