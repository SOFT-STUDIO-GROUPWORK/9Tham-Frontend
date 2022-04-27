import { useState } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";

import { useAuth } from "../../../contexts/AuthContext";

import { updateAccount } from "../../../services/accountsService";
import IAccount from "../../../interfaces/IAccount";

type Props = {
  account: IAccount;
  setIsEdit: any;
  setIsLoading: any;
};

const EditForm = ({ account, setIsEdit, setIsLoading }: Props) => {
  const initialAccount = {
    id: account.id,
    firstName: account.firstName,
    lastName: account.lastName,
    nickName: account.nickName,
    email: account.email,
    role: account.role,
    isBanned: account.isBanned,
    imageUrl: account.imageUrl,
    bannerUrl: account.bannerUrl,
  };

  const { token, getUserMySelf } = useAuth();

  const [editFormData, setEditFormData] = useState<IAccount>(initialAccount);

  const smallFormChange = (event: any) => {
    let newFormData: IAccount = { ...editFormData }; // beware! addFromData and editFormData

    let fieldName: string = event.target.getAttribute("name");
    let fieldValue: string = event.target.value;
    // change to variable attribute

    if (fieldName === "firstName") {
      newFormData.firstName = fieldValue;
    } else if (fieldName === "lastName") {
      newFormData.lastName = fieldValue;
    } else if (fieldName === "email") {
      newFormData.email = fieldValue;
    } else if (fieldName === "role") {
      newFormData.role = parseInt(fieldValue);
    } else if (fieldName === "isBanned") {
      if (fieldValue === "true") {
        newFormData.isBanned = true;
      } else if (fieldValue === "false") {
        newFormData.isBanned = false;
      }
    }
    return newFormData;
  };

  const handleEditFormChange = (event: any) => {
    event.preventDefault();

    let newFormData = smallFormChange(event);
    console.log(newFormData);

    setEditFormData(newFormData);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    let email = editFormData.email;
    try {
      let res = await updateAccount({
        token,
        setIsLoading,
        email,
        editFormData,
      });
      await getUserMySelf()
      alert("อัพเดตข้อมูลทั่วไปสำเร็จ");
      console.log(res);
    } catch (err) {
      console.log(err);
      alert("ไม่สามารถเปลี่ยนได้ กรุณาลองใหม่อีกครั้ง");
    }
    setIsEdit(false);
  };

  const handleCancel = () => {
    setIsEdit(false);
  };

  return (
    <td className="pl-28  w-80">
      <tr className="h-12 flex flex-col justify-center">
        <p className="pl-2"> {account.id}</p>
      </tr>
      <tr className="h-12 flex flex-col justify-center">
        <p className="pl-2"> {account.email}</p>
      </tr>
      <tr className="h-12 flex flex-col justify-center">
        <Input
          name="firstName"
          placeholder="กรอกชื่อจริง"
          value={editFormData.firstName}
          onChange={handleEditFormChange}
          className={"py-1.5"}
        />
      </tr>
      <tr className="h-12 flex flex-col justify-center">
        <Input
          name="lastName"
          placeholder="กรอกนามสกุล"
          value={editFormData.lastName}
          onChange={handleEditFormChange}
          className={"py-1.5"}
        />
      </tr>
      <tr className="h-12 flex flex-col justify-center">
        {" "}
        <p className="pl-2">{account.role === 0 ? "ทั่วไป" : "ผู้ดูแลระบบ"}</p>
      </tr>
      {/* <tr className="h-12">{account.status}</tr> */}
      <div className="pl-1">
        <Button className="bg-gray-200" color={"amber"} disable={true}>
          เปลี่ยนรหัสผ่าน
        </Button>
      </div>

      <tr>
        <div className="pl-1">
          <Button className="bg mt-5 w-30" onClick={handleCancel} color={"red"}>
            Cancel
          </Button>
          <Button
            className="bg ml-2 mt-5 w-30"
            onClick={handleSubmit}
            color={"green"}
            //disable={!(firstName == "" || lastName == "" || username == "")}
          >
            Submit
          </Button>
        </div>
      </tr>
    </td>
  );
};

export default EditForm;
