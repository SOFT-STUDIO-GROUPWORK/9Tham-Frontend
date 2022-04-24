import React from "react";
import Button from "../../../components/Button";
import { BiTrash } from "react-icons/bi";
import { IAccount } from "../ManageAccountPage"

type Props = {
  account: IAccount;
  index: number;
  handleEditClick: (event: any, account: IAccount) => void;
  handleDeleteClick: (tagId: number) => void;
};

const ReadOnlyRow = ({
  account,
  index,
  handleEditClick,
  handleDeleteClick,
}: Props) => {
  return (
    <tr
      key={index}
      className=" hover:bg-gray-100 text-center h-12  border-b-2 border-gray-100"
    >
      <td className="">{index + 1}</td>
      <td className="text-left pl-3">{account.username}</td>
      <td className="text-left pl-3">{account.name}</td>
      <td className="text-left pl-3">{account.surname}</td>
      <td className="">{account.role? "Admin": "User"}</td>
      <td className="">{account.isBanned? "Banned": "Active"}</td>
      <td className="text-right">
        <Button
          onClick={(event: any) => handleEditClick(event, account)}
          className="w-20 text-sm border-0 font-bold"
          color={"amber"}
          mode="outline"
        >
          แก้ไข
        </Button>
      </td>
      <td>
        <Button
          onClick={() => handleDeleteClick(account.id!)}
          className="w-20 border-0 font-bold"
          color={"red"}
          mode="outline"
        >
          <BiTrash className="w-full" />
        </Button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
