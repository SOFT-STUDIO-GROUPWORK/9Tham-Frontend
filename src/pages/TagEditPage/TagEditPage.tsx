import { useEffect, useState } from "react";

import Searchbar from "./components/Searchbar";
import Pagination from "./components/Pagination";
import Button from "../../components/Button";

import { BiTrash } from "react-icons/bi";
import {
  TAGS_GET_URL,
  TAG_POST_URL,
  TAG_GET_URL,
  TAG_PUT_URL,
  TAG_DELETE_URL,
} from "../../api/routes";
import { useAuth } from "../../contexts/AuthContext";
import axios, { config } from "../../api/axios";
import { Session } from "inspector";

type Props = {};

interface ITag {
  tag: string;
}
let mockAccount = [
  {
    id: 1,
    tag: "ความรู้ธรรมมะ",
  },
  {
    id: 2,
    tag: "หลักคำสอน",
  },
  {
    id: 3,
    tag: "สถานที่ธรรมะ",
  },
];

const TagEditPage = (props: Props) => {
  const [tags, setTags] = useState<ITag[]>(mockAccount);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    console.log(token);
    const getTags = async () => {
      setIsLoading(true);
      await axios
        .get(TAGS_GET_URL, config(token))
        .then((res) => {
          setTags(res.data);
        })
        .catch((err) => {
          console.error(`Tags getTags(): ${err.response.status}:` + err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    getTags();
  }, []);

  return (
    <>
      {isLoading ? (
        <div>asdasd</div>
      ) : (
        <div className="container mx-auto">
          <div
            className="flex flex-col items-center mx-auto w-3/4 bg-slate-50  p-4"
            style={{ minHeight: "calc(100vh - 64px)" }}
          >
            <div className="border-0 border-red-200 w-full h-60 mt-24">
              <div className="flex flex-col justify-center items-center">
                {/* TopBar */}
                <div className="flex flex-row w-full justify-center mb-4">
                  <div className="text-3xl mr-2">จัดการหมวดหมู่</div>

                  <Searchbar />

                  <Button
                    onClick={undefined}
                    className="ml-4 font-bold"
                    mode="outline"
                    color={"amber"}
                  >
                    เพิ่มหมวดหมู่ +
                  </Button>
                </div>
                {/* Table */}
                <table className="table-auto w-full border-b-2 border-gray-300">
                  {/* table Header */}
                  <thead className="text-white shadow border-b-2 border-gray-300">
                    <tr className="bg-amber-500 h-12">
                      <th className="font-medium">ลำดับ</th>
                      <th className="font-medium">ชื่อหมวดหมู่</th>
                      <th className="font-medium"></th>
                      <th className="font-medium"></th>
                    </tr>
                  </thead>
                  {/* table Content */}
                  <tbody>
                    {tags.map((e, index) => (
                      <tr
                        key={index}
                        className=" hover:bg-gray-100 h-12 text-center"
                      >
                        <td className="">{index + 1}</td>
                        <td className="">{e.tag}</td>
                        <td className="text-right">
                          <Button
                            onClick={undefined}
                            className="w-16 text-sm"
                            color={"amber"}
                          >
                            แก้ไข
                          </Button>
                        </td>
                        <td>
                          <Button
                            onClick={undefined}
                            className="w-14"
                            color={"red"}
                          >
                            <div className="flex flex-row gap-1 items-center justify-center">
                              <BiTrash />
                            </div>
                          </Button>
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
      )}
    </>
  );
};

export default TagEditPage;
