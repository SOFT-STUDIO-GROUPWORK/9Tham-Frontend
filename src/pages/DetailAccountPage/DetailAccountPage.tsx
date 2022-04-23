import React, { useState } from "react";
import Button from "../../components/Button";
import { BiEdit } from "react-icons/bi";
import Input from "..//../components/Input";
import EditForm from "./Components/EditForm";

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
  const [account, setAccount] = useState<IAccount>(mockAccount);
  const [isLoading, setIsLoading] = useState(false);

  const [isEdit, setIsEdit] = useState<boolean>(false);

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
                <Button
                  className="text-amber-600"
                  color={""}
                  onClick={() => setIsEdit(!isEdit)}
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
                    <Button className="" color={"amber"}>
                      เปลี่ยนรหัสผ่าน
                    </Button>
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
              <br></br>
              <div className="text-2xl">ตั้งค่าบัญชีผู้ใช้</div>
              <br></br>
              <tr>
                <td>
                  <tr>ลบบัญชีผู้ใช้</tr>
                </td>
                <td className="pl-28">
                  <Button className="" color={"amber"}>
                    ลบบัญชีผู้ใช้
                  </Button>
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
