import { useEffect, useState } from "react";

import Searchbar from "./components/Searchbar";
import Pagination from "./components/Pagination";
import Button from "../../components/Button";

import { nanoid } from "nanoid";

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

import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";

import Input from "../../components/Input";

type Props = {};

export interface ITag {
  id: number | null;
  name: string;
}
let mockAccount = [
  {
    id: 1,
    name: "ความรู้ธรรมมะ",
  },
  {
    id: 2,
    name: "หลักคำสอน",
  },
  {
    id: 3,
    name: "หลักคำสอน",
  },
  {
    id: 4,
    name: "หลักคำสอน",
  },
  {
    id: 5,
    name: "หลักคำสอน",
  },
  {
    id: 6,
    name: "หลักคำสอน",
  },
];

const TagEditPage = (props: Props) => {
  const [tags, setTags] = useState<ITag[]>(mockAccount);
  const [isLoading, setIsLoading] = useState(false);

  //add
  const [isAdd, setIsAdd] = useState(false);
  const [addFormData, setAddFormData] = useState({
    name: "",
  });

  //edit
  const [editTagId, setEditTagId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
  });

  const { token } = useAuth();

  useEffect(() => {
    console.log(token);
    const getTags = async () => {
      setIsLoading(true);
      await axios
        .get(TAGS_GET_URL, config(token))
        .then((res) => {
          // setTags(res.data);
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

  // add
  // add value to add from, in "input box", combine as "FormData"
  const handleAddFormChange = (event: any) => {
    event.preventDefault();

    //let fieldName:string = event.target.getAttribute('name');
    let fieldValue: string = event.target.value;

    let newFormData: { name: string } = { ...addFormData };
    // change to variable attribute
    newFormData.name = fieldValue;

    setAddFormData(newFormData);
  };

  // when add value to new tag complete, click "add button"
  const handleAddFormSubmit = (event: any) => {
    event.preventDefault();

    const newTag: ITag = {
      id: parseInt(nanoid()),
      name: addFormData.name,
    };

    const newTags = [...tags, newTag];
    setTags(newTags);
  };

  // edit
  // when want to edit Readonly row and click "edit button"
  const handleEditClick = (event: any, tag: ITag) => {
    event.preventDefault();
    setEditTagId(tag.id);

    let formValues = {
      name: tag.name,
    };

    setEditFormData(formValues);
  };

  // add value to edit from, in "input box", combine as "FormData"
  const handleEditFormChange = (event: any) => {
    event.preventDefault();

    //let fieldName:string = event.target.getAttribute('name');
    let fieldValue: string = event.target.value;

    let newFormData: { name: string } = { ...addFormData };
    // change to variable attribute
    newFormData.name = fieldValue;

    setEditFormData(newFormData);
  };

  // when want to save EditRow, click "save button"
  const handleEditFormSubmit = (event: any) => {
    event.preventDefault();

    const editTag = {
      id: editTagId,
      name: editFormData.name,
    };

    const newTags = [...tags];

    const index = tags.findIndex((tag) => tag.id === editTagId);

    newTags[index] = editTag;

    setTags(newTags);
    setEditTagId(null);
  };

  // when want to cancel in EditRow, click "cancel button"
  const handleCancelClick = () => {
    setEditTagId(null);
  };

  // when want to delete in Readonly, click "delete button"
  const handleDeleteClick = (tagId: number) => {
    const newTags = [...tags];
    const index = tags.findIndex((tag) => tag.id === tagId);
    newTags.splice(index, 1);
    setTags(newTags);
  };

  return (
    <>
      {isLoading ? (
        <div>asdasd</div>
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
                    {isAdd ? (
                      <>
                        <div className="text-amber-500">เพิ่มหมวดหมู่:</div>
                        <form onSubmit={handleAddFormSubmit}>
                          <Input
                            name="name"
                            placeholder="เพิ่มหมวดหมู่ใหม่..."
                            onChange={handleAddFormChange}
                            className="border-amber-500 py-1.5"
                          />
                        </form>
                        <Button
                          onClick={(event: any) => {
                            handleAddFormSubmit(event);
                            setIsAdd(false);
                          }}
                          className="font-bold border border-amber-500"
                          color={"amber"}
                        >
                          บันทึก
                        </Button>
                        <Button
                          onClick={() => setIsAdd(false)}
                          className="ml-1 font-bold"
                          mode="outline"
                          color={"amber"}
                        >
                          X
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={() => setIsAdd(true)}
                        className="ml-4"
                        color={"amber"}
                      >
                        เพิ่มหมวดหมู่ +
                      </Button>
                    )}
                  </div>
                </div>
                {/* Table */}
                <form onSubmit={handleEditFormSubmit} className="w-full h-full">
                  <table className="table-fixed w-full">
                    {/* table Header */}
                    <thead className="text-white shadow border-b-2 border-gray-300">
                      <tr className="bg-amber-500 h-12">
                        <th className="font-medium w-28">ลำดับ</th>
                        <th className="font-medium pl-3 text-left">
                          ชื่อหมวดหมู่
                        </th>
                        <th className="font-medium w-40"></th>
                        <th className="font-medium w-40"></th>
                      </tr>
                    </thead>
                    {/* table Content */}
                    <tbody>
                      {tags.map((tag, index) => (
                        <>
                          {editTagId === tag.id ? (
                            <EditableRow
                              index={index}
                              editFormData={editFormData}
                              handleEditFormChange={handleEditFormChange}
                              handleCancelClick={handleCancelClick}
                            />
                          ) : (
                            <ReadOnlyRow
                              tag={tag}
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

export default TagEditPage;
