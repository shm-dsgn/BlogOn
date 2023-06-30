import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreatePost from "./pages/CreatePostPage";
import PostPage from "./pages/PostPage";
import EditPostPage from "./pages/EditPostPage";
import MyPostsPage from "./pages/MyProfilePage";

function App() {
  return (
    <main className=" p-2 mx-auto my-0 max-w-2xl font-inter mb-16">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/post/edit/:id" element={<EditPostPage />} />
        <Route path="/post/myprofile/:id" element={<MyPostsPage />} />
      </Routes>
      <footer className=" inline-block fixed bottom-0 left-0 w-full bg-black text-white text-center py-1 text-xs">
        The site takes longer time to load due to the server hosted on a <a href="https://community.render.com/t/slow-loading-website-mern/11871"><u>free hosting service</u></a>. Hence the slow loading of the data. Please be patient. This issue will be resolved soon.
      </footer>
    </main>
  );
}

export default App;
