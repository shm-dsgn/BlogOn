import Post from "../components/Post";
import { useEffect, useState } from "react";
import axios from "axios";

type BlogType = {
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
}[];

const Home = () => {
  const [blogs, setBlogs] = useState<BlogType>([]);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("https://shm-blogapp-api.onrender.com/post");
        setBlogs(response.data);
        setLoaded(true);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
      {isLoaded ? (
        blogs.length === 0 ? (
          <div className=" text-center">No blogs yet... Write up one now!!</div>
        ) : (
          blogs.map((post) => (
            <Post
              key={post._id}
              title={post.title}
              summary={post.summary}
              cover={post.cover}
              id={post._id}
              content={post.content}
              createdAt={post.createdAt}
              author={post.author}
            />
          ))
        )
      ): (<p>Loading...</p>)}
    </>
  );
};

export default Home;
