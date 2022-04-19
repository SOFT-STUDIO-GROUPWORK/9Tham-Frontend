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
interface ITag {
  tag: string;
  status: string;
}
let mockAccount = [
  {
    tag: "Admin",
    status: "Active",
  },
  {
    tag: "User",
    status: "Active",
  },
];

const TagEditPage = (props: Props) => {
  // check at my homePage before proceed by pop (delete if already read)
  const [tag, setTag] = useState<ITag[]>(mockAccount);
  return (
    <div className="container mx-auto">
      <div
        className="flex flex-col items-center mx-auto w-3/4 bg-slate-50  p-4"
        style={{ minHeight: "calc(100vh - 64px)" }}
      >
        <div className="border-0 border-red-200 w-full h-60 mt-24">
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-row w-full justify-center mb-4">
              <div className="text-3xl mr-2">แก้ไขแท็ก</div>
              <Searchbar />
              <button className="text-base rounded-full bg-amber-500 border-8 border-transparent mx-2">
                เพิ่มแท็ก +
              </button>
            </div>
            <table className="table-auto w-full border-b-2 border-gray-300">
              <thead className="border-b-2 border-gray-300">
                <tr className="bg-amber-500 h-12 text-left">
                  <th className="text-center">แท็ก</th>
                  <th>สถานะ</th>
                  <th>ลบ / แก้ไข</th>
                </tr>
              </thead>
              <tbody>
                {tag.map((e) => (
                  <tr className="text-sm text-left hover:bg-gray-100">
                    <td className="text-center">{e.tag}</td>
                    <td>{e.status}</td>
                    <td>
                      <button className="underline hover:underline-offset-2">
                        Delete
                      </button>
                    </td>
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

export default TagEditPage;
