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
    <div className="container mx-auto">
      <div
        className="flex flex-col items-center mx-auto w-3/4 bg-slate-50  p-4"
        style={{ minHeight: "calc(100vh - 64px)" }}
      >
        <div className="border-0 border-red-200 w-full h-60 mt-24">
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
                  <tr className="text-sm text-left hover:bg-gray-100">
                    <td className="flex justify-center items-center">
                      <div className="bg-amber-500 h-7 w-7 rounded-full m-1"></div>
                    </td>

                    <td>{e.id}</td>
                    <td>{e.username}</td>
                    <td>{e.name}</td>
                    <td>{e.surname}</td>
                    <td>{e.role}</td>
                    <td>{e.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default ManageAccountPage;
