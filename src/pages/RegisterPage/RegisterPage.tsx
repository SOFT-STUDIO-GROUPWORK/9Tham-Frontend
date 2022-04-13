import React from "react";

type Props = {};

const RegisterPage = (props: Props) => {
  return (
    <div className="flex flex-row justify-around flex-auto">
      <div>รูปอาจารย์แดงสุดเท่</div>
      <div className="min-h-screen flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto text-center text-5xl">
          สมัครสมาชิก
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
              <div className="flex justify-between justify-items-start">
                <label
                  htmlFor=""
                  className="text-lg font-medium text-grey-600 block"
                >
                  ชื่อจริง
                </label>
                <label
                  htmlFor=""
                  className="text-lg font-medium text-grey-600 block"
                >
                  นามสกุล
                </label>
              </div>
              <div className="flex justify-between">
                <input
                  type="text"
                  className="w-full p-1 border border-grey-300 rounded mt-1"
                />
                <input
                  type="text"
                  className="w-full p-1 border border-grey-300 rounded mt-1"
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between justify-items-start">
                <label
                  htmlFor=""
                  className="text-lg font-medium text-grey-600 block"
                >
                  รหัสผ่าน
                </label>
                <label
                  htmlFor=""
                  className="text-lg font-medium text-grey-600 block"
                >
                  ยืนยันรหัสผ่าน
                </label>
              </div>
              <div className="flex justify-between">
                <input
                  type="text"
                  className="w-full p-1 border border-grey-300 rounded mt-1"
                />
                <input
                  type="text"
                  className="w-full p-1 border border-grey-300 rounded mt-1"
                />
              </div>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-amber-600 rounded"
                id=""
              />
              <label htmlFor="" className="ml-2 text-sm text-amber-600">
                ยอมรับนโยบายความเป็นส่วนตัว
              </label>
            </div>

            <div>
              <button className="w-full py-2 px-4 bg-amber-600 hover:bg-amber-800 rounded-3xl text-white text-md">
                ลงทะเบียน
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
