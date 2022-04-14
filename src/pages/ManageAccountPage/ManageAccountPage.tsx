// for admin gut

// load extention ES7 + React/Redux/React-Native snippets
// type "tsrafce" and enter... it will create structure
// (mean "ts" = "typescript" , "rafce" = "react arrow function component export default")
// by Pop (delete if already read)

import React, { useState } from "react";
import Selector from "./components/Selector";
import Searchbar from "./components/Searchbar";
import Pagination from "./components/Pagination";

type Props = {};
const Options: string[] = ["User", "Admin"];
interface IAccount {
  pic?: string;
  id: string;
  username: string;
  name: string;
  surname: string;
  role: string;
  status: string;
}
let mockAccount = [
  {
    id: "1",
    username: "gutsoo",
    name: "Pudinan",
    surname: "Pensuk",
    role: "Admin",
    status: "Active",
  },
  {
    id: "2",
    username: "popkakza",
    name: "Sirawit",
    surname: "Eiei",
    role: "Admin",
    status: "Active",
  },
];

const ManageAccountPage = (props: Props) => {
  // check at my homePage before proceed by pop (delete if already read)
  const [Account, setAccount] = useState<IAccount[]>(mockAccount);
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-row m-2">
          <div className="text-3xl">จัดการบัญชีผู้ใช้</div>
          <Searchbar />
          <Selector title="หมวดหมู่:" options={Options} />
          <button className="text-base rounded-full bg-amber-500 border-8 border-transparent mx-2">
            เพิ่มบัญชี +
          </button>
        </div>
        <table className="table-auto w-5/6 border-b-2 border-gray-300">
          <thead className="border-b-2 border-gray-300">
            <tr className="bg-amber-500 h-12 text-left">
              <th className="text-center">รูปภาพ</th>
              <th>ID</th>
              <th>บัญชีผู้ใช้</th>
              <th>ชื่อ</th>
              <th>สกุล</th>
              <th>กลุ่มผู้ใช้</th>
              <th>สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {Account.map((e) => (
              <tr className="text-sm text-left">
                <th className="text-center">รูปภาพ</th>
                <th>{e.id}</th>
                <th>{e.username}</th>
                <th>{e.name}</th>
                <th>{e.surname}</th>
                <th>{e.role}</th>
                <th>{e.status}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination />
    </div>
  );
};

export default ManageAccountPage;
