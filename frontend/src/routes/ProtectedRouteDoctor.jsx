import React, { useContext } from "react";
import { authContext } from "../context/authContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const { currentUser, Loading } = useContext(authContext);
  if (Loading) return <div>Loading...</div>;
  console.log(currentUser?.user?.data?.role, "current user role");
  const isAllowed =
    currentUser && allowedRoles == currentUser?.user?.data?.role;

  return isAllowed ? children : <Navigate to="/login" replace={true} />;
}

export default ProtectedRoute;
