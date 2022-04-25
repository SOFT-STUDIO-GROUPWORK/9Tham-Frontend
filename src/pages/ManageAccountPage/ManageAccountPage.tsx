import React, { useEffect, useState } from "react";
import Selector from "./components/Selector";
import Searchbar from "./components/Searchbar";
import Pagination from "./components/Pagination";
import EditableRow from "./components/EditableRow";
import ReadOnlyRow from "./components/ReadOnlyRow";

import Button from "../../components/Button";
import Input from "../../components/Input";
import { useAuth } from "../../contexts/AuthContext";

import { useNavigate } from "react-router-dom";

import {
  getAccounts,
  updateAccount,
  deleteAccount,
} from "./services/accountsService";

type Props = {};

export interface IAccount {
  id?: number;
  username: string;
  name: string;
  surname: string;
  role: number;
  nickname: string;
  status?: string;
  pic?: string;
  isBanned: boolean;
}
const initialAccount = {
  username: "",
  name: "",
  surname: "",
  nickname: "",
  role: 0,
  isBanned: false,
};
let mockAccount = [
  {
    id: 1,
    username: "gutsoo",
    name: "Pudinan",
    surname: "Pensuk",
    nickname: "Pudinan Pensuk",
    role: 1,
    status: "Active",
    isBanned: false,
  },
  {
    id: 2,
    username: "pop",
    name: "Sirawit",
    surname: "Sukwattanavit",
    nickname: "Sirawit Sukwattanavit",
    role: 1,
    status: "Active",
    isBanned: false,
  },
];

