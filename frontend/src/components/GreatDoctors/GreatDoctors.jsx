import React from "react";
import DoctorList from "../Doctors/DoctorList";

function GreatDoctors() {
  return (
    <section>
      <div className="container">
        <div className="xl:w-[470px] mx-auto">
          <h2 className="heading text-center">Our Great Doctors</h2>
          <p className="text__para text-center">
            World-class care for everyone.Our health System offers unmatched,
            expert health care.
          </p>
        </div>
        <DoctorList />
      </div>
    </section>
  );
}

export default GreatDoctors;
