import ProfileTopBar from "./ProfileTopBar";
import {
  getComment,
  getCommentId,
  deleteComment,
  updateComment,
  addComment,
} from "../../../services/commentService";
import IComment from "../../../interfaces/IComment";
type Props = {
  username: string;
  firstname: string;
  lastname: string;
  date: string;
  img: string;
  comment: string;
};

const Comment = (props: Props) => {
  return (
    <div className="w-full border-0 border-red-600 mt-6">
      <ProfileTopBar
        username={props.username}
        firstname={props.firstname}
        lastname={props.lastname}
        date={props.date}
        img={props.img}
      />
      <p className="pl-2">{props.comment}</p>
      <hr className="mt-8" />
    </div>
  );
};

export default Comment;
