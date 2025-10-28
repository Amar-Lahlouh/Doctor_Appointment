import React, { useEffect, useState } from "react";
import doctors from "../../assets/data/doctors";
import DoctorCard from "../../components/Doctors/DoctorCard";
import { Testinomial } from "../../components";
import { BASE_URL } from "../../config.js";
import Loading1 from "../../components/Loading/Loading.jsx";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
function Doctors() {
  const [loading, setLoading] = useState(false);
  const [Doctors, setDoctors] = useState(null);
  const [FilteredDoctors, setFilteredDoctors] = useState(null);
  useEffect(() => {
    const GetDoctors = async () => {
      try {
        setLoading(true);
        console.log("send");
        const res = await axios.get(`${BASE_URL}/doctors/all`, {
          withCredentials: true,
        });
        setDoctors(res.data.data);
        setFilteredDoctors(res.data.data);
        console.log(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    GetDoctors();
  }, []);
  console.log("DOCTORS HOME", Doctors);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    console.log(value);
    if (value) {
      const filtered = Doctors.filter((f) => {
        return (
          f.name.toLowerCase().includes(value.toLowerCase()) ||
          f.specialization?.toLowerCase().includes(value.toLowerCase())
        );
      });

      console.log(filtered, "filtered");
      setFilteredDoctors(filtered);
    } else {
      setFilteredDoctors(Doctors);
    }
  };

  console.log(FilteredDoctors);
  return (
    <>
      {loading && <Loading1 />}
      <section className="bg-[#fff9ea]">
        <div className="container text-center">
          <h2 className="heading">Find a Doctor</h2>
          <div className="flex items-center justify-between rounded-md max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c]">
            <input
              type="search"
              className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textcolor"
              placeholder="Search Doctor by Name or speciality"
              onChange={(e) => handleSearch(e)}
            />
            <button className=" px-5 mt-0 rounded-[0px] rounded-r-md">
              <FaSearch />
            </button>
          </div>
        </div>
      </section>
      {!loading && (
        <section>
          <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {FilteredDoctors?.map((doctor) => (
                <DoctorCard doctor={doctor} key={doctor.id} />
              ))}
            </div>
          </div>
        </section>
      )}
      <Testinomial />
    </>
  );
}

export default Doctors;
