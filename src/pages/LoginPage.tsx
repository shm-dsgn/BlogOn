import { useState } from "react";
import Form from "../components/Form";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const onSubmit = async (event: React.FormEvent<Element>) => {
    event.preventDefault();
    // console.log("onSubmit login page", username, password);
    try {
      await axios
        .post("http://localhost:3001/auth/login", {
          username,
          password,
        })
        .then(function (response) {
          if (response.data.type === "error") {
            toast.error(response.data.message, {
              autoClose: 2000,
              position: "top-center",
            });
          }

          if (response.data.token) {
            setCookies("access_token", response.data.token);
            window.localStorage.setItem("userID", response.data.userID);
            window.localStorage.setItem("userName", response.data.username);
            navigate("/");
          }
        });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <ToastContainer pauseOnFocusLoss={false} />
      <Form
        label={"Login"}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default LoginPage;
