import React, { useState } from "react";

type Props = {};

const LoginPage = (props: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //console.log("render username", username, password);

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const payload = {
      username,
      password,
    };

    console.log("submit payload", payload);
  };
  return (
    <div className="flex flex-row justify-around">
      <div className="min-h-screen flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto text-center text-5xl">
          เข้าสู่ระบบ
        </div>
        <div className="max-w-md w-full mx-auto mt-4 p-20 border border-grey-300">
          <form action="" className="space-y-6" onSubmit={onSubmit}>
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
                id="username"
                onChange={(e) => setUsername(e.target.value)}
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
                type="password"
                className="w-full p-1 border border-grey-300 rounded mt-1"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <a href="" className="font-semibold text-sm">
                ลืมรหัสผ่าน?
              </a>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-amber-600 hover:bg-amber-800 rounded-3xl text-white text-md"
              >
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
