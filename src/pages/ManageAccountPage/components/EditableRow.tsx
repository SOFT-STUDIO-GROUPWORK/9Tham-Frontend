import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { IAccount } from "../ManageAccountPage";
import Selector from "./Selector"

type Props = {
  index: number;
  editFormData: IAccount
  handleEditFormChange: (event: any) => void;
  handleCancelClick: (event: any) => void;
};

const EditableRow = ({
  index,
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}: Props) => {
  let structures = [
    {
      name: "username",
      placeholder: "ใส่บัญชีผู้ใช้...",
      value: editFormData.username,
    },
    {
      name: "name",
      placeholder: "ใส่ชื่อ...",
      value: editFormData.name,
    },
    {
      name: "surname",
      placeholder: "ใส่สกุล...",
      value: editFormData.surname,
    },
  ];

  return (
    <tr
      key={index}
      className="bg-amber-100 text-center h-12  border-b-2 border-gray-100"
    >
      <td className="">{index + 1}</td>
      {structures.map((structure, index) => (
        <td className="text-left" key={index}>
          <div className={structure.name === "username"? "w-56" : "w-36"}>
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
      <td><Selector title={""} options={["User", "Admin"]}/></td>
      <td><Selector title={""} options={["Active", "Banned"]}/></td>
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
