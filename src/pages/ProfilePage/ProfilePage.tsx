// for admin pufa

// load extention ES7 + React/Redux/React-Native snippets
// type "tsrafce" and enter... it will create structure
// (mean "ts" = "typescript" , "rafce" = "react arrow function component export default")
// by Pop (delete if already read)

import React, { useState } from "react";
import Card from "../HomePage/components/Card";
import { Link } from "react-router-dom";
import "./ProfilePage.css";

type Props = {};
const ProfilePage = (props: Props) => {
  const [toggleState, setToggleState] = useState(1);

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
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXLvPB9Xy8_K4eyl8Lcx7daoExzr6l0spSdA&usqp=CAU"
              className="object-cover border-4 border-amber-600 w-full h-full rounded-full"
              alt="cover"
            />
          </div>
        </div>
        <div className="text-center mt-6 text-3xl font-bold text-fBlack">
          จารย์แดง
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
              className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggleTab(1)}
            >
              บทความ
            </button>
            <button
              className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggleTab(2)}
            >
              ฉบับร่าง
            </button>
          </div>
          <div className="w-full content-tabs">
            <div
              className={
                toggleState === 1
                  ? "w-full content  active-content"
                  : "w-full content"
              }
            >
              <Card
                title="เข้าวัดทำบุญ ได้อะไร"
                description="การเข้าวัดทำบุญ เป็นสิ่งที่ดี ในการทำให้เราเข้าใจถึงแก่นแท้..."
                type="ความรู้ธรรมะ"
              />
              <Card
                title="เข้าวัดทำบุญ ได้อะไร"
                description="การเข้าวัดทำบุญ เป็นสิ่งที่ดี ในการทำให้เราเข้าใจถึงแก่นแท้..."
                type="ความรู้ธรรมะ"
              />
              <Card
                title="เข้าวัดทำบุญ ได้อะไร"
                description="การเข้าวัดทำบุญ เป็นสิ่งที่ดี ในการทำให้เราเข้าใจถึงแก่นแท้..."
                type="ความรู้ธรรมะ"
              />
            </div>

            <div
              className={
                toggleState === 2 ? "content  active-content" : "content"
              }
            >
              <h2>Content 2</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
