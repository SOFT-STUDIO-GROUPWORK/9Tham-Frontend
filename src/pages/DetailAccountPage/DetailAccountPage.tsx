import React, { useState } from "react";

type Props = {};
const Options: string[] = ["User", "Admin"];
interface IAccount {
  pic?: string;
  id: string;
  username: string;
  name: string;
  surname: string;
  role: string;
  status: string;
}

const DetailAccountPage = (props: Props) => {
  // check at my homePage before proceed by pop (delete if already read)
  const [Account, setAccount] = useState<IAccount[]>([]);
  return (
    <div>
      <div
        className="flex flex-col items-center mx-auto w-3/4 bg-slate-50  p-4"
        style={{ minHeight: "calc(100vh - 64px)" }}
      >
        <div className="border-0 border-red-200 w-full h-60 mt-24">
          <div className="flex flex-row mx-28 my-12">
            <div className="flex flex-col flex-auto">
              <div className="text-2xl">บัญชีผู้ใช้งาน</div>
              <div className="mt-10 bg-amber-500 rounded-full w-52 h-52"></div>
            </div>
            <div className="flex flex-col flex-auto">
              <div className="text-2xl"></div>
            </div>
            <div className="flex flex-col flex-auto">
              <div className="flex flex-row items-center">
                <div className="text-2xl">ข้อมูลทั่วไป</div>
                <button className="ml-2 bg-amber-500 w-5 h-5 rounded-sm"></button>
              </div>

              <br></br>
              <tr>
                <td>
                  <tr>ID</tr>
                  <tr>บัญชีผู้ใช้</tr>
                  <tr>ชื่อ</tr>
                  <tr>สกุล</tr>
                  <tr>กลุ่มผู้ใช้</tr>
                  <tr>สถานะ</tr>
                  <tr>รหัสผ่าน</tr>
                </td>
                <td className="pl-32">
                  <tr>ID</tr>
                  <tr>บัญชีผู้ใช้</tr>
                  <tr>ชื่อ</tr>
                  <tr>สกุล</tr>
                  <tr>กลุ่มผู้ใช้</tr>
                  <tr>สถานะ</tr>
                  <button className="bg-amber-500 rounded-full text-white text-sm w-28">
                    เปลี่ยนรหัสผ่าน
                  </button>
                </td>
              </tr>
              <br></br>
              <br></br>
              <div className="text-2xl">ตั้งค่าบัญชีผู้ใช้</div>
              <br></br>
              <tr>
                <td>
                  <tr>ลบบัญชีผู้ใช้</tr>
                </td>
                <td className="pl-28">
                  <button className="bg-amber-500 rounded-full text-white text-sm w-24">
                    ลบบัญชีผู้ใช้
                  </button>
                </td>
              </tr>
            </div>
            <div className="flex flex-col flex-auto">
              <div className="text-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailAccountPage;
