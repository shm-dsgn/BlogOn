import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import { CaretCircleLeft, NotePencil, Trash } from "@phosphor-icons/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";
import Spinner from "../components/Spinner";

type PostType = {
  // properties of a post
  _id: string;
  title: string;
  summary: string;
  content: string;
  cover: string;
  createdAt: string;
  updatedAt: string;
  author: {
    _id: string;
    username: string;
  };
};

const PostPage = () => {
  const { id } = useParams();
  const [isLoaded, setLoaded] = useState(false);
  const [post, setPost] = useState(null as unknown as PostType);
  const navigate = useNavigate();

  const currentUserId = localStorage.getItem("userID");
  // eslint-disable-next-line
  const [cookies, _] = useCookies(["access_token"]);

  useEffect(() => {
    try {
      const fetchPost = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/post/${id}`);
          setPost(response.data);
          // console.log(response.data);
        } catch (err) {
          console.error(err);
        }
        setLoaded(true);
      };

      fetchPost();
    } catch (err) {
      console.error(err);
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios
        .delete(`${process.env.REACT_APP_API_URL}/post/delete/${id}`, {
          headers: { authorization: cookies.access_token },
        })
        .then(function (response) {
          toast.success(response.data.message, {
            autoClose: 1000,
            position: "top-center",
          });
          setTimeout(() => {
            navigate(`/`);
          }, 1500);
        });
    } catch (err) {
      toast.error("Server Error. Try again later.", {
        autoClose: 1000,
        position: "top-center",
      });
      console.error(err);
    }
  };

  return (
    <>
      {isLoaded ? (
        post === null ? (
          <p>Post not found</p>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <ToastContainer pauseOnFocusLoss={false} />

            <Link to="/">
              <CaretCircleLeft size={36} className=" text-slate-600" />
            </Link>
            <br />
            <h1 className="font-bold text-3xl text-center">{post.title}</h1>
            <p className="text-gray-500 text-sm font-semibold mt-4">
              {format(new Date(post.createdAt), "MMM d, yyyy HH:mm")}
            </p>
            {post.createdAt !== post.updatedAt && (
              <p className="text-gray-600 text-xs font-medium">
                (Edited on{" "}
                {format(new Date(post.updatedAt), "MMM d, yyyy HH:mm")})
              </p>
            )}
            <p className=" text-black text-sm font-semibold mt-2 mb-4">
              by {post.author.username}
            </p>
            {currentUserId === post.author._id && (
              <div className="flex gap-4">
                <Link to={`/post/edit/${post._id}`}>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded focus:outline-none focus:shadow-outline mt-2 mb-4 text-sm flex justify-center items-center gap-1">
                    <NotePencil size={24} />
                  </button>
                </Link>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-700 text-white p-2 rounded focus:outline-none focus:shadow-outline mt-2 mb-4"
                >
                  <Trash size={24} />
                </button>
              </div>
            )}
            <img
              src={`${post.cover}`}
              alt="Blog cover"
              className=" rounded-md w-full h-56 object-cover mb-4"
            />
            <p
              className="text-black font-normal mt-4 mb-8 w-full prose"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        )
      ) : (
        <Spinner color={"blue"}/>
      )}
    </>
  );
};

export default PostPage;
