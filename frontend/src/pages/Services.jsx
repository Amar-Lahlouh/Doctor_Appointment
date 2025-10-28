import React from "react";
import Services1 from "../components/Services/Services";
import { services } from "../assets/data/services";
import ServiceCard from "../components/Cards/ServiceCard";

function Services() {
  return (
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
        {services.map((item, index) => (
          <ServiceCard item={item} index={index} key={index} />
        ))}
      </div>
    </div>
  );
}

export default Services;
