import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Editor from "../components/Editor";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";

const EditPostPage = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<FileList | null>(null);
  const [savedCover, setSavedCover] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  // eslint-disable-next-line
  const [cookies, _] = useCookies(["access_token"]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://shm-blogapp-api.onrender.com/post/${id}`);
        setTitle(response.data.title);
        setSummary(response.data.summary);
        setContent(response.data.content);
        setSavedCover(response.data.cover);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPost();
  }, [id]);

  const UpdatePost = async (e: React.FormEvent<Element>) => {
    e.preventDefault();
    const userID = useGetUserID();

    const data = new FormData();
    data.append("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("postId", id!);
    data.set("author", userID!);

    if (images) {
      data.set("images", images![0]);
    }

    try {
      await axios
        .put("https://shm-blogapp-api.onrender.com/post/edit", data, {
          headers: { authorization: cookies.access_token },
        })
        .then(function (response) {
          toast.success(response.data.message, {
            autoClose: 2000,
            position: "top-center",
          });
          setTimeout(() => {
            navigate(`/post/${id}`);
          }, 2500);
        });
    } catch (err) {
      toast.error(
        "Blog Content too big due to images/other media/too much text. Reduce or modify accordingly. Or Server Error.",
        {
          autoClose: 2000,
          position: "top-center",
        }
      );
      console.error(err);
    }
  };

  return (
    <>
      <ToastContainer pauseOnFocusLoss={false} />
      <h2 className="font-bold text-2xl text-center mb-4">Edit Post</h2>
      <form className="flex flex-col justify-start gap-4" onSubmit={UpdatePost}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
          className="shadow border rounded w-full p-3 text-gray-700 focus:outline-none focus:shadow-outline"
        />
        <input
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          type="text"
          placeholder="Summary"
          className="shadow border rounded w-full p-3 text-gray-700 focus:outline-none focus:shadow-outline"
        />
        <input
          type="file"
          className="shadow border rounded w-full p-3 text-gray-700 focus:outline-none focus:shadow-outline"
          accept="image/*"
          onChange={(e) => setImages(e.target.files!)}
        />

        <div className="shadow border rounded w-full p-3 text-gray-700 focus:outline-none focus:shadow-outline font-bold flex items-center flex-col ">
          <img
            src={
              images
                ? URL.createObjectURL(images![0])
                : `https://shm-blogapp-api.onrender.com/${savedCover}`
            }
            className=" rounded-lg w-48 h-24 object-cover"
            alt="preview of upload"
          />
        </div>

        <Editor value={content} onChange={setContent} />
        <div className=" gap-4 flex justify-between">
          <Link to={`/post/${id}`}>
            <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline mt-2 w-full">
              Cancel
            </button>
          </Link>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline mt-2 w-full disabled:opacity-50"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default EditPostPage;