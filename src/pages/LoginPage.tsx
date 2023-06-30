import { useState } from "react";
import Form from "../components/Form";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useClearUserDetails from "../hooks/useClearUserDetails";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const clearUser = useClearUserDetails();
  const [spinner, setSpinner] = useState(false);

  const onSubmit = async (event: React.FormEvent<Element>) => {
    event.preventDefault();
    try {
      setSpinner(true);
      await axios
        .post(`${process.env.REACT_APP_API_URL}/auth/login`, {
          username,
          password,
        })
        .then(function (response) {
          setSpinner(false);
          if (response.data.type === "error") {
            toast.error(response.data.message, {
              autoClose: 1000,
              position: "top-center",
            });
          } else if (response.data.type === "success") {
            toast.success(response.data.message, {
              autoClose: 1000,
              position: "top-center",
            });
          }

          if (response.data.token) {
            const expiresDate = new Date();
            const expirationTime = 7200000; // 2 hr
            expiresDate.setTime(expiresDate.getTime() + expirationTime);
            setCookies("access_token", response.data.token,{
              expires: expiresDate
            });
            window.localStorage.setItem("userID", response.data.userID);
            window.localStorage.setItem("userName", response.data.username);
            setTimeout(() => {
              clearUser();
            }, expirationTime)
            setTimeout(() => {
              navigate("/");
            }, 1500);
          }
        });
    } catch (err) {
      setSpinner(false);
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
        spinner={spinner}
      />
    </>
  );
};

export default LoginPage;
