// for admin pufa

// load extention ES7 + React/Redux/React-Native snippets
// type "tsrafce" and enter... it will create structure
// (mean "ts" = "typescript" , "rafce" = "react arrow function component export default")
// by Pop (delete if already read)

import React from "react";
import Card from "../HomePage/components/Card";

type Props = {};

const ProfilePage = (props: Props) => {
  // check at my homePage before proceed by pop (delete if already read)
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
          ไอป้อป ไออ้วน
        </div>
        <div className="border border-fGrey mt-6 border-opacity-10" />
        <div className="flex justify-between px-10">
          <div className="flex items-center space-x-4">
            <button className="min-w-fit w-1/2 h-10 m-2 px-4 bg-amber-600 hover:bg-amber-800 rounded-3xl text-white text-md">
              เพิ่มบทความใหม่
            </button>
            <button className="min-w-fit w-1/2 h-10 m-2 px-4 bg-amber-600 hover:bg-amber-800 rounded-3xl text-white text-md">
              ประชาสัมพันธ์
            </button>
            <button className="min-w-fit w-1/2 h-10 m-2 px-4 bg-amber-600 hover:bg-amber-800 rounded-3xl text-white text-md">
              จัดการบัญชีผู้ใช้
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <img
              src="https://static.xx.fbcdn.net/rsrc.php/v3/yl/r/tmaz0VO75BB.png?_nc_eui2=AeEuBM1eJuum2Q_T_tBTcfs0PeqkNBZWYnQ96qQ0FlZidMXgaqBeeoDM_h2m5VoxD9yhSPYbeUi25vsW0WHMMmlw"
              alt=""
              height="16"
              width="16"
            ></img>
            <button className="w-36 h-10 bg-amber-600 hover:bg-amber-800 rounded-3xl text-white text-md">
              แก้ไขโปรไฟล์
            </button>
          </div>
        </div>
        <div className="border border-fGrey border-opacity-10" />
      </div>
      <div>
        <div className="flex space-x-4 justify-start px-96">
          <button className="min-w-fit w-36 h-10 m-2 px-4 bg-amber-600 hover:bg-amber-800 text-white text-md">
            บทความ
          </button>
          <button className="min-w-fit w-36 h-10 m-2 px-4 bg-amber-600 hover:bg-amber-800 text-white text-md">
            ฉบับร่าง
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4 px-96">
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
      </div>
    </div>
  );
};

export default ProfilePage;
