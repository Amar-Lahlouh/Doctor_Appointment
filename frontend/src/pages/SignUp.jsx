import React, { useState } from "react";
import signupImg from "../assets/images/signup.gif";
import avatar from "../assets/images/doctor-img01.png";
import { Link, useNavigate } from "react-router-dom";
import uploadFile from "../utils/uploadImageKit.js";
import axios from "axios";
import { BASE_URL } from "../config.js";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function SignUp() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [PreviewURL, setPreviewURL] = useState(null);
  const [Error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    photo: selectedFile,
    gender: "",
    role: "",
  });

  const [Unable, setUnable] = useState(false);
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    setUnable(true);
    console.log(file);
    const data = await uploadFile(file, file.name);
    setPreviewURL(data.url);
    setSelectedFile(data.url);
    setUnable(false);
    setFormData({ ...formData, photo: data.url });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${BASE_URL}/auth/register`, formData);
      const { message } = await res.data;
      console.log(message);
      setLoading(false);
      toast.success(message);
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      toast.error(err.response.data.message);
      setLoading(false);
    }
  };

  return (
    <section className="px-5 xl:px-0">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="hidden lg:block bg-primarycolor rounded-l-lg">
            <figure className="rounded-l-lg">
              <img
                loading="lazy"
                src={signupImg}
                alt=""
                className="w-full rounded-l-lg"
              />
            </figure>
          </div>
          <div className="rounded-l-lg lg:pl-16 py-10">
            <h3 className="text-heading text-[22px] leading-9 font-bold mb-10">
              Create an <span className="text-primarycolor">Account</span>
            </h3>
            <form onSubmit={submitHandler}>
              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none placeholder:text-textcolor rounded-md text-[16px] cursor-pointer"
                />
              </div>
              <div className="mb-5">
                <input
                  type="email"
                  placeholder="Enter your email"
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
              <div className="mb-5">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="cpassword"
                  required
                  value={formData.cpassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none placeholder:text-textcolor rounded-md text-[16px] cursor-pointer"
                />
              </div>

              <div className="mb-5 flex items-center justify-between">
                <label
                  htmlFor=""
                  className="text-heading font-bold text-[16px] leading-7"
                >
                  Are you a:
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    id=""
                    className="text-textcolor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                  >
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                  </select>
                </label>
              </div>
              <div className="mb-5 flex items-center justify-between">
                <label
                  htmlFor=""
                  className="text-heading font-bold text-[16px] leading-7"
                >
                  Gender:
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    id=""
                    className="text-textcolor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">other</option>
                  </select>
                </label>
              </div>
              <div className="mb-5 flex items-center gap-3">
                {selectedFile && (
                  <figure className="w-[60px] h-[60px] rounded-full border">
                    <img
                      loading="lazy"
                      src={PreviewURL}
                      alt=""
                      className="w-[60px] h-[60px] rounded-full"
                    />
                  </figure>
                )}
                <div className="relative w-[130px] h-[50px]">
                  <input
                    type="file"
                    name="photo"
                    id="customFile"
                    onChange={handleFileInputChange}
                    accept=".jpg , .png"
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <label
                    htmlFor="customFile"
                    className="absolute  top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-heading font-semibold rounded-lg truncate cursor-pointer"
                  >
                    Upload Photo
                  </label>
                </div>
              </div>

              <div className="mt-7">
                <button
                  disabled={Unable && true}
                  type="submit"
                  className="w-full bg-primarycolor text-white text-[18px] leading-lg px-4 py-3 disabled:bg-gray-400"
                >
                  {Unable ? <HashLoader size={35} color="#ccc" /> : "Register"}
                </button>
              </div>
              <p className="mt-5 text-textcolor text-center">
                Already have an account?{" "}
                <Link to="/login" className="text-primarycolor">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
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

export default SignUp;
