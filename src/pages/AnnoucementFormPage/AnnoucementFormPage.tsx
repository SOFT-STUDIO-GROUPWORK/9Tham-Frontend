// for admin gut

// load extention ES7 + React/Redux/React-Native snippets
// type "tsrafce" and enter... it will create structure
// (mean "ts" = "typescript" , "rafce" = "react arrow function component export default")
// by Pop (delete if already read)

import React, { useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import { BsFillImageFill } from "react-icons/bs";
import Button from "../../components/Button";

type Props = {};

const mockProfileImage = undefined;
const mockDay = "4 April 2022";

const AnnoucementFormPage = (props: Props) => {
  const [photoList, setPhotoList] = useState([{ photo: "" }]);

  const handlePhotoAdd = () => {
    setPhotoList([...photoList, { photo: "" }]);
  };

  const handlePhotoRemove = (index: number) => {
    const list = [...photoList];
    list.splice(index, 1);
    setPhotoList(list);
  };

  const [previewPhoto, setPreviewPhoto] = useState<any>(undefined);

  const imageHandler = (e: any, index: number) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreviewPhoto(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div>
      <div
        className="flex flex-col items-center mx-auto w-3/4 bg-slate-50  p-4"
        style={{ minHeight: "calc(100vh - 64px)" }}
      >
        <div className="border-0 border-red-200 w-full h-full mt-24">
          <div className="flex flex-col">
            <div className="flex flex-row items-center">
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
            </div>
            <br></br>
            <div className="flex flex-row items-baseline text-amber-500">
              <h1 className="text-3xl ">ประชาสัมพันธ์</h1>
              <h3 className="text-sm ml-2">สูงสุด 6 รูปภาพ</h3>
            </div>

            <div className="flex flex-col justify-center">
              {photoList.map((singleImage, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-center w-full"
                >
                  <h2 className="mt-7">*รูปที่ {index + 1}</h2>
                  <div className="w-full h-60 bg-gray-100 border-2 border-gray-300 mt-2 flex flex-col justify-center items-center">
                    <div className="m-2 rounded-t-sm h-28 w-52 flex justify-center items-center">
                      {previewPhoto == undefined ? (
                        <BsFillImageFill className="w-full h-full text-gray-400" />
                      ) : (
                        <img
                          src={previewPhoto}
                          className="w-full h-full cover-full"
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
                    <h4 className="text-amber-500 m-2">ขนาดแนะนำ 1200 x 800</h4>
                  </div>
                  {photoList.length > 1 && (
                    <div className="flex justify-center">
                      <Button
                        className="mt-10 mb-10 w-60"
                        onClick={() => handlePhotoRemove(index)}
                        color="red"
                        mode="outline"
                      >
                        ลบรูปภาพ
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnoucementFormPage;
