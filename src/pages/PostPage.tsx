import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import { PiNotePencil } from "react-icons/pi";

type PostType = {
  // properties of a post
  _id: string;
  title: string;
  summary: string;
  content: string;
  cover: string;
  createdAt: string;
  author: {
    _id: string;
    username: string;
  };
};

const PostPage = () => {
  const { id } = useParams();
  const [isLoaded, setLoaded] = useState(false);
  const [post, setPost] = useState(null as unknown as PostType);

  const currentUserId = localStorage.getItem("userID");

  useEffect(() => {
    try {
      const fetchPost = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/post/${id}`);
          setPost(response.data);
          console.log(response.data);
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

  return (
    <>
      {isLoaded ? (
        post === null ? (
          <p>Post not found</p>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <Link to="/" className="text-blue-500 hover:underline">
              <p>- back</p>
            </Link>
            <br />
            <h1 className="font-bold text-3xl text-center">{post.title}</h1>
            <p className="text-gray-500 text-sm font-semibold mt-4">
              {format(new Date(post.createdAt), "MMM d, yyyy HH:mm")}
            </p>
            <p className=" text-black text-sm font-semibold mt-2 mb-4">
              by {post.author.username}
            </p>
            {currentUserId === post.author._id && (
              <Link
                to={`/post/edit/${post._id}`}
                className="text-blue-500 hover:underline"
              >
                <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2 mb-4 text-xs flex justify-center items-center">
                  <PiNotePencil fontSize={18} className=" mr-2" />
                  Edit this blog
                </button>
              </Link>
            )}
            <img
              src={`http://localhost:3001/${post.cover}`}
              alt="Blog cover"
              className=" rounded-md w-full h-56 object-cover mb-4"
            />
            <p
              className="text-black font-normal mt-4 w-full prose prose-lg"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        )
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default PostPage;
