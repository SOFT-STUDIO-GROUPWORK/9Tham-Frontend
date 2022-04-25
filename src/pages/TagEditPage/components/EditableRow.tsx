import React from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";

type Props = {
  index: number;
  editFormData: {
    name: string;
  };
  handleEditFormChange: (event: any) => void;
  handleCancelClick: (event: any) => void;
};

const EditableRow = ({
  index,
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}: Props) => {
  return (
    <tr
      key={index}
      className="bg-amber-100 text-center h-12  border-b-2 border-gray-100"
    >
      <td className="">{index + 1}</td>
      <td className="text-left">
        <div className="h-full w-48">
          <Input
            name="name"
            placeholder="ใส่หมวดหมู่..."
            value={editFormData.name}
            onChange={handleEditFormChange}
            className={"py-1.5"}
          />
        </div>
      </td>
      <td className="text-right">
        <Button className="w-20 text-sm" color={"amber"}>
          บันทึก
        </Button>
      </td>
      <td>
        <Button
          className="w-20 text-sm bg-gray-50"
          color={"amber"}
          mode="outline"
          onClick={handleCancelClick}
        >
          ยกเลิก
        </Button>
      </td>
    </tr>
  );
};

export default EditableRow;
