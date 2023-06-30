import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useClearUserDetails = () => {
  <ToastContainer pauseOnFocusLoss={false} />;
  const navigate = useNavigate();
  const ClearUser = () => {
    window.localStorage.removeItem("userID");
    window.localStorage.removeItem("userName");
    toast.error("Session Timeout", {
      autoClose: 1000,
      position: "top-center",
    });
    setTimeout(() => {
      navigate("/");
      window.location.reload();
    }, 2000);
  };
  return ClearUser;
};

export default useClearUserDetails;
