import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { FiMoreHorizontal } from "react-icons/fi";

type Props = {
    username: string,
    firstname: string,
    lastname: string,
    date: string,
    img: string,
};

const ProfileTopBar = (props: Props) => {
  return (
    <div className="flex flex-row justify-between w-full h-12 mb-4 border-0 border-blue-600">
      <div className="flex flex-row">
        <BsPersonCircle className="w-14 h-full mr-4" />
        <div className="flex flex-col">
          <h4>{props.firstname} {props.lastname}</h4>
          <p><span className="font-semibold text-amber-500">@{props.username}</span> {props.date}</p>
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <AiFillLike className="w-auto h-1/2" />
        <h4>100</h4>
        <FiMoreHorizontal className="ml-2 w-auto h-1/2" />
      </div>
    </div>
  );
};

export default ProfileTopBar;
