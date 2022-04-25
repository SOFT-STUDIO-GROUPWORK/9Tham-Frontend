import IAccount from "../../../interfaces/IAccount";
import ProfileTopBar from "./ProfileTopBar";

type Props = {
  account: IAccount
  comment: string;
};

const Comment = ({account,comment}: Props) => {
  return (
    <div className="w-full border-0 border-red-600 mt-6">
      <ProfileTopBar account={account}      />
      <p className="pl-2">{comment}</p>
      <hr className="mt-8" />
    </div>
  );
};

export default Comment;
