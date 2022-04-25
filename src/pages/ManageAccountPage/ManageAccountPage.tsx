import React, { useEffect, useState } from "react";
import Selector from "./components/Selector";
import EditableRow from "./components/EditableRow";
import ReadOnlyRow from "./components/ReadOnlyRow";

import Button from "../../components/Button";
import Input from "../../components/Input";
import { useAuth } from "../../contexts/AuthContext";
import Searchbar from "../../components/Searchbar";

import { useNavigate } from "react-router-dom";

import {
  getPageAccounts,
  getSearchAccounts,
  updateAccount,
  deleteAccount,
} from "../../services/accountsService";
import Pagination from "../../components/Pagination";
import IPagination, { initialPagination } from "../../interfaces/IPagination";
import IAccount, { initialAccount } from "../../interfaces/IAccount";

type Props = {};

let mockAccount = [
  {
    id: 1,
    firstName: "xxxxxx",
    lastName: "xxxxxx",
    nickName: "xxxxxx xxxxxx",
    email: "eeeee",
    role: 0,
    isBanned: false,
    imageUrl: "",
    bannerUrl: "",
  },
  {
    id: 2,
    firstName: "pop",
    lastName: "hhhhhh",
    nickName: "pop hhhhhh",
    email: "kkkkkkk",
    role: 1,
    isBanned: false,
    imageUrl: "",
    bannerUrl: "",
  },
];

const ManageAccountPage = (props: Props) => {
  const [accounts, setAccounts] = useState<IAccount[]>(mockAccount);
  const [isLoading, setIsLoading] = useState(false);

  //add
  // const [isAdd, setIsAdd] = useState(false);
  // const [addFormData, setAddFormData] = useState(initialAccount);

  //pagination
  const [pagination, setPagination] = useState<IPagination>(initialPagination);

  //search
  const [search, setSearch] = useState("");

  //edit
  const [editAccountId, setEditAccountId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<IAccount>(initialAccount);

  const { token, user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    console.log(token);

    // service getTag()
    if (pagination.search === "")
      getPageAccounts({ setIsLoading, setAccounts, pagination, setPagination });
  }, [pagination.currentPage, pagination.search]);

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
      }else if (fieldValue === "false") {
        newFormData.isBanned = false;
      }
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

    let formValues: IAccount = {
      firstName: account.firstName,
      email: account.email,
      lastName: account.lastName,
      nickName: account.firstName + " " + account.lastName,
      role: account.role,
      isBanned: account.isBanned,
      imageUrl: account.imageUrl,
      bannerUrl: account.bannerUrl,
    };

    setEditFormData(formValues);
  };

  // add value to edit from, in "input box", combine as "FormData"
  const handleEditFormChange = (event: any) => {
    event.preventDefault();

    let newFormData = smallFormChange(event);
    console.log(newFormData)

    setEditFormData(newFormData);
  };

  // when want to save EditRow, click "save button"
  const handleEditFormSubmit = async (event: any) => {
    event.preventDefault();
    if (editAccountId === null) return;

    let email = editFormData.email;

    //api service updateAccount()
    let result = await updateAccount({
      token,
      setIsLoading,
      email,
      editFormData,
    });
    if (result === false) {
      return;
    }

    let editAccount = {
      id: editAccountId,
      email: editFormData.email,
      firstName: editFormData.firstName,
      lastName: editFormData.lastName,
      nickName: editFormData.firstName + " " + editFormData.lastName,
      role: editFormData.role,
      isBanned: editFormData.isBanned,
      imageUrl: editFormData.imageUrl,
      bannerUrl: editFormData.bannerUrl,
      //add password after tree finish
    };

    //Showing
    let newAccounts = [...accounts];
    let index = accounts.findIndex(
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
  const handleDeleteClick = async (email: string) => {
    // service deleteAccount()
    console.log(email);
    let result = await deleteAccount({ token, setIsLoading, email });
    if (result === false) {
      return;
    }
    //for update State for showing after delete
    const newAccounts = [...accounts];
    const index = accounts.findIndex((account) => account.email === email);
    newAccounts.splice(index, 1);
    setAccounts(newAccounts);
  };

  const handlePagination = (value: number) => {
    setPagination((prev: IPagination) => ({ ...prev, currentPage: value }));
    console.log(pagination);
  };

  const handleSearchFormData = (event: any) => {
    setSearch(event.target.value);
    setPagination((prev: IPagination) => ({
      ...prev,
      search: event.target.value,
    }));
  };

  const handleSearchOnClick = (event: any) => {
    if (pagination.search === "") {
      getPageAccounts({ setIsLoading, setAccounts, pagination, setPagination });
    } else {
      getSearchAccounts({
        setIsLoading,
        setAccounts,
        pagination,
        setPagination,
      });
    }
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
                      <Searchbar
                        searchData={search}
                        handleSearchOnClick={handleSearchOnClick}
                        handleOnChange={handleSearchFormData}
                      />
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
                        <th className="font-medium w-36 pl-3 text-left">
                          ชื่อ
                        </th>
                        <th className="font-medium w-36 pl-3 text-left">
                          สกุล
                        </th>
                        <th className="font-medium w-24">กลุ่มผู้ใช้</th>
                        <th className="font-medium w-24">สถานะ</th>
                        <th className="font-medium w-24"></th>
                        <th className="font-medium w-24"></th>
                      </tr>
                    </thead>
                    {/* table Content */}
                    <tbody>
                      {accounts.map((account, index) => (
                        <React.Fragment key={index}>
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
                              user={user}
                            />
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </form>
              </div>
              <Pagination
                pagination={pagination}
                handleOnClick={handlePagination}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageAccountPage;
