import { useState } from "react";
import Form from "../components/Form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
// import ReCAPTCHA from "react-google-recaptcha";
import WebcamCapture from "../components/WebcamCapture";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  // const captchaRef: RefObject<any> = useRef();
  // const SITE_KEY = process.env.REACT_APP_reCAPTCHA_SITE_KEY as string;
  // const SECRET_KEY = process.env.REACT_APP_reCAPTCHA_SECRET_KEY;

  const onSubmit = async (event: React.FormEvent<Element>) => {
    event.preventDefault();

    // let token = captchaRef.current.getValue();
    // captchaRef.current.reset();

    // if (!token) {
    //   toast.error("Please verify you are not a robot", {
    //     autoClose: 1000,
    //     position: "top-center",
    //   });
    //   return;
    // } else {
    //   try {
    //     await axios
    //       .post(
    //         `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${token}`
    //       )
    //       .then(function (response) {
    //         if (!response.data.success) {
    //           toast.error("Please verify you are not a robot", {
    //             autoClose: 1000,
    //             position: "top-center",
    //           });
    //           return;
    //         }
    //       });
    //   } catch (err) {
    //     console.error(err);
    //   }
    // }
    if (score === 0) {
      toast.error("Complete Identity Verification", {
        autoClose: 1000,
        position: "top-center",
      });
      return;
    }
    if (score <= 0.9) {
      toast.error("Identity Verification failed. Retry.", {
        autoClose: 1000,
        position: "top-center",
      });
      return;
    }

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
      >
        <WebcamCapture score={score} setScore={setScore}/>
      </Form>
      
    </>
  );
};

export default RegisterPage;
