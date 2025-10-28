import React, { useContext, useState } from "react";
import userImg from "../../assets/images/doctor-img01.png";
import { authContext } from "../../context/authContext";
import MyBooking from "./MyBooking";
import Profile from "./Profile";
import useGetProfile from "../../hooks/UseFetchedData";
import { BASE_URL } from "../../config";
import { data } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";
import Loading1 from "../../components/Loading/Loading";
function MyAccount() {
  const { currentUser, logout } = useContext(authContext);
  const [tab, setTab] = useState("bookings");
  const [userData, setUserData] = useState({});
  const [Loading, setLoading] = useState(false);
  const userId = currentUser?.user?._id;
  useEffect(() => {
    const GetUserProfile = async () => {
      try {
        setLoading(true);
        console.log("ds");
        let userRes = await axios.get(`${BASE_URL}/users/getme`, {
          withCredentials: true,
        });
        console.log(userRes, "S");
        setUserData(userRes.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    GetUserProfile();
  }, []);
  console.log("usedata", userData);
  return (
    <section>
      {Loading ? (
        <Loading1 />
      ) : (
        <div className="max-w-[1170px] px-5 mx-auto">
          <div className="grid md:grid-cols-3 gap-10">
            <div className="pb-[50px] px-[30px] roun'ded-md">
              <div className="flex items-center justify-center">
                <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primarycolor">
                  <img
                    src={currentUser?.user?.photo || userImg}
                    alt=""
                    className="w-full h-full rounded-full "
                  />
                </figure>
              </div>

              <div className="text-center mt-4">
                <h3 className="text-[18px] leading-[30px] text-heading font-bold">
                  {currentUser?.user?.name}
                </h3>
                <p className="text-textcolor text-[15px] leading-6 font-medium">
                  {currentUser?.user?.email}
                </p>
                <p className="text-textcolor text-[15px] leading-6 font-medium">
                  Blood Type:{" "}
                  <span className="ml-2 text-heading text-[22px] leading-8">
                    {currentUser?.user?.bloodType}
                  </span>
                </p>
              </div>
              <div className="mt-[50px] md:mt-[100px]">
                <button
                  onClick={() => logout()}
                  className="w-full cursor-pointer bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white "
                >
                  Logout
                </button>
              </div>
            </div>
            <div className="md:col-span-2 md:px-[30px]">
              <div>
                <butto
                  onClick={() => setTab("bookings")}
                  className={`${
                    tab === "bookings" &&
                    "bg-primarycolor text-white font-normal"
                  } p-2 cursor-pointer mr-5 px-5 rounded-md text-heading font-semibold text-[16px] leading-7 border border-solid border-primarycolor`}
                >
                  My Bookings
                </butto>
                <button
                  onClick={() => setTab("settings")}
                  className={`${
                    tab === "settings" &&
                    "bg-primarycolor text-white font-normal"
                  } p-2 cursor-pointer mr-5 px-5 rounded-md text-heading font-semibold text-[16px] leading-7 border border-solid border-primarycolor`}
                >
                  Profile Settings
                </button>
              </div>

              {tab === "bookings" && <MyBooking />}
              {tab === "settings" && <Profile user={userData} />}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default MyAccount;
