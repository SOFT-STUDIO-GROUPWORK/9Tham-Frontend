import React, { useEffect, useState } from "react";
import { BiEdit, BiImageAdd, BiUserCircle } from "react-icons/bi";
import Input from "..//../components/Input";
import EditForm from "./Components/EditForm";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../../components/Button";
import EditPassword from "./Components/EditPassword";
import { deleteAccount } from "../../services/accountsService";
import { useNavigate } from "react-router-dom";

import $ from "jquery";
import { fileUploadHandler } from "./services/uploadProfileService";
import { updateAccount } from "../../services/accountsService"

type Props = {};

const DetailAccountPage = (props: Props) => {
  // check at my homePage before proceed by pop (delete if already read)

  const [isLoading, setIsLoading] = useState(false); // dummy loading

  //edit account
  const { user, token, logout , getUserMySelf } = useAuth();
  const [account, setAccount] = useState(user);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  //edit password
  const [password, setPassword] = useState<string>("");
  const [isEditPassword, setIsEditPassword] = useState<boolean>(false);

  const navigate = useNavigate();

  // Cover Image
  const [selectCoverImage, setSelectCoverImage] = useState<undefined | Blob>();
  const [previewCoverImage, setPreviewCoverImage] = useState<string>(user?.imageUrl);

  useEffect(() => {
    if (!selectCoverImage) {
      setPreviewCoverImage("");
      return;
    }

    // for Preview Image Url
    const objectUrl: string = URL.createObjectURL(selectCoverImage);
    setPreviewCoverImage(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectCoverImage]);

  // Cover Image start
  const fileSelectHandler = (event: any) => {
    if (!event.target.files[0] || event.target.files[0] === 0) {
      setSelectCoverImage(undefined);
      return;
    }
    setSelectCoverImage(event.target.files[0]);
  };

  const handleOnClickUpload = async () => {
    //let previewCoverImageBufferUrl: string = "";
    try {
      if (selectCoverImage !== undefined) {
        // previewCoverImageBufferUrl = await urlToObjectFile(
        //   previewCoverImage
        let file: Blob = selectCoverImage;
        let res = await fileUploadHandler({ file, token });
        console.log(res);
        let email = account.email

        const editFormData = {
          id: account.id,
          firstName: account.firstName,
          lastName: account.lastName,
          nickName: account.nickName,
          email: account.email,
          role: account.role,
          isBanned: account.isBanned,
          imageUrl: res,
          bannerUrl: account.bannerUrl,
        };

        console.log(editFormData);

        await updateAccount({setIsLoading, token, email, editFormData})
        await getUserMySelf();
      }
    } catch (err) {
      console.error(err);
    }
  };
  // Cover Image End

  const handleEdit = () => {
    setIsEditPassword(false);
    setIsEdit(true);
  };

  const handleEditPassword = () => {
    setIsEditPassword(true);
    setIsEdit(false);
  };

  const handleDeleteClick = async (email: string) => {
    // service deleteAccount()
    console.log(email);
    let result = await deleteAccount({ token, setIsLoading, email });
    if (result === false) {
      return;
    }
    await logout();
    alert("ลบบัญชีผู้ใช้สำเร็จ");
    navigate("/login");
  };

  return (
    <div>
      <div
        className="flex flex-col items-center mx-auto w-3/4 bg-slate-50  p-4"
        style={{ minHeight: "calc(100vh - 64px)" }}
      >
        <div className="border-0 border-red-300 w-full h-60 mt-24">
          <div className="flex flex-row mx-28 my-12">
            <div className="flex flex-col flex-auto items-center">
              <div className="w-48 my-3 flex flex-col items-center bg-slate-50">
                {/* input picture */}
                <div className="relative flex justify-center items-center mt-10 rounded-full w-48 h-48 border-4 border-amber-500">
                  {selectCoverImage ? (
                    <img
                      id="img-preview"
                      src={previewCoverImage}
                      className="object-cover h-44 w-44 cover-full rounded-full"
                      alt=""
                    />
                  ) : (
                    <BiUserCircle className="flex justify-center items-center h-36 w-36 text-gray-400" />
                  )}
                </div>
                <div className="mt-8 w-56 flex flex-row items-center justify-center">
                  <input
                    type="file"
                    id="previewImageInputFile1"
                    className=" shadow text-center border grow "
                    onChange={fileSelectHandler}
                  />
                  {selectCoverImage ? (
                    <Button
                      onClick={() => {
                        setSelectCoverImage(undefined);
                        $("#previewImageInputFile1").val("");
                      }}
                      className="self-stretch w-12 py-2 bg-gray-50 border-gray-500 text-gray-800 border "
                      children="X"
                      color="red"
                    />
                  ) : (
                    <></>
                  )}
                </div>

                {selectCoverImage ? (
                  <div className="w-56 mt-1 flex flex-row items-center justify-center">
                    <Button
                      onClick={handleOnClickUpload}
                      className="self-stretch bg-green-500 w-full"
                      children="อัพโหลดรูปภาพ"
                      color="green"
                    />
                  </div>
                ) : (
                  <></>
                )}

                <p className="w-full text-center mt-2 text-amber-500">
                  ขนาดแนะนำ: จัตุรัส ไม่เกิน 400 x 400 px (Ratios 1:1)
                </p>
              </div>
            </div>
            <div className="flex flex-col flex-auto">
              <div className="text-2xl"></div>
            </div>
            <div className="flex flex-col flex-auto">
              <div className="flex flex-row items-center">
                <div className="text-2xl">ข้อมูลทั่วไป</div>
                {isEdit === false ? (
                  <>
                    {" "}
                    <Button
                      className="border-0"
                      color="amber"
                      onClick={handleEdit}
                      mode="outline"
                      disable={isEditPassword}
                    >
                      <BiEdit className="w-full h-6" />
                    </Button>
                  </>
                ) : (
                  <></>
                )}
              </div>

              <br></br>
              <tr>
                <td>
                  <tr className="h-12 flex flex-col justify-center">ID</tr>
                  <tr className="h-12 flex flex-col justify-center">
                    บัญชีผู้ใช้
                  </tr>
                  <tr className="h-12 flex flex-col justify-center">ชื่อ</tr>
                  <tr className="h-12 flex flex-col justify-center">สกุล</tr>
                  <tr className="h-12 flex flex-col justify-center">
                    กลุ่มผู้ใช้
                  </tr>
                  {/* <tr className="h-8">สถานะ</tr> */}
                  <tr className="h-12 flex flex-col justify-center">
                    รหัสผ่าน
                  </tr>
                  <tr className="h-12 flex flex-col justify-center"></tr>
                </td>
                {!isEdit ? (
                  <td className="pl-32 w-80">
                    <tr className="h-12 flex flex-col justify-center">
                      {user?.id}
                    </tr>
                    <tr className="h-12 flex flex-col justify-center">
                      {user?.email}
                    </tr>
                    <tr className="h-12 flex flex-col justify-center">
                      {user?.firstName}
                    </tr>
                    <tr className="h-12 flex flex-col justify-center">
                      {user?.lastName}
                    </tr>
                    <tr className="h-12 flex flex-col justify-center">
                      {user?.role === 0 ? "ทั่วไป" : "ผู้ดูแลระบบ"}
                    </tr>
                    {/* <tr className="h-8">{user?.isBanned}</tr> */}
                    <tr className="flex flex-col justify-center"></tr>
                    {!isEditPassword ? (
                      <div className="h-12 flex flex-col justify-center">
                        <Button
                          className="w-36 bg-gray-50 text-gray-600 border-gray-600 hover:border-amber-500 hover:text-amber-500"
                          color={"amber"}
                          mode="outline"
                          onClick={handleEditPassword}
                        >
                          เปลี่ยนรหัสผ่าน
                        </Button>
                      </div>
                    ) : (
                      <EditPassword
                        setPassword={setPassword}
                        setIsEditPassword={setIsEditPassword}
                      />
                    )}
                  </td>
                ) : (
                  <EditForm
                    account={user}
                    setIsEdit={setIsEdit}
                    setIsLoading={setIsLoading}
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
                  <Button
                    className={
                      !isEdit && !isEditPassword
                        ? `w-30 h-9 `
                        : `w-30 h-9 bg-gray-200`
                    }
                    color={"red"}
                    disable={isEdit || isEditPassword}
                    onClick={handleDeleteClick}
                    mode="outline"
                  >
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
