import React, { useState } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";

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
  account: IAccount;
  setAccount: any;
  setIsEdit: any;
};

const EditForm = ({ account, setAccount, setIsEdit }: Props) => {
  const id = account.id;

  const [username, setUsername] = useState<string>(account.username);
  const [name, setName] = useState<string>(account.name);
  const [surname, setSurname] = useState<string>(account.surname);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let updateAccount = {
      pic: account.pic,
      id: account.id,
      username: username,
      name: name,
      surname: surname,
      role: account.role,
      status: account.status,
    };
    setAccount(updateAccount);
    setIsEdit(false);
  };

  return (
    <td className="pl-32">
      <tr className="h-8">{account.id}</tr>
      <tr className="h-8">
        <Input
          name="name"
          placeholder="Username"
          value={username}
          onChange={(e: any) => setUsername(e.target.value)}
          className={""}
        />
      </tr>
      <tr className="h-8">
        <Input
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e: any) => setName(e.target.value)}
          className={""}
        />
      </tr>
      <tr className="h-8">
        <Input
          name="name"
          placeholder="Surname"
          value={surname}
          onChange={(e: any) => setSurname(e.target.value)}
          className={""}
        />
      </tr>
      <tr className="h-8">{account.role}</tr>
      <tr className="h-8">{account.status}</tr>
      <Button className="" color={"amber"}>
        เปลี่ยนรหัสผ่าน
      </Button>
      <tr>
        <Button className="bg" onClick={handleSubmit} color={"amber"}>
          Submit
        </Button>
      </tr>
    </td>
  );
};

export default EditForm;
