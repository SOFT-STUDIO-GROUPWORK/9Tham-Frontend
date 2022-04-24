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
          alert("เปลี่ยนpassword สำเร็จ");
        },
        (err) => {
          alert("เปลี่ยนpassword ไม่สำเร็จ");
          console.log(err.response.data);
        }
      );
  } catch (err) {
    console.error("Auth login(): " + err);
  } finally {
  }
};

const EditPassword = ({ setPassword, setIsEditPassword }: Props) => {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const { user, login, token } = useAuth();
  const email = user.email;
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setPassword(newPassword);
    changePassword(email, newPassword, oldPassword, token);
    //   const result = await login(user.email, oldPassword)
    //     .then((res) => {
    //       //if(res.reponse.status== 200)
    //       alert("คุณกำลังจะเข้าสู่ระบบใหม่อีกครั้ง");
    //       changePassword(email, newPassword, oldPassword, token);
    //       console.log(res);
    //     })
    //     .catch((err) => {
    //       console.log(err.response.data);
    //     });
    //   console.log(result);
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
