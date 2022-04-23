import React from "react";
import Button from "../../../components/Button";
import { BiTrash } from "react-icons/bi";
import { ITag } from "../TagEditPage";

type Props = {
  tag: ITag;
  index: number;
  handleEditClick: (event: any, tag: ITag) => void;
  handleDeleteClick: (tagId: number) => void;
};

const ReadOnlyRow = ({
  tag,
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
      <td className="text-left pl-3">{tag.name}</td>
      <td className="text-right">
        <Button
          onClick={(event: any) => handleEditClick(event, tag)}
          className="w-20 text-sm border-0 font-bold"
          color={"amber"}
          mode="outline"
        >
          แก้ไข
        </Button>
      </td>
      <td>
        <Button
          onClick={() => handleDeleteClick(tag.id!)}
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
