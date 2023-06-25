import axios from "axios";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<FileList | null>(null);
  const navigate = useNavigate();

  const CreatePost = async (e: React.FormEvent<Element>) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", title);
    data.set("summary", summary);
    data.set("content", content);
    if (images) {
      data.set("images", images![0]);
    }

    try {
      await axios
        .post("http://localhost:3001/post", data)
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
      console.error(err);
    }
  };

  return (
    <>
      <ToastContainer pauseOnFocusLoss={false} />
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
        <ReactQuill
          value={content}
          modules={modules}
          formats={formats}
          onChange={(newValue) => setContent(newValue)}
        />
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
