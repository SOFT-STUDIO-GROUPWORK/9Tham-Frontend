// for admin gut

// load extention ES7 + React/Redux/React-Native snippets
// type "tsrafce" and enter... it will create structure
// (mean "ts" = "typescript" , "rafce" = "react arrow function component export default")
// by Pop (delete if already read)

import React, { useEffect, useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import { BsFillImageFill } from "react-icons/bs";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useAuth } from "../../contexts/AuthContext";
import {
  addAnnouncement,
  deleteAnnouncement,
  getAnnouncement,
  updateAnnouncement,
} from "./services/announcementServices";
import { fileUploadHandler } from "./services/uploadServices";

const mockProfileImage = undefined;
const mockDay = "4 April 2022";

type Props = {};

const AnnoucementFormPage = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [photoList, setPhotoList] = useState<string[]>([]);
  // Cover Image
  const [selectCoverImage, setSelectCoverImage] = useState<Blob[]>([]);
  const [annoucements, setAnnouncements] = useState<any[]>();

  useEffect(() => {
    getAnnouncement({ setIsLoading }).then(async (res: any) => {
      setAnnouncements(res);
      let list: any = ["", "", "", "", "", ""];
      // let listCover:any = [null,null,null,null,null,null]
      res.map(async (e: any, id: number) => {
        let file = await urlToObjectFile(e.imageUrl);
        console.log(e.imageUrl);
        // console.log(file);
        list[id] = e.imageUrl;
        // listCover[id] = file;
        // console.log(list);
        // setPhotoList([...photoList,e.imageUrl]);
        setSelectCoverImage([...selectCoverImage, file]);
      });
      setPhotoList(list);
      // setSelectCoverImage(listCover);
      // console.log("photoList");
      // console.log(photoList);
      // console.log("selectCoverImage");
      // console.log(selectCoverImage);
    });
  }, []);

  // useEffect(() => {
  //   console.log("Photo");
  //   console.log(photoList);
  //   console.log("Cover");
  //   console.log(selectCoverImage);
  // }, [selectCoverImage])

  const urlToObjectFile = async (url: string) => {
    const min = 1;
    const max = 99999999;
    const rand = Math.round(min + Math.random() * (max - min));

    let file = await fetch(url)
      .then((res) => res.blob())
      .then((blob) => new File([blob], rand.toString(), { type: blob.type }));
    return file;
  };

  const handlePhotoAdd = () => {
    //service
    // photoList.map(async (imageUrl) => {
    //   let content = ""
    //   if (imageUrl !== ""){
    //     await addAnnouncement({ setIsLoading, imageUrl, content });
    //   }
    // })

    setPhotoList([...photoList, ""]);
  };

  const { token } = useAuth();

  const handlePhotoRemove = async (AnnouncementId: number) => {
    //service
    let result = await deleteAnnouncement({ setIsLoading, AnnouncementId });
    if (result === false) {
      return;
    }

    const list = [...photoList];
    list.splice(AnnouncementId, 1);
    setPhotoList(list);
  };

  const imageHandler = (e: any, index: number) => {
    e.preventDefault();
    const reader = new FileReader();
    let oldList: any = [...photoList];
    if (!e.target.files[0] || e.target.files[0] === 0) {
      setPhotoList(oldList);
      return;
    }

    reader.onload = () => {
      if (reader.readyState === 2) {
        oldList[index] = reader.result;
        setPhotoList(oldList);
      }
    };

    let oldListBlob = [...selectCoverImage];
    setSelectCoverImage([...oldListBlob, e.target.files[0]]);
    reader.readAsDataURL(e.target.files[0]);
  };
  // Cover Image End

  const handleOnClickUpload = async () => {
    //let previewCoverImageBufferUrl: string = "";
    try {
      if (selectCoverImage !== []) {
        // previewCoverImageBufferUrl = await urlToObjectFile(
        //   previewCoverImage
        let file: Blob[] = selectCoverImage;
        file.map(async (file, index: number) => {
          let res = await fileUploadHandler({ token, file });
          let content = annoucements?.[index].content;
          let imageUrl = res;
          let editAnnouncementID = index + 1;
          await updateAnnouncement({
            setIsLoading,
            editAnnouncementID,
            imageUrl,
            content,
          });
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleFormContent = (e: any, index: number) => {
    // 1. Make a shallow copy of the items
    let items = [...annoucements!];
    // 2. Make a shallow copy of the item you want to mutate
    let item = { ...items[index] };
    // 3. Replace the property you're intested in
    item.content = e.target.value;
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    items[index] = item;
    // 5. Set the state to our new copy
    setAnnouncements(items);
  };

  return (
    <div className="container mx-auto">
      <div
        className="flex flex-col items-center mx-auto w-3/4 bg-slate-50  p-4"
        style={{ minHeight: "calc(100vh - 64px)" }}
      >
        <div className="border-0 border-red-200 w-full h-full mt-24">
          <div className="flex flex-col">
            {/* <div className="flex flex-row items-center">
              <div className="rounded-full h-24 w-24 flex justify-center items-center">
                {mockProfileImage == undefined ? (
                  <BiUserCircle className="flex justify-center items-center h-full w-full text-black" />
                ) : (
                  <img
                    src={mockProfileImage}
                    className="h-44 w-44 cover-full rounded-full"
                  />
                )}
              </div>
              <div className="flex flex-col ml-5">
                <h2>Admin</h2>
                <h4 className="text-gray-400">{mockDay}</h4>
              </div>
            </div> */}
            <br></br>
            <div className="flex flex-row items-baseline text-amber-500">
              <h1 className="text-3xl ">ประชาสัมพันธ์</h1>
              <h3 className="text-sm ml-2">สูงสุด 6 รูปภาพ</h3>
            </div>

            <div className="flex flex-col justify-center">
              {photoList.map((singleImage: any, index: number) => (
                <div
                  key={index}
                  className="flex flex-col justify-center w-full"
                >
                  <h4 className="mt-7">
                    <span className="text-amber-500">*</span>ประชาสัมพันธ์ที่{" "}
                    {index + 1}
                  </h4>
                  <div className="w-full h-96 bg-gray-100 border-2 border-gray-300 mt-2 flex flex-col justify-center items-center">
                    <div
                      className="m-2 rounded-t-sm flex justify-center items-center"
                      style={{ width: "300px", height: "200px" }}
                    >
                      {photoList[index] === "" ? (
                        <BsFillImageFill className="w-full h-full text-gray-400" />
                      ) : (
                        <img
                          src={photoList[index]}
                          className="w-full h-full cover-full"
                          alt="pictureAnnoucement"
                        />
                      )}
                    </div>
                    <input
                      type="file"
                      name="imgage-upload"
                      id="input"
                      accept="image/*"
                      className="mt-6 ml-20"
                      onChange={(e) => imageHandler(e, index)}
                    />
                    <div className="w-full mt-1"></div>
                    <h4 className="text-amber-500 m-2 text-base">
                      ขนาดแนะนำ 1200 x 800
                    </h4>
                  </div>
                  <div className="h-64 border border-gray-300 p-3 bg-white">
                    <textarea
                      className="
                            w-full
                            h-full
                            px-3
                            py-1.5
                            text-gray-700
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            focus:text-gray-700 focus:bg-white focus:border-amber-500 focus:outline-none "
                      id="exampleFormControlTextarea1"
                      rows={4}
                      placeholder="กรอกข้อมูลประชาสัมพันธ์..."
                      value={annoucements?.[index].content}
                      onChange={(e) => handleFormContent(e, index)}
                    ></textarea>
                  </div>
                  {photoList.length > 1 && (
                    <div className="flex justify-center">
                      <Button
                        className="mt-10 mb-10 w-60"
                        onClick={() => handlePhotoRemove(index)}
                        color="red"
                        mode="outline"
                      >
                        ลบประชาสัมพันธ์
                      </Button>
                    </div>
                  )}
                  {photoList.length - 1 === index && photoList.length < 6 && (
                    <div className="flex justify-center">
                      <Button
                        className="mt-10 mb-20 w-60"
                        onClick={handlePhotoAdd}
                        color="amber"
                        mode="outline"
                      >
                        เพิ่มรูปภาพ
                      </Button>
                    </div>
                  )}
                </div>
              ))}
              <div className="flex justify-center">
                <Button
                  className="w-60"
                  color={"green"}
                  onClick={handleOnClickUpload}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnoucementFormPage;