const ManageAccountPage = (props: Props) => {
  const [accounts, setAccounts] = useState<IAccount[]>(mockAccount);
  const [isLoading, setIsLoading] = useState(false);

  //add
  // const [isAdd, setIsAdd] = useState(false);
  // const [addFormData, setAddFormData] = useState(initialAccount);

  //edit
  const [editAccountId, setEditAccountId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<IAccount>(initialAccount);

  const { token } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    console.log(token);

    // service getTag()
    getAccounts({ setIsLoading, token, setAccounts });
  }, []);

  const smallFormChange = (event: any) => {
    let newFormData: IAccount = { ...editFormData }; // beware! addFromData and editFormData

    let fieldName: string = event.target.getAttribute("name");
    let fieldValue: string = event.target.value;
    // change to variable attribute

    if (fieldName === "name") {
      newFormData.name = fieldValue;
    } else if (fieldName === "surname") {
      newFormData.surname = fieldValue;
    } else if (fieldName === "username") {
      newFormData.username = fieldValue;
    } else if (fieldName === "role") {
      newFormData.role = parseInt(fieldValue);
    }
    return newFormData;
  };

  // add
  // add value to add from, in "input box", combine as "FormData"
  // const handleAddFormChange = (event: any) => {
  //   event.preventDefault();

  //   let newFormData = smallFormChange(event);

  //   setAddFormData(newFormData);
  // };

  // when add value to new tag complete, click "add button"
  // const handleAddFormSubmit = async (event: any) => {
  //   event.preventDefault();

  //   // service addAccount()
  //   let newId = await addAccount({ token, setIsLoading, addFormData });

  //   if (newId == null) return;

  //   const newAccount: IAccount = {
  //     id: newId,
  //     username: addFormData.username,
  //     name: addFormData.name,
  //     surname: addFormData.surname,
  //     role: 0,
  //     nickname: addFormData.name + " " + addFormData.surname,
  //   };

  //   const newAccounts = [...accounts, newAccount];
  //   setAccounts(newAccounts);
  // };

  // edit
  // when want to edit Readonly row and click "edit button"
  const handleEditClick = (event: any, account: IAccount) => {
    event.preventDefault();
    setEditAccountId(account.id!);

    let formValues = {
      name: account.name,
      username: account.username,
      surname: account.surname,
      nickname: account.name + " " + account.surname,
      role: account.role,
      isBanned: account.isBanned,
    };

    setEditFormData(formValues);
  };

  // add value to edit from, in "input box", combine as "FormData"
  const handleEditFormChange = (event: any) => {
    event.preventDefault();

    let newFormData = smallFormChange(event);

    setEditFormData(newFormData);
  };

  // when want to save EditRow, click "save button"
  const handleEditFormSubmit = async (event: any) => {
    event.preventDefault();
    if (editAccountId === null) return;

    //api service updateAccount()
    let result = await updateAccount({
      token,
      setIsLoading,
      editAccountId,
      editFormData,
    });
    if (result === false) {
      return;
    }

    const editAccount = {
      id: editAccountId,
      username: editFormData.username,
      name: editFormData.name,
      surname: editFormData.surname,
      nickname: editFormData.name + " " + editFormData.surname,
      role: editFormData.role,
      isBanned: false,
      pic: editFormData.pic,
      //add password after tree finish
    };

    //Showing
    const newAccounts = [...accounts];
    const index = accounts.findIndex(
      (account: IAccount) => account.id === editAccountId
    );
    newAccounts[index] = editAccount;

    setAccounts(newAccounts);
    setEditAccountId(null);
  };

  // when want to cancel in EditRow, click "cancel button"
  const handleCancelClick = () => {
    setEditAccountId(null);
  };

  // when want to delete in Readonly, click "delete button"
  const handleDeleteClick = async (accountId: number) => {
    // service deleteAccount()
    console.log(accountId);
    let result = await deleteAccount({ token, setIsLoading, accountId });
    if (result === false) {
      return;
    }
    //for update State for showing after delete
    const newAccounts = [...accounts];
    const index = accounts.findIndex((account) => account.id === accountId);
    newAccounts.splice(index, 1);
    setAccounts(newAccounts);
  };

  return (
    <>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div
          className="border-2 border-transparent container mx-auto"
          style={{ minHeight: "100vh" }}
        >
          <div
            className="border-2 border-transparent first-line:flex flex-col items-center mx-auto w-3/4 bg-slate-50   px-2"
            style={{ minHeight: "calc(100vh - 72px)" }}
          >
            <div
              className="border-0 border-red-500 flex flex-col justify-between w-full mt-24"
              style={{ minHeight: "calc(100vh - 180px)" }}
            >
              <div className="flex flex-col items-center">
                {/* TopBar */}
                <div className="flex flex-row w-full justify-between items-center mb-4">
                  <div className="flex flex-row items-center">
                    <div className="text-3xl mr-2">จัดการหมวดหมู่</div>
                    <div className="h-full w-96">
                      <Searchbar />
                    </div>
                  </div>

                  <div className="flex flex-row items-center gap-2">
                    <Button
                      onClick={() => navigate("/register")}
                      className="ml-4"
                      color={"amber"}
                    >
                      เพิ่มบัญชี +
                    </Button>
                  </div>
                </div>
                {/* Table */}
                <form onSubmit={handleEditFormSubmit} className="w-full h-full">
                  <table className="table-fixed w-full">
                    {/* table Header */}
                    <thead className="text-white shadow border-b-2 border-gray-300">
                      <tr className="bg-amber-500 h-12">
                        <th className="font-medium w-16">ลำดับ</th>
                        <th className="font-medium pl-3 w-56 text-left">
                          บัญชีผู้ใช้
                        </th>
                        <th className="font-medium w-36 pl-3 text-left">ชื่อ</th>
                        <th className="font-medium w-36 pl-3 text-left">สกุล</th>
                        <th className="font-medium w-24">กลุ่มผู้ใช้</th>
                        <th className="font-medium w-24">สถานะ</th>
                        <th className="font-medium w-24"></th>
                        <th className="font-medium w-24"></th>
                      </tr>
                    </thead>
                    {/* table Content */}
                    <tbody>
                      {accounts.map((account, index) => (
                        <>
                          {editAccountId === account.id ? (
                            <EditableRow
                              index={index}
                              editFormData={editFormData}
                              handleEditFormChange={handleEditFormChange}
                              handleCancelClick={handleCancelClick}
                            />
                          ) : (
                            <ReadOnlyRow
                              account={account}
                              index={index}
                              handleEditClick={handleEditClick}
                              handleDeleteClick={handleDeleteClick}
                            />
                          )}
                        </>
                      ))}
                    </tbody>
                  </table>
                </form>
              </div>
              <Pagination />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageAccountPage;
