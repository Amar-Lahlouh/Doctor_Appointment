import React, { useContext } from "react";
import { authContext } from "../context/authContext";
import { Navigate } from "react-router-dom";

function ProtectedRouteUser({ children }) {
  const { currentUser, Loading } = useContext(authContext);
  console.log(currentUser?.user?.role);
  if (Loading) return <div>Loading...</div>;
  const isAllowed = currentUser && currentUser?.user.role == "patient";

  return isAllowed ? children : <Navigate to="/login" replace={true} />;
}

export default ProtectedRouteUser;
