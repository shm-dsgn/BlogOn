import { format } from "date-fns";
import { Link } from "react-router-dom";

type PostProps = {
  title: string;
  summary: string;
  cover: string;
  id: string;
  content: string;
  createdAt: string;
  author: string;
};

const Post = (props: PostProps) => {
  return (
    <Link to={`/post/${props.id}`}>
      <div className="flex gap-4 mb-4">
        <div className=" w-2/5">
          <img
            src={`${props.cover}`}
            alt="blog cover"
            className=" rounded-lg h-36 w-full object-cover"
          />
        </div>
        <div className=" w-3/5 flex flex-col justify-around">
          <h2 className="font-bold text-lg text-ellipsis line-clamp-2 ">
            {props.title}
          </h2>

          <span className="text-gray-500 text-xs font-normal">
            {format(new Date(props.createdAt), "MMM d, yyyy HH:mm")}
          </span>
          <p className=" text-sm text-ellipsis line-clamp-3 ">
            {props.summary}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Post;
