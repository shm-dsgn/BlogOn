import { useRef, useState, RefObject } from "react";
import Form from "../components/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReCAPTCHA from "react-google-recaptcha";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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

    try {
      setSpinner(true);
      await axios
        .post(
          `${process.env.REACT_APP_API_URL}/auth/login`,
          {
            username,
            password,
            captchaToken,
          },
          { withCredentials: true }
        )
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
