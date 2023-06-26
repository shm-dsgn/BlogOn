import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetUserID } from "../hooks/useGetUserID";
import Editor from "../components/Editor";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<FileList | null>(null);
  const navigate = useNavigate();

  const CreatePost = async (e: React.FormEvent<Element>) => {
    e.preventDefault();

    const userID = useGetUserID();

    const data = new FormData();
    data.append("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("author", userID!);
    if (images) {
      data.set("images", images![0]);
    }

    try {
      await axios
        .post("http://localhost:3001/post/create", data)
        .then(function (response) {
          toast.success(response.data.message, {
            autoClose: 2000,
            position: "top-center",
          });
          setTimeout(() => {
            navigate("/");
          }, 2500);
        });
    } catch (err) {
      toast.error(
        "Blog Content too big due to images/other media/too much text. Reduce or modify accordingly.",
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
      <h2 className="font-bold text-2xl text-center mb-4">Create Post</h2>
      <form className="flex flex-col justify-start gap-4" onSubmit={CreatePost}>
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

        {images && (
          <div className="shadow border rounded w-full p-3 text-gray-700 focus:outline-none focus:shadow-outline font-bold flex items-center flex-col ">
            <img
              src={images && URL.createObjectURL(images![0])}
              className=" rounded-lg w-48 h-24 object-cover"
              alt="preview of upload"
            />
          </div>
        )}

        <Editor value={content} onChange={setContent} />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline mt-2 w-full disabled:opacity-50"
          disabled={!title || !summary || !content || !images}
        >
          Create Post
        </button>
      </form>
    </>
  );
};

export default CreatePostPage;
