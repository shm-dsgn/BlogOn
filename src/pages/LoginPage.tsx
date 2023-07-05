import { useRef, useState, RefObject } from "react";
import Form from "../components/Form";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReCAPTCHA from "react-google-recaptcha";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState(false);

  const captchaRef: RefObject<any> = useRef();
  const SITE_KEY = process.env.REACT_APP_reCAPTCHA_SITE_KEY as string;

  const onSubmit = async (event: React.FormEvent<Element>) => {
    event.preventDefault();

    let captchaToken = captchaRef.current.getValue();
    captchaRef.current.reset();

    if (!captchaToken) {
      toast.error("Please verify you are not a robot", {
        autoClose: 1000,
        position: "top-center",
      });
      return;
    }
    // } else {
    //   try {
    //     await axios
    //       .post(
    //         // `${process.env.REACT_APP_API_URL}/auth/verify-captcha`,
    //         // { token, SECRET_KEY },
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

    try {
      setSpinner(true);
      await axios
        .post(`${process.env.REACT_APP_API_URL}/auth/login`, {
          username,
          password,
          captchaToken,
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
            const expirationTime = 60 * 60 * 1000; // 1 hr
            expiresDate.setTime(expiresDate.getTime() + expirationTime);
            setCookies("access_token", response.data.token, {
              expires: expiresDate,
            });
            window.localStorage.setItem("userID", response.data.userID);
            window.localStorage.setItem("userName", response.data.username);
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
      >
        <ReCAPTCHA className="recaptcha" sitekey={SITE_KEY} ref={captchaRef} />
      </Form>
    </>
  );
};

export default LoginPage;
