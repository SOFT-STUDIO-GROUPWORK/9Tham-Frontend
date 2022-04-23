import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

type Props = {};

const LoginPage = (props: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    login?.(username, password);
  };

  return (
    <div className="flex flex-row justify-around h-screen">
      <div className="min-h-screen flex flex-col justify-center mt-16">
        <div className="max-w-md w-full mx-auto text-center text-5xl">
          เข้าสู่ระบบ
        </div>
        <div className="max-w-md w-full mx-auto mt-4 px-20 py-16 border border-grey-300">
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
                name="username"
                required
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
                name="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="mt-2">
                <Link to="/login" className="text-sm text-gray-400">
                  <u>ลืมรหัสผ่าน?</u>
                </Link>
              </div>
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
              <p className="text-sm">ยังไม่ได้เป็นสมาชิก?&nbsp;</p>
              <Link to="/register" className="font-semibold text-sm">
                <u>คลิกเพื่อสมัคร</u>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
