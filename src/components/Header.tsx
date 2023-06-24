import { NavLink } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

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

  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const userName = window.localStorage.getItem("userName");

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/login");
  };

  // console.log("cookies", !!cookies.access_token);

  return (
    <header className="flex justify-between mb-12 items-center">
      <h1 className="font-bold text-xl">
        <NavLink to="/">Blog App</NavLink>
      </h1>
      <nav className=" text-blue-500 flex gap-4">
        {!cookies.access_token || cookies.access_token === undefined ? (
          <NavLink to="/login" style={navLinkStyles}>
            Login
          </NavLink>
        ) : (
          <p onClick={logout} className=" cursor-pointer">Logout</p>
        )}
                {!cookies.access_token || cookies.access_token === undefined ? (
        <NavLink to="/register" style={navLinkStyles}>
        Register
      </NavLink>
        ) : (
          <p>@{userName}</p>
        )}
      </nav>
    </header>
  );
};

export default Header;
