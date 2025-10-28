import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import { toast, ToastContainer } from "react-toastify";
import { authContext } from "../context/authContext";
import axios from "axios";
function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [Loading, setLoading] = useState(false);
  const { login } = useContext(authContext);
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      console.log("S");
      await login(formData);
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error(err.response.data.message);
    }
  };
  return (
    <section className="px-5 lg:px-0">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
        <h3 className="text-heading text-[22px] leading-9 font-bold mb-10">
          Hello <span className="text-primarycolor">Welcome</span> Back 🎉
        </h3>
        <form className="py-4 md:py-0" onSubmit={submitHandler}>
          <div className="mb-5">
            <input
              type="email"
              placeholder="Enter Your Email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none placeholder:text-textcolor rounded-md text-[16px] cursor-pointer"
            />
          </div>
          <div className="mb-5">
            <input
              type="password"
              placeholder="Password"
              name="password"
              required
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none placeholder:text-textcolor rounded-md text-[16px] cursor-pointer"
            />
          </div>
          <div className="mt-7">
            <button
              type="submit"
              className="w-full bg-primarycolor text-white text-[18px] leading-lg px-4 py-3"
            >
              Login
            </button>
          </div>
          <p className="mt-5 text-textcolor text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-primarycolor">
              Register
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer
        theme="dark"
        position="top-right"
        autoClose={3000}
        closeOnClick
        pauseOnHover={false}
      />
    </section>
  );
}

export default Login;
