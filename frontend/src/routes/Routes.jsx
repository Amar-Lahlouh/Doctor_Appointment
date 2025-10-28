import React from "react";
import { Home, Login, SignUp, Services, Contact } from "../pages/index";
import { Doctors, DoctorsDetails } from "../pages/Doctors";
import { Routes, Route } from "react-router-dom";
import MyAccount from "../Dashboard/user-account/MyAccount";
import Dashboard from "../Dashboard/doctor-account/Dashboard";
import ProtectedRoute from "./ProtectedRouteDoctor";
import ProtectedRouteUser from "./ProtectedRouteUser";
import CheckoutSuccess from "../pages/CheckoutSuccess";
import Admin from "../pages/Admin";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
function Routers() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:id" element={<DoctorsDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/checkout-success" element={<CheckoutSuccess />} />

        <Route
          path="/users/profile/me"
          element={
            <ProtectedRouteUser>
              <MyAccount />
            </ProtectedRouteUser>
          }
        />
        <Route
          path="/doctors/profile/me"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}

export default Routers;
