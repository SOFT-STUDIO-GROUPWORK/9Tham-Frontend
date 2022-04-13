import React from "react";

type Props = {};

const LoginPage = (props: Props) => {
  return (
    <div className="flex flex-row justify-around">
      <div>รูปอาจารย์แดงสุดเท่</div>
      <div className="min-h-screen flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto text-center text-5xl">
          เข้าสู่ระบบ
        </div>
        <div className="max-w-md w-full mx-auto mt-4 p-20 border border-grey-300">
          <form action="" className="space-y-6">
            <div>
              <label
                htmlFor=""
                className="text-lg font-medium text-grey-600 block"
              >
                ชื่อบัญชีผู้ใช้
              </label>
              <input
                type="text"
                className="w-full p-1 border border-grey-300 rounded mt-1"
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="text-lg font-medium text-grey-600 block"
              >
                รหัสผ่าน
              </label>
              <input
                type="text"
                className="w-full p-1 border border-grey-300 rounded mt-1"
              />
            </div>
            <div>
              <a href="" className="font-semibold text-sm">
                ลืมรหัสผ่าน?
              </a>
            </div>

            <div>
              <button className="w-full py-2 px-4 bg-amber-600 hover:bg-amber-800 rounded-3xl text-white text-md">
                เข้าสู่ระบบ
              </button>
            </div>
            <div className="flex items-center">
              <div>ยังไม่ได้เป็นสมาชิก?</div>
              <a href="" className="font-semibold text-sm">
                คลิ๊กเพื่อสมัคร
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
