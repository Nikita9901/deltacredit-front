import React from "react";
import { useIsAuthenticated } from "../hooks";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthenticatedWall: React.FC = () => {
  const [isAuthenticated, loading] = useIsAuthenticated();
  const location = useLocation();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} replace state={{ redirectTo: location }} />
  );
};

export default AuthenticatedWall;
