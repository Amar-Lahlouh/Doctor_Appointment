import React, { useEffect, useState } from "react";
import doctors from "../../assets/data/doctors.js";
import DoctorCard from "./DoctorCard";
import { BASE_URL } from "../../config.js";
import Loading1 from "../Loading/Loading.jsx";
import axios from "axios";

function DoctorList() {
  const [loading, setLoading] = useState(false);
  const [Doctors, setDoctors] = useState(null);
  useEffect(() => {
    const GetDoctors = async () => {
      try {
        setLoading(true);
        console.log("send");
        const res = await axios.get(`${BASE_URL}/doctors/all`, {
          withCredentials: true,
        });
        setDoctors(res.data.data);
        console.log(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    GetDoctors();
  }, []);
  console.log("DOCTORS HOME", Doctors);
  return (
    <>
      {loading && <Loading1 />}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
          {Doctors?.map((doctor) => (
            <DoctorCard doctor={doctor} key={doctor._id} />
          ))}
        </div>
      )}
    </>
  );
}

export default DoctorList;
