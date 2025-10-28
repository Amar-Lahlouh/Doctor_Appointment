import React, { useContext, useEffect, useState } from "react";
import starIcon from "../../assets/images/Star.png";
import doctorImg from "../../assets/images/doctor-img02.png";
import DoctorAbout from "./DoctorAbout";
import Feedback from "./Feedback";
import SidePanel from "./SidePanel";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../config";
import Loading1 from "../../components/Loading/Loading";
import { authContext } from "../../context/authContext";
import { toast, ToastContainer } from "react-toastify";
import { useCallback } from "react";
function DoctorsDetails() {
  const [tab, setTab] = useState("about");
  const id = useParams().id;
  const { currentUser } = useContext(authContext);
  console.log(id);
  const [loading, setLoading] = useState(false);
  const [SingleDoctor, setSingleDoctor] = useState(null);
  const [Reviews, setReviews] = useState([]);
  console.log(SingleDoctor, "singlef");

  const getDoctorReviews = useCallback(async () => {
    const res = await axios.get(`${BASE_URL}/doctors/${id}/reviews`, {
      withCredentials: true,
    });
    setReviews(res?.data?.data || []);
  }, []);

  const handleReviewSubmit = async ({ rating, reviewText }) => {
    const res = await axios.post(
      `${BASE_URL}/doctors/${id}/reviews`,
      { rating, reviewText },
      { withCredentials: true }
    );

    toast.success(res.data.message || "Review submitted successfully!");
    getDoctorReviews();
  };
  //console.log(currentUser.user, "uuuuuuu");
  useEffect(() => {
    const GetSingleDoctor = async () => {
      try {
        setLoading(true);
        console.log("send");
        const res = await axios.get(`${BASE_URL}/doctors/${id}`, {
          withCredentials: true,
        });
        setSingleDoctor(res.data.data);
        setReviews(res.data.data?.reviews || []);
        console.log("res.data", res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    GetSingleDoctor();
  }, []);
  console.log(loading);
  console.log("single doc", SingleDoctor);
  return (
    <>
      {!currentUser && (
        <div className="text-center mt-9">
          <h2 className="mb-5 font-bold text-2xl">
            You have to Login or Signup First!
          </h2>
          <Link to="/login" className="bg-gray-400 text-white p-3 mt-9">
            Go to Login
          </Link>{" "}
        </div>
      )}
      {loading ? (
        <Loading1 />
      ) : (
        currentUser != null && (
          <section>
            <div className="max-w-[1170px] px-5 mx-auto">
              <div className="grid md:grid-cols-3 gap-[50px]">
                <div className="md:col-span-2">
                  <div className="flex items-center gap-5">
                    <figure className="max-w-[200px] max-h-[200px]">
                      <img
                        loading="lazy"
                        src={SingleDoctor?.photo}
                        alt=""
                        className="w-full"
                      />
                    </figure>

                    <div>
                      <span className="bg-[#CCF0F3] text-irisblue py-1 px-6 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
                        {SingleDoctor?.specialization}
                      </span>
                      <h3 className="text-heading text-[22px] leading-9 mt-3 font-bold">
                        {SingleDoctor?.name}
                      </h3>
                      <div className="flex items-center gap-[6px]">
                        <span className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-heading">
                          <img loading="lazy" src={starIcon} alt="" /> 4.8
                        </span>
                        <span className="text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[400] text-textcolor">
                          ({SingleDoctor?.totalRating})
                        </span>
                      </div>

                      <p className="text__para text-[14px] leading-5 md:text-[15px] lg:max-w-[390px] ">
                        Get to know more about the doctor you chose!
                      </p>
                    </div>
                  </div>

                  <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
                    <button
                      onClick={() => setTab("about")}
                      className={`${
                        tab === "about" &&
                        "border-b border-solid border-primarycolor"
                      }py-2 px-5 mr-5 cursor-pointer text-[16px] leading-7 text-heading font-semibold`}
                    >
                      About
                    </button>
                    <button
                      onClick={() => setTab("feedback")}
                      className={`${
                        tab === "feedback" &&
                        "border-b border-solid border-primarycolor"
                      }py-2 px-5 cursor-pointer mr-5 text-[16px] leading-7 text-heading font-semibold`}
                    >
                      Feedback
                    </button>
                    <button
                      onClick={() => setTab("appointment")}
                      className={`${
                        tab === "appointment" &&
                        "border-b border-solid border-primarycolor"
                      }py-2 px-5 cursor-pointer mr-5 text-[16px] leading-7 text-heading font-semibold`}
                    >
                      Appointments
                    </button>
                  </div>
                  <div className="mt-[50px]">
                    {tab === "about" && (
                      <DoctorAbout
                        name={SingleDoctor?.name}
                        about={SingleDoctor?.about}
                        qualifications={SingleDoctor?.qualifications}
                        experiences={SingleDoctor?.experiences}
                      />
                    )}
                    {tab === "feedback" && (
                      <Feedback
                        reviews={Reviews}
                        onSubmitReview={handleReviewSubmit}
                        totalRating={SingleDoctor?.totalRating}
                      />
                    )}
                    {tab == "appointment" && (
                      <SidePanel
                        loading={loading}
                        doctorId={SingleDoctor?._id}
                        ticketPrice={SingleDoctor?.ticketPrice}
                        WorkTime={
                          loading == false ? SingleDoctor?.WorkTime : null
                        }
                      />
                    )}
                  </div>
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
        )
      )}
    </>
  );
}

export default DoctorsDetails;
