import { NavLink } from "react-router-dom";
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

  return (
    <header className="flex justify-between mb-12 items-center">
      <h1 className="font-bold text-xl">
        <NavLink to="/">Blog App</NavLink>
      </h1>
      <nav className=" text-red-500 flex gap-4">
        <NavLink to="/login" style={navLinkStyles}>
          Login
        </NavLink>
        <NavLink to="/register" style={navLinkStyles}>
          Register
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
