import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FilePlus, SignOut, User } from "@phosphor-icons/react";
import axios from "axios";
import logo from "../logo.png";

interface NavLinkProps {
  isActive: boolean;
  // other props...
}
const Header = () => {
  const navLinkStyles = ({ isActive }: NavLinkProps) => {
    return {
      textDecoration: isActive ? "underline" : "none",
    };
  };

  const navigate = useNavigate();
  const userName = window.localStorage.getItem("userName");
  const userID = window.localStorage.getItem("userID");
  const cookieValue = document.cookie
  .split("; ")
  .find((row) => row.startsWith("access_token_state="))
  ?.split("=")[1];
  // console.log(cookieValue);

  const logout = () => {
    try{
      axios.get(`${process.env.REACT_APP_API_URL}/auth/logout`, {
        withCredentials: true,
      })
    } catch(err) {
      console.error(err)
    }
    window.localStorage.removeItem("userID");
    window.localStorage.removeItem("userName");
    navigate("/login");
    navigate(0);
  };

  return (
    <header className="flex justify-between items-center mb-8 mt-2l">
      <h1 className="font-bold text-xl">
        <NavLink to="/" className=" flex justify-center items-center">
          <img src={logo} className=" w-12" alt="logo" title="Home" />
          <p className=" text-base">BlogOn</p>
        </NavLink>
      </h1>
      <nav className=" text-blue-500 flex gap-4">
        {!cookieValue || cookieValue===undefined ? (
          <>
            <NavLink
              title="Login"
              to="/login"
              style={navLinkStyles}
              className="bg-blue-500 text-white py-2 px-2 rounded text-sm flex justify-center items-center"
            >
              Login
            </NavLink>
            <NavLink
              title="Register"
              to="/register"
              style={navLinkStyles}
              className="bg-blue-500 text-white py-2 px-2 rounded text-sm flex justify-center items-center"
            >
              Register
            </NavLink>
          </>
        ) : (
          <div className="flex justify-center items-center gap-2">
            <NavLink to="/create" title="Create Post/Blog">
              <button className="bg-green-500 hover:bg-green-700 text-white py-2 px-2 rounded focus:outline-none focus:shadow-outline text-xs flex justify-center items-center">
                <FilePlus size={20} weight="bold" />
              </button>
            </NavLink>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-700 text-white py-2 px-2 rounded focus:outline-none focus:shadow-outline text-xs flex justify-center items-center"
              title="Sign/Log Out"
            >
              <SignOut size={20} weight="bold" />
            </button>
            <NavLink to={`/post/myprofile/${userID}`}>
              <div
                className="bg-blue-500 text-white py-2 px-2 rounded text-xs flex justify-center items-center"
                title="My Profile"
              >
                <User size={20} weight="fill" />
                &nbsp;{userName}
              </div>
            </NavLink>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
