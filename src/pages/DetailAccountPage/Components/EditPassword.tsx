import React, { useState } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";

type Props = {
  setPassword: any;
  setIsEditPassword: any;
};

const EditPassword = ({ setPassword, setIsEditPassword }: Props) => {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setPassword(newPassword);
    setIsEditPassword(false);
  };

  const handleCancel = () => {
    setIsEditPassword(false);
  };

  return (
    <td className="">
      <tr className="h-8">
        <Input
          name="name"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e: any) => setOldPassword(e.target.value)}
          className={"h-7"}
        />
      </tr>
      <tr className="h-8">
        <Input
          name="name"
          placeholder="New Password"
          value={newPassword}
          onChange={(e: any) => setNewPassword(e.target.value)}
          className={"h-7"}
        />
      </tr>
      <tr className="h-8">
        <Input
          name="name"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e: any) => setConfirmPassword(e.target.value)}
          className={"h-7"}
        />
      </tr>
      <tr>
        <Button className="bg mt-5 w-30" onClick={handleCancel} color={"red"}>
          Cancel
        </Button>
        <Button
          className="ml-2 mt-5 w-30 bg-gray-200"
          onClick={handleSubmit}
          color={"green"}
          disable={!(newPassword == confirmPassword && newPassword != "")}
        >
          Submit
        </Button>
      </tr>
    </td>
  );
};

export default EditPassword;
