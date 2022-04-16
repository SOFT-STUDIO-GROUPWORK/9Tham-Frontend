// for admin gut

// load extention ES7 + React/Redux/React-Native snippets
// type "tsrafce" and enter... it will create structure
// (mean "ts" = "typescript" , "rafce" = "react arrow function component export default")
// by Pop (delete if already read)

import React, { useState } from "react";

type Props = {};

const AnnoucementFormPage = (props: Props) => {
  return (
    <div>
      <div
        className="flex flex-col items-center mx-auto w-3/4 bg-slate-50  p-4"
        style={{ minHeight: "calc(100vh - 64px)" }}
      >
        <div className="border-0 border-red-200 w-full h-60 mt-24">
          <div className="flex flex-col">
            <div className="flex flex-row items-center">
              <div className="bg-amber-500 rounded-full h-12 w-12"></div>
              <div className="flex flex-col ml-5">
                <h2>Admin</h2>
                <h4>4 April 2022</h4>
              </div>
            </div>
            <br></br>
            <div className="flex flex-row items-end">
              <h1 className="text-3xl">ประชาสัมพันธ์</h1>
              <h3 className="text-sm ml-2">สูงสุด 6 รูปภาพ</h3>
            </div>
            <div>
              <h2 className="mt-7">*รูปที่ 1</h2>
              <div className="w-full h-60 bg-gray-100 border-2 border-gray-300 mt-2 flex flex-col justify-center items-center">
                <div className="m-2 bg-gray-400 rounded-t-sm h-28 w-52"></div>
                <button className="bg-amber-500 rounded-full w-40 h-10 flex justify-center items-center text-white m-2">
                  อัพรูปภาพ
                </button>
                <h4 className="text-amber-500 m-2">ขนาดแนะนำ 1200 x 800</h4>
              </div>
            </div>
            <div className="flex justify-center">
              <button className="rounded-full w-60 h-16 items-center text-amber-500 mt-10 border-2 border-amber-500">
                เพิ่มรูปภาพ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnoucementFormPage;
