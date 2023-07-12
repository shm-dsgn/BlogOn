import { Navigate } from "react-router-dom";
const RouteProtector = ({ children }: any) => { // eslint-disable-next-line

  const cookieValue = document.cookie
  .split("; ")
  .find((row) => row.startsWith("access_token_state="))
  ?.split("=")[1];
  if (!cookieValue || cookieValue===undefined) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default RouteProtector;
