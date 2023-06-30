import { useEffect, useState, lazy, Suspense } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";

type BlogType = {
  // properties of a post
  _id: string;
  title: string;
  summary: string;
  content: string;
  cover: string;
  createdAt: string;
  author: string
}[];

const LazyPost = lazy(() => import("../components/Post"));

const Home = () => {
  const [blogs, setBlogs] = useState<BlogType>([]);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/post`);
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
          <Suspense fallback={<Spinner color={"blue"} />}>
          {blogs.map((post) => (
            <LazyPost
              key={post._id}
              title={post.title}
              summary={post.summary}
              cover={post.cover}
              id={post._id}
              content={post.content}
              createdAt={post.createdAt}
              author={post.author}
            />
          ))}
          </Suspense>
        )
      ): (<Spinner color={"blue"}/>)}
    </>
  );
};

export default Home;
