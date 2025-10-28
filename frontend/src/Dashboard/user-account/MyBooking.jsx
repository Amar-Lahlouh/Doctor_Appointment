import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import { authContext } from "../../context/authContext";
import { BASE_URL } from "../../config";
import DoctorCard from "../../components/Doctors/DoctorCard";
import { FaLongArrowAltRight } from "react-icons/fa";

function MyBooking() {
  const { currentUser } = useContext(authContext);
  const [Appointments, setAppointments] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [Error, setError] = useState(null);

  useEffect(() => {
    const GetAppointments = async () => {
      try {
        setLoading(true);
        const Res = await axios.get(
          `${BASE_URL}/users/appointments/my-appointments`,
          { withCredentials: true }
        );
        console.log("Fetched Appointments:", Res.data);
        setAppointments(Res.data.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load appointments.");
      } finally {
        setLoading(false);
      }
    };

    GetAppointments();
  }, []);
  console.log(Appointments, "appointments");
  return (
    <div>
      {Loading && (
        <div className="mx-auto flex justify-center align-middle mt-8">
          <HashLoader />
        </div>
      )}
      {Error && <p className="text-red-500">{Error}</p>}
      {Appointments?.length == 0 && !Loading && !Error && (
        <h2 className="mt-5 text-center text-heading leading-7 text-[20px] font-semibold ">
          You didn’t book any doctor yet!
        </h2>
      )}
      {Appointments?.map((doctor) => (
        <></>
        // <>
        //   <img
        //     loading="lazy"
        //     src={photo ? photo : pf}
        //     alt=""
        //     className="w-full h-[270px]"
        //   />

        //   <h2 className="text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 text-heading font-[700] mt-3 lg:mt-5 ">
        //     {name}
        //   </h2>
        //   <div className="mt-2 lg:mt-4 flex items-center justify-between">
        //     <span className="bg-[#CCF0F3] text-irisblue py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold  rounded">
        //       {specialization}
        //     </span>

        //     <div className="flex items-center gap-[6px]">
        //       <span className="flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16] lg:leading-7 font-semibold text-heading">
        //         <img loading="lazy" src={starItem} alt="" />
        //         {avgRating}
        //       </span>
        //       <span>({totalRating})</span>
        //     </div>
        //   </div>
        //   <div className="mt-[18px] lg:mt-5 ">
        //     <div className="flex justify-between">
        //       {/* <h3 className="text-[16px] leading-7 lg:text-[18px] lg:leading-[30px] font-semibold text-heading">
        //           + {totalPatients} patients
        //         </h3> */}
        //       <p className="text-[14px] leading-6 font-[400] text-textcolor">
        //         At {experiences && experiences[0]?.hospital}
        //       </p>{" "}
        //       <p className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E]  flex items-center justify-center group hover:bg-primarycolor hover:border-none">
        //         <FaLongArrowAltRight className="group hover:text-white w-6 h-5" />
        //       </p>
        //     </div>
        //   </div>
        // </>
      ))}
    </div>
  );
}

export default MyBooking;
