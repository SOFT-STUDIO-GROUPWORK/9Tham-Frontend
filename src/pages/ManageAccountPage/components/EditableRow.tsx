import Button from "../../../components/Button";
import Input from "../../../components/Input";
import IAccount from "../../../interfaces/IAccount";
import Selector from "./Selector";

type Props = {
  index: number;
  editFormData: IAccount;
  handleEditFormChange: (event: any) => void;
  handleCancelClick: (event: any) => void;
};

const isBanned = [
  {
    value: true,
    display: "Banned",
  },
  {
    value: false,
    display: "Active",
  },
];

const role = [
  {
    value: 0,
    display: "User",
  },
  {
    value: 1,
    display: "Admin",
  },
];

const EditableRow = ({
  index,
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}: Props) => {
  let structures = [
    // {
    //   name: "email",
    //   placeholder: "ใส่บัญชีผู้ใช้...",
    //   value: editFormData.email,
    // },
    {
      name: "firstName",
      placeholder: "ใส่ชื่อ...",
      value: editFormData.firstName,
    },
    {
      name: "lastName",
      placeholder: "ใส่สกุล...",
      value: editFormData.lastName,
    },
  ];

  return (
    <tr
      key={index}
      className="bg-amber-100 text-center h-12  border-b-2 border-gray-100"
    >
      <td className="">{index + 1}</td>
      <td className="text-left pl-3">{editFormData.email}</td>
      {structures.map((structure, index) => (
        <td className="text-left" key={index}>
          <div className={structure.name === "email" ? "w-56" : "w-36"}>
            <Input
              name={structure.name}
              placeholder={structure.placeholder}
              value={structure.value}
              onChange={handleEditFormChange}
              className={"py-1.5"}
            />
          </div>
        </td>
      ))}
      <td>
        <Selector
          title={""}
          name="role"
          options={role}
          selected={editFormData.role}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <Selector
          title={""}
          name="isBanned"
          options={isBanned}
          selected={editFormData.isBanned}
          onChange={handleEditFormChange}
        />
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
