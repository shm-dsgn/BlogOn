import axios from "axios";
import { useEffect, useState, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

type BlogType = {
  // properties of a post
  _id: string;
  title: string;
  summary: string;
  content: string;
  cover: string;
  createdAt: string;
  author: string;
}[];

const LazyPost = lazy(() => import("../components/Post"));

const MyPostsPage = () => {
  const { id } = useParams();
  const [username, setUsername] = useState("") as any;
  const [myPosts, setMyPosts] = useState(null as unknown as BlogType);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const fetchPost = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/post/myprofile/${id}`, {
              withCredentials: true,
            }
          );
          setMyPosts(response.data.myPosts);
          setUsername(response.data.username);
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

  return (
    <>
      <div className=" text-2xl font-semibold mb-8 text-center">
        {username}'s Profile
      </div>

      <div className=" text-xl font-semibold mb-8 underline">
        Created Blogs
      </div>
      {isLoaded ? (
        myPosts.length === 0 ? (
          <div className=" text-center">No blogs yet... Write up one now!!</div>
        ) : (
          <Suspense fallback={<Spinner color={"blue"} />}>
            {myPosts.map((post) => (
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
      ) : (
        <Spinner color={"blue"} />
      )}
    </>
  );
};

export default MyPostsPage;
