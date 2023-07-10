import React from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
const RouteProtector = ({ children }: any) => { // eslint-disable-next-line
  const [cookies, _] = useCookies(["access_token"]);

  if (!cookies.access_token || cookies.access_token === undefined) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default RouteProtector;
