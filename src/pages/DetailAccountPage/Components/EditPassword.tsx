import React, { useState } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { useAuth } from "../../../contexts/AuthContext";
import axios, { config } from "../../../api/axios";
import { USER_CHANGEPASS_URL } from "../../../api/routes";

type Props = {
  setPassword: any;
  setIsEditPassword: any;
};

const EditPassword = ({ setPassword, setIsEditPassword }: Props) => {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const { user, token } = useAuth();
  const email = user.email;

  const changePassword = async (
    email: string,
    password: string,
    oldPassword: string,
    token: string
  ) => {
    try {
      await axios
        .patch(
          USER_CHANGEPASS_URL,
          {
            email,
            password,
            oldPassword,
          },
          config(token)
        )
        .then(
          async (res) => {
            alert("เปลี่ยน password สำเร็จ");
          },
          (err) => {
            alert("เปลี่ยน password ไม่สำเร็จ");
            console.log(err.response.data);
          }
        );
    } catch (err) {
      console.error("Detail Profile changePassword(): " + err);
    } finally {
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setPassword(newPassword);
    changePassword(email, newPassword, oldPassword, token);
    setIsEditPassword(false);
  };

  const handleCancel = () => {
    setIsEditPassword(false);
  };

  return (
    <td className="">
      <tr className="h-12">
        <Input
          name="name"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e: any) => setOldPassword(e.target.value)}
          type="password"
          className={"py-1.5"}
        />
      </tr>
      <tr className="h-12">
        <Input
          name="name"
          placeholder="New Password"
          value={newPassword}
          onChange={(e: any) => setNewPassword(e.target.value)}
          type="password"
          className={"py-1.5"}
        />
      </tr>
      <tr className="h-12">
        <Input
          name="name"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e: any) => setConfirmPassword(e.target.value)}
          type="password"
          className={"py-1.5"}
        />
      </tr>
      <tr>
        <Button className="bg w-30" onClick={handleCancel} color={"red"}>
          Cancel
        </Button>
        <Button
          className={(!(newPassword === confirmPassword && newPassword !== "") ? `ml-2 w-30 bg-gray-200`: `ml-2 w-30 bg-green-500`)}
          onClick={handleSubmit}
          color={"green"}
          disable={!(newPassword === confirmPassword && newPassword !== "")}
        >
          Submit
        </Button>
      </tr>
    </td>
  );
};

export default EditPassword;
