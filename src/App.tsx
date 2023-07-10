import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreatePost from "./pages/CreatePostPage";
import PostPage from "./pages/PostPage";
import EditPostPage from "./pages/EditPostPage";
import MyPostsPage from "./pages/MyProfilePage";
import RouteProtector from "./components/RouteProtector";

function App() {
  return (
    <main className=" p-2 mx-auto my-0 max-w-2xl font-inter">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/create" element={<RouteProtector><CreatePost /></RouteProtector>} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/post/edit/:id" element={<RouteProtector><EditPostPage /></RouteProtector>} />
        <Route path="/post/myprofile/:id" element={<MyPostsPage />} />
      </Routes>
    </main>
  );
}

export default App;
