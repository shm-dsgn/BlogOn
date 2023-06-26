import { format } from "date-fns";
import { Link } from "react-router-dom";

type PostProps = {
  title: string;
  summary: string;
  cover: string;
  id: string;
  content: string;
  createdAt: string;
  author: {
    _id: string;
    username: string;
  };
};

const Post = (props: PostProps) => {
  return (
    <div className="flex gap-4 mb-4">
      <div className=" w-2/5">
        <Link to={`/post/${props.id}`}>
          <img
            src={`http://localhost:3001/${props.cover}`}
            alt="blog cover"
            className=" rounded-lg h-36 w-full object-cover"
          />
        </Link>
      </div>
      <div className=" w-3/5 flex flex-col justify-around">
        <Link to={`/post/${props.id}`}>
          <h2 className="font-bold text-lg text-ellipsis line-clamp-2 ">
            {props.title}
          </h2>
        </Link>
        <p className="text-gray-500 text-xs font-semibold">
          @{props.author.username}&nbsp;
          <span className=" font-normal">
            {format(new Date(props.createdAt), "MMM d, yyyy HH:mm")}
          </span>
        </p>
        <p className=" text-sm text-ellipsis line-clamp-3 ">{props.summary}</p>
      </div>
    </div>
  );
};

export default Post;
