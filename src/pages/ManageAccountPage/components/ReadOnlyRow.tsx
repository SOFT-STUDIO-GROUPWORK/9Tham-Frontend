import Button from "../../../components/Button";
import { BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
import IAccount from "../../../interfaces/IAccount";

type Props = {
  account: IAccount;
  index: number;
  handleEditClick: (event: any, account: IAccount) => void;
  handleDeleteClick: (email: string) => void;
  user?: IAccount;
};

const ReadOnlyRow = ({
  account,
  index,
  handleEditClick,
  handleDeleteClick,
  user,
}: Props) => {
  return (
    <tr
      key={index}
      className=" hover:bg-gray-100 text-center h-12  border-b-2 border-gray-100"
    >
      <td className="">{index + 1}</td>
      <td className="text-left pl-3">{account.email}</td>
      <td className="text-left pl-3">{account.firstName}</td>
      <td className="text-left pl-3">{account.lastName}</td>
      <td className="">{account.role ? "Admin" : "User"}</td>
      <td className="">{account.isBanned ? "Banned" : "Active"}</td>
      <td className="text-right">
        {user?.email !== account.email ? (
          <>
            <Button
              onClick={(event: any) => handleEditClick(event, account)}
              className="w-20 text-sm border-0 font-bold"
              color={"amber"}
              mode="outline"
            >
              แก้ไข
            </Button>
          </>
        ) : (
          <Link to="/detailAccount">
            <Button
              className="text-blue-500 hover:text-blue-600 italic w-20 text-sm border-0 font-bold"
              color={"amber"}
              mode="outline"
            >
              คุณ
            </Button>
          </Link>
        )}
      </td>
      <td>
        {user?.email !== account.email ? (
          <>
            {" "}
            <Button
              onClick={() => handleDeleteClick(account.email)}
              className="w-20 border-0 font-bold"
              color={"red"}
              mode="outline"
            >
              <BiTrash className="w-full" />
            </Button>
          </>
        ) : (
          <></>
        )}
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
