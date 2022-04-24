import React, { useEffect, useState } from "react";
import { BiEdit, BiImageAdd, BiUserCircle } from "react-icons/bi";
import Input from "..//../components/Input";
import EditForm from "./Components/EditForm";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../../components/Button";
import EditPassword from "./Components/EditPassword";

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

const mockAccount = {
  pic: "pic",
  id: "1",
  username: "Poppy",
  name: "Popeyeza",
  surname: "Jubjub",
  role: "Admin",
  status: "Active",
};

const DetailAccountPage = (props: Props) => {
  // check at my homePage before proceed by pop (delete if already read)

  const [isLoading, setIsLoading] = useState(false);

  //edit account
  const [account, setAccount] = useState<IAccount>(mockAccount);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  //edit password
  const [password, setPassword] = useState<string>("");
  const [isEditPassword, setIsEditPassword] = useState<boolean>(false);

  const { getUserEmail } = useAuth();

  const handleEdit = () => {
    setIsEditPassword(false);
    setIsEdit(true);
  };

  const handleEditPassword = () => {
    setIsEditPassword(true);
    setIsEdit(false);
  };

  //IMG
  const mockImg =
    "https://storage.thaipost.net/main/uploads2/photos/big/20200915/image_big_5f605cae84507.jpg";

  const [profileImage, setProfileImage] = useState<any>(undefined);

  const imageHandler = (e: any) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImage(reader.result);
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
        <div className="border-0 border-red-200 w-full h-60 mt-24">
          <div className="flex flex-row mx-28 my-12">
            <div className="flex flex-col flex-auto">
              <div className="text-2xl">บัญชีผู้ใช้งาน</div>
              <div className="flex justify-center items-center mt-10 rounded-full w-48 h-48 border-4 border-amber-500">
                {profileImage == undefined ? (
                  <BiUserCircle className="flex justify-center items-center h-40 w-40 text-gray-400" />
                ) : (
                  <img
                    src={profileImage}
                    className="h-44 w-44 cover-full rounded-full"
                  />
                )}
              </div>
              <input
                type="file"
                name="imgage-upload"
                id="input"
                accept="image/*"
                className="mt-6"
                onChange={imageHandler}
              />
              <div className="w-full mt-1">
                <label htmlFor="input">
                  {profileImage == undefined ? (
                    <div className="flex flex-row">
                      <BiImageAdd className="mr-2" />
                      Choose your photo
                    </div>
                  ) : (
                    <div></div>
                  )}
                </label>
              </div>
            </div>
            <div className="flex flex-col flex-auto">
              <div className="text-2xl"></div>
            </div>
            <div className="flex flex-col flex-auto">
              <div className="flex flex-row items-center">
                <div className="text-2xl">ข้อมูลทั่วไป</div>
                <Button
                  className="text-amber-600 bg-white"
                  color={""}
                  onClick={handleEdit}
                  disable={isEditPassword}
                >
                  <BiEdit className="w-full h-5" />
                </Button>
              </div>

              <br></br>
              <tr>
                <td>
                  <tr className="h-8">ID</tr>
                  <tr className="h-8">บัญชีผู้ใช้</tr>
                  <tr className="h-8">ชื่อ</tr>
                  <tr className="h-8">สกุล</tr>
                  <tr className="h-8">กลุ่มผู้ใช้</tr>
                  <tr className="h-8">สถานะ</tr>
                  <tr className="h-8">รหัสผ่าน</tr>
                  <tr className="h-8"></tr>
                </td>
                {!isEdit ? (
                  <td className="pl-32">
                    <tr className="h-8">{account.id}</tr>
                    <tr className="h-8">{account.username}</tr>
                    <tr className="h-8">{account.name}</tr>
                    <tr className="h-8">{account.surname}</tr>
                    <tr className="h-8">{account.role}</tr>
                    <tr className="h-8">{account.status}</tr>
                    <tr></tr>
                    {!isEditPassword ? (
                      <Button
                        className=""
                        color={"amber"}
                        onClick={handleEditPassword}
                      >
                        เปลี่ยนรหัสผ่าน
                      </Button>
                    ) : (
                      <EditPassword
                        setPassword={setPassword}
                        setIsEditPassword={setIsEditPassword}
                      />
                    )}
                  </td>
                ) : (
                  <EditForm
                    account={account}
                    setAccount={setAccount}
                    setIsEdit={setIsEdit}
                  />
                )}
              </tr>
              <br></br>
              <div className="text-2xl">ตั้งค่าบัญชีผู้ใช้</div>
              <br></br>
              <tr>
                <td>
                  <tr>ลบบัญชีผู้ใช้</tr>
                </td>
                <td className="pl-28">
                  {!isEdit && !isEditPassword ? (
                    <Button
                      className="w-30 h-9"
                      color={"amber"}
                      disable={isEdit || isEditPassword}
                    >
                      ลบบัญชีผู้ใช้
                    </Button>
                  ) : (
                    <Button
                      className="w-30 h-9 bg-gray-200"
                      color={"amber"}
                      disable={isEdit || isEditPassword}
                    >
                      ลบบัญชีผู้ใช้
                    </Button>
                  )}
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
