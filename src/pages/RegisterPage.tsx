import { useState } from "react";
import Form from "../components/Form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event: React.FormEvent<Element>) => {
    event.preventDefault();
    console.log("onSubmit regider page", username, password);

    try {
      await axios
        .post("http://localhost:3001/auth/register", {
          username,
          password,
        })
        .then(function (res) {
          if(res.data.type === "error"){
            toast.error(res.data.message, {
              autoClose: 2000,
              position: "top-center",
            });
          } else if (res.data.type === "success") {
            toast.success(res.data.message, {
              autoClose: 2000,
              position: "top-center",
            });
          }
        });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <ToastContainer pauseOnFocusLoss={false}/>
      <Form
        label={"Register"}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default RegisterPage;
