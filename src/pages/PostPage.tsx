import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import {
  ArrowUpRight,
  Headphones,
  NotePencil,
  Share,
  Trash,
} from "@phosphor-icons/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";
import Spinner from "../components/Spinner";
import TextToSpeech from "../components/TextToSpeech";

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
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const fetchPost = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/post/${id}`
          );
          setPost(response.data);
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
            <h1 className="font-bold text-xl text-center sm:text-3xl">
              {post.title}
            </h1>
            <p className="text-gray-500 text-sm font-semibold mt-4">
              {format(new Date(post.createdAt), "MMM d, yyyy HH:mm")}
            </p>
            <Link to={`/post/myprofile/${post.author._id}`}>
              <p className=" group text-black text-sm font-semibold mt-2 mb-4 inline-block">
                by {post.author.username}{" "}
                <ArrowUpRight
                  size={16}
                  className=" hidden group-hover:inline-block"
                />
              </p>
            </Link>

            <div className="flex gap-3">
              {currentUserId === post.author._id && cookies.access_token && (
                <>
                  <Link to={`/post/edit/${post._id}`}>
                    <button
                      className=" text-gray-500 p-2 rounded mt-2 mb-4 hover:text-black"
                      title="Edit Blog"
                    >
                      <NotePencil size={24} />
                    </button>
                  </Link>
                  <button
                    onClick={handleDelete}
                    className=" text-gray-500 p-2 rounded mt-2 mb-4 hover:text-red-600"
                    title="Delete Blog"
                  >
                    <Trash size={24} />
                  </button>
                </>
              )}
              <button
                onClick={() => setShow(!show)}
                className={` p-2 rounded mt-2 mb-4 hover:text-black ${
                  show ? "text-black" : "text-gray-500"
                }`}
                title="Listen to blog"
              >
                <Headphones size={24} />
              </button>
              <button
                onClick={() => {
                  window.navigator.clipboard.writeText(window.location.href);
                  toast.success("Blog URL copied successfully.", {
                    autoClose: 1000,
                    position: "top-center",
                  });
                }}
                className=" text-gray-500 p-2 rounded hover:text-black mt-2 mb-4"
                title="Share Blog"
              >
                <Share size={24} />
              </button>
            </div>
            {show && <TextToSpeech />}
            <img
              src={`${post.cover}`}
              alt="Blog cover"
              className=" rounded-md w-full h-48 object-cover mb-4 sm:h-72"
            />
            <p className="text-gray-500 text-sm font-normal mt-2 mb-4 italic">
              {post.summary}
            </p>
            <p
              id="content"
              className="text-black font-normal mt-4 mb-8 w-full prose"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        )
      ) : (
        <Spinner color={"blue"} />
      )}
    </>
  );
};

export default PostPage;
