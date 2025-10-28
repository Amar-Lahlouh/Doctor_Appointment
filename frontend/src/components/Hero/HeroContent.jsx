import React from "react";
import { landingData } from "../../assets/data/landing_service_data";
import LandingServiceCard from "../Cards/LandingServiceCard";

function HeroContent() {
  return (
    <section className="py-0 my-5">
      <div className=" flex   justify-center items-center flex-col">
        <div className="max-w-[470px]   ">
          <h2 className="text-[27px] leading-[50px] font-[700] text-heading text-center">
            Providing the best medical services
          </h2>
          <p className="text__para font-light text-center">
            World-class care for everyone. Our health System offers unmatched,
            expert health care
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
        {landingData.map((c) => (
          <LandingServiceCard img={c.img} title={c.title} desc={c.desc} />
        ))}
      </div>
    </section>
  );
}

export default HeroContent;
