import React, { useState } from "react";
import signupImg from "../../assets/images/signup.gif";
import avatar from "../../assets/images/doctor-img01.png";
import { useNavigate } from "react-router-dom";
import uploadFile from "../../utils/uploadImageKit.js";
import axios from "axios";
import { BASE_URL } from "../../config.js";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
function Profile({ user }) {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [Error, setError] = useState("");
  const [LoadingPhoto, setLoadingPhoto] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    photo: null,
    gender: "",
    bloodType: "",
  });
  console.log(selectedFile);
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileInputChange = async (event) => {
    setLoadingPhoto(true);
    const file = event.target.files[0];
    console.log(file);
    const data = await uploadFile(file, file.name);
    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data.url });
    setLoadingPhoto(false);
  };

  useEffect(() => {
    setFormData({
      name: user.name,
      email: user.email,
      photo: user.photo,
      gender: user.gender,
      bloodType: user.bloodType,
    });
  }, [user]);
  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      console.log("Start");
      console.log(formData);
      const res = await axios.put(`${BASE_URL}/users/${user._id}`, formData);
      console.log("Edn");
      const { message } = res.data;

      toast.success(message);
      setTimeout(() => navigate("/users/profile/me"), 1500);
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10">
      {" "}
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
            disabled={true}
            value={formData.email}
            onChange={handleInputChange}
            className="w-full text-gray-400 px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none placeholder:text-textcolor rounded-md text-[16px] cursor-pointer"
          />
        </div>
        <div className="mb-5">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none placeholder:text-textcolor rounded-md text-[16px] cursor-pointer"
          />
        </div>
        <div className="mb-5">
          <input
            type="text"
            placeholder="Blood Type"
            name="bloodType"
            required
            value={formData.bloodType}
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
          {formData.photo && (
            <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primarycolor">
              <img
                loading="lazy"
                src={formData.photo}
                alt=""
                className="w-full rounded-full"
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
              {selectedFile ? selectedFile.name : "Upload Photo"}
            </label>
          </div>
        </div>

        <div className="mt-7">
          <button
            disabled={(loading && true) || (LoadingPhoto && true)}
            type="submit"
            className={`w-full disabled:bg-gray-400 bg-primarycolor text-white text-[18px] leading-lg px-4 py-3`}
          >
            {loading ? <HashLoader size={25} color="#ccc" /> : "Update"}
          </button>
        </div>
      </form>
      <ToastContainer
        theme="dark"
        position="top-right"
        autoClose={3000}
        closeOnClick
        pauseOnHover={false}
      />
    </div>
  );
}

export default Profile;
