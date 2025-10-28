import React, { useContext } from "react";
import { IoIosMenu } from "react-icons/io";
import { authContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
function Tabs({ tab, setTab }) {
  const { logout } = useContext(authContext);
  const navigate = useNavigate();
  return (
    <div>
      <span className="lg:hidden">
        <IoIosMenu className="w-6 h-6 cursor-pointer" />
      </span>
      <div className="hidden lg:flex flex-col p-[30px] bg-white shadow-lg items-center h-max rounded-md ">
        <button
          onClick={() => setTab("overview")}
          className={` ${
            tab === "overview"
              ? "bg-indigo-100 text-primarycolor"
              : "bg-transparent text-heading"
          } w-full btn mt-0 rounded-md`}
        >
          Overview
        </button>
        <button
          onClick={() => setTab("appointments")}
          className={` ${
            tab === "appointments"
              ? "bg-indigo-100 text-primarycolor"
              : "bg-transparent text-heading"
          } w-full btn mt-0 rounded-md`}
        >
          Appointments
        </button>
        <button
          onClick={() => setTab("settings")}
          className={` ${
            tab === "settings"
              ? "bg-indigo-100 text-primarycolor"
              : "bg-transparent text-heading"
          } w-full btn mt-0 rounded-md`}
        >
          Settings
        </button>
        <div className="mt-[100px] w-full">
          <button
            onClick={() => logout()}
            className="w-full cursor-pointer bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white "
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Tabs;
