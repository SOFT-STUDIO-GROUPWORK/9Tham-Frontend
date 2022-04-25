import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { FiMoreHorizontal } from "react-icons/fi";
import IAccount from "../../../interfaces/IAccount";

type Props = {
  account: IAccount;
  date?: string;
  like?: number;
  isNewPost: boolean;
};

const ProfileTopBar = ({ account, date, isNewPost }: Props) => {
  return (
    <div className="flex flex-row justify-between w-full h-12 mb-4 border-0 border-blue-600">
      {isNewPost ? (
        <>
          <div className="flex flex-row">
            <BsPersonCircle className="w-14 h-full mr-4" />
            <div className="flex flex-col">
              <p>
                {account?.firstName} {account?.lastName}
              </p>
              <p>
                <span className="font-semibold text-amber-500">
                  @{account?.email}
                </span>{" "}
                {date}
              </p>
            </div>
          </div>
          {/* <div className="flex flex-row gap-2">
            <FiMoreHorizontal className="ml-2 w-auto h-1/2" />
          </div> */}
        </>
      ) : (
        <>
          <div className="flex flex-row">
            <BsPersonCircle className="w-14 h-full mr-4" />
            <div className="flex flex-col">
              <p>
                {account?.firstName} {account?.lastName}
              </p>
              <p>
                <span className="font-semibold text-amber-500">
                  @{account?.email}
                </span>{" "}
                {date}
              </p>
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <AiFillLike className="w-auto h-1/2" />
            <p>100</p>
            <FiMoreHorizontal className="ml-2 w-auto h-1/2" />
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileTopBar;
