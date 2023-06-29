import Header from "./components/Header";
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreatePost from "./pages/CreatePostPage";
import PostPage from "./pages/PostPage";
import EditPostPage from "./pages/EditPostPage";


function App() {
  return (
    <main className=" p-2 mx-auto my-0 max-w-2xl font-inter">
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/create" element={<CreatePost/>} />
        <Route path="/post/:id" element={<PostPage/>} />
        <Route path="/post/edit/:id" element={<EditPostPage/>} />
      </Routes>
    </main>
  );
}

export default App;
