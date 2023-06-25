import Header from "./components/Header";
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreatePost from "./pages/CreatePostPage";


function App() {
  return (
    <main className=" p-2 mx-auto my-0 max-w-2xl">
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/create" element={<CreatePost/>} />
      </Routes>
    </main>
  );
}

export default App;
