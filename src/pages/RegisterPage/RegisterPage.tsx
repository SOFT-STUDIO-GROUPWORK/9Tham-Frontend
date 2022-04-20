import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import { useForm } from "react-hook-form";
type Props = {};

const RegisterPage = (props: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onTouched" });
  const [usernameReg, setUsernameReg] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [term, setTerm] = useState(false);

  const password = watch("password");

  const navigate = useNavigate();
  const onSubmit = (e: { [x: string]: any }) => {
    //e.preventDefault();
    // if(confirmpassword!=password){

    // }{ preventDefault: () => void }
    // const payload = {
    //   username: usernameReg,
    //   name,
    //   surname,
    //   password: passwordReg,
    //   confirmpassword: confirmpassword,
    //   term,
    // };

    // console.log("submit payload", payload);
    axios
      .post("https://localhost:7265/api/Auth/register", {
        email: usernameReg,
        password: passwordReg,
        firstName: name,
        lastName: surname,
        nickName: name + surname,
        role: 0,
      })
      .then(
        (response) => {
          alert("ลงทะเบียน สำเร็จ");
          console.log(response.status);
          console.log(response.data);
          navigate("/Login");
        },
        (error) => {
          alert("ชื่อผู้ใช้นี้ถูกใช้แล้ว");
          console.log(error);
        }
      );
  };
  return (
    <div className="flex flex-row justify-around flex-auto">
      <div className="min-h-screen flex flex-col justify-center mt-48">
        <div className="max-w-xl w-full mx-auto text-center text-5xl">
          สมัครสมาชิก
        </div>
        <div className="max-w-md w-full mx-auto mt-4 p-20 border border-grey-300">
          <form
            action=""
            className="space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
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
                required
                onChange={(e) => setUsernameReg(e.target.value)}
              />
            </div>
            <div className="flex flex-row flex-auto justify-between ">
              <div className="mr-2">
                <label
                  htmlFor=""
                  className="text-lg font-medium text-grey-600 block"
                >
                  ชื่อจริง
                </label>
                <input
                  type="text"
                  className="w-full p-1 border border-grey-300 rounded mt-1"
                  id="name"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor=""
                  className="text-lg font-medium text-grey-600 block"
                >
                  นามสกุล
                </label>
                <input
                  type="text"
                  className="w-full p-1 border border-grey-300 rounded mt-1"
                  id="surname"
                  required
                  onChange={(e) => setSurname(e.target.value)}
                />
              </div>
            </div>

            <div className="mr-2 relative">
              <label
                htmlFor=""
                className="text-lg font-medium text-grey-600 block"
              >
                รหัสผ่าน
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-1 border border-grey-300 rounded mt-1 "
                {...register("password", {
                  required: "จำเป็นต้องกรอก",
                  minLength: {
                    value: 8,
                    message: "รหัสผ่านขั้นต่ำ 8 ตัวอักษร",
                  },
                  maxLength: {
                    value: 20,
                    message: "รหัสผ่านไม่เกิน 20 ตัวอักษร",
                  },
                })}
                required
                onChange={(e) => setPasswordReg(e.target.value)}
              />
              {errors.password && (
                <span className="text-sm text-red-500">
                  {errors.password.message}
                </span>
              )}
            </div>
            <div>
              <label
                htmlFor=""
                className="text-lg font-medium text-grey-600 block"
              >
                ยืนยันรหัสผ่าน
              </label>
              <input
                type="password"
                className="w-full p-1 border border-grey-300 rounded mt-1"
                id="confirmpassword"
                onPaste={(e) => {
                  e.preventDefault();
                  return false;
                }}
                {...register("confirmPassword", {
                  required: "จำเป็นต้องกรอก",
                  validate: (value) =>
                    value === password || "ไม่ตรงกับรหัสผ่านที่ใช้",
                })}
                required
                onChange={(e) => setConfirmpassword(e.target.value)}
              />
              {errors.confirmPassword && (
                <span className="text-sm text-red-500">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-amber-600 rounded"
                id="term"
                required
                onChange={(e) => setTerm(e.target.checked)}
              />
              <label htmlFor="" className="ml-2 text-sm text-amber-600">
                ยอมรับนโยบายความเป็นส่วนตัว
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-amber-600 hover:bg-amber-800 rounded-3xl text-white text-md"
              >
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
