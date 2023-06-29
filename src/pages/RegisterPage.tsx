import { useState } from "react";
import Form from "../components/Form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [spinner, setSpinner] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (event: React.FormEvent<Element>) => {
    event.preventDefault();
    // console.log("onSubmit regider page", username, password);

    try {
      setSpinner(true);
      await axios
        .post(`${process.env.REACT_APP_API_URL}/auth/register`, {
          username,
          password,
        })
        .then(function (res) {
          setSpinner(false);
          if (res.data.type === "error") {
            toast.error(res.data.message, {
              autoClose: 1000,
              position: "top-center",
            });
          } else if (res.data.type === "success") {
            toast.success(res.data.message, {
              autoClose: 1000,
              position: "top-center",
            });
            setTimeout(() => {
              navigate("/login");
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
        label={"Register"}
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

export default RegisterPage;
