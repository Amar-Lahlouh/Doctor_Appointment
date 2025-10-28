import React, { useContext, useEffect, useState } from "react";
import Loading1 from "../../components/Loading/Loading";
import { authContext } from "../../context/authContext";
import Tabs from "./Tabs";
import { FaExclamation } from "react-icons/fa";
import { BASE_URL } from "../../config";
import starIcon from "../../assets/images/Star.png";
import DoctorAbout from "../../pages/Doctors/DoctorAbout";
import { data } from "react-router-dom";
import Profile from "./Profile";
import Appointments from "./Appointments";
function Dashboard() {
  const { currentUser } = useContext(authContext);
  console.log(currentUser, "Aaaaaaaaaaaaaaaaaaa");
  const [Tab, setTab] = useState("overview");
  const [userData, setUserData] = useState({});
  const [Loading, setLoading] = useState(false);
  let u = currentUser?.user?.data;
  console.log("u", u);
  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {currentUser ? (
          <div className="grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]">
            <Tabs tab={Tab} setTab={setTab} />
            <div className="lg:col-span-2">
              {currentUser?.user?.data?.isApproved === "pending" && (
                <div className="flex p-4 mb-4 text-yellow-800 bg-yellow-50 rounded-lg">
                  <FaExclamation />
                  <span className="sr-only">Info</span>
                  <div className="ml-3 text-sm font-medium">
                    To get approval please complete your profile.We'll review
                    manually and approve within 3 days
                  </div>
                </div>
              )}

              <div className="mt-8">
                {Tab === "overview" && (
                  <div>
                    <div className="flex items-center gap-4 mb-10">
                      <figure className="max-w-[200px] max-h-[200px]">
                        <img
                          src={currentUser?.user?.data?.photo}
                          alt=""
                          className="w-full"
                        />
                      </figure>
                      <div>
                        <span className="bg-[#CCF0F3] text-irisblue py-1 px-4 lg:py-2 lg:px-6 rounded text-[12px] leading-4 lg:text-[16px] lg:leading-6 font-semibold">
                          {u.specialization}
                        </span>
                        <h3 className="text-[22px] leading-9 font-bold text-heading mt-3">
                          {u.name}
                        </h3>
                        <div className="flex items-center gap-[6px]">
                          <span className="flex items-center gap-[6px] text-heading text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold">
                            <img src={starIcon} alt="" /> {u.averageRating}
                          </span>
                          <span className="text-textcolor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold">
                            {u.totalRating}
                          </span>
                        </div>
                        <p className="text__para font-[15px] lg:max-w-[390px] leading-6">
                          {u?.bio}
                        </p>
                      </div>
                    </div>
                    <DoctorAbout
                      name={data.name}
                      about={data.about}
                      qualifications={data.qualifications}
                      experiences={data.experiences}
                    />
                  </div>
                )}
                {Tab === "appointments" && <Appointments u={u._id} />}
                {Tab === "settings" && <Profile doctorData={u} />}
              </div>
            </div>
          </div>
        ) : (
          <Loading1 />
        )}
      </div>
    </section>
  );
}

export default Dashboard;
