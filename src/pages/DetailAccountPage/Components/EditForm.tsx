import React, { useState } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import axios, { config } from "../../../api/axios";
import {
  USER_DELETE_URL,
  USER_PUT_URL,
  USER_GET_URL,
  USER_GETALL_URL,
} from "../../../api/routes";
import { useAuth } from "../../../contexts/AuthContext";
interface IAccount {
  pic?: string;
  id: string;
  username: string;
  name: string;
  surname: string;
  role: string;
  status: string;
}

type Props = {
  account: any;
  setIsEdit: any;
};

const EditForm = ({ account, setIsEdit }: Props) => {
  const id = account.id;
  const nickName = account.nickName;
  const isBanned = account.isBanned;
  const role = account.role;
  const email = account.email;
  const { getUserEmail, token } = useAuth();
  const [username, setUsername] = useState<string>();
  const [firstName, setName] = useState<string>();
  const [lastName, setSurname] = useState<string>();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(firstName);
    await axios
      .patch(
        USER_PUT_URL,
        {
          email,
          firstName,
          lastName,
          nickName,
          isBanned,
          role,
        },
        config(token)
      )
      .then(
        (res) => {
          getUserEmail();
          alert("เปลี่ยนสำเร็จ");
          console.log(res);
          console.log(res.data);
        },
        (err) => {
          alert("เปลี่ยนไม่ได้");
        }
      );
    // let updateAccount = {
    //   pic: account.pic,
    //   id: account.id,
    //   username: email,
    //   name: firstName,
    //   surname: lastName,
    //   role: account.role,
    //   status: account.status,
    // };
    //setAccount(updateAccount);
    setIsEdit(false);
  };

  const handleCancel = () => {
    setIsEdit(false);
  };

  return (
    <td className="pl-28">
      <tr className="h-8">{account.id}</tr>
      <tr className="h-8">
        <Input
          name="name"
          placeholder="Username"
          value={email}
          onChange={(e: any) => setUsername(e.target.value)}
          className={"h-7"}
        />
      </tr>
      <tr className="h-8">
        <Input
          name="name"
          placeholder="Name"
          value={firstName}
          onChange={(e: any) => setName(e.target.value)}
          className={"h-7"}
        />
      </tr>
      <tr className="h-8">
        <Input
          name="name"
          placeholder="Surname"
          value={lastName}
          onChange={(e: any) => setSurname(e.target.value)}
          className={"h-7"}
        />
      </tr>
      <tr className="h-8">{account.role}</tr>
      <tr className="h-8">{account.status}</tr>
      <Button className="bg-gray-200" color={"amber"} disable={true}>
        เปลี่ยนรหัสผ่าน
      </Button>
      <tr>
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
      </tr>
    </td>
  );
};

export default EditForm;
