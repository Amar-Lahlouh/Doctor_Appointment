import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";
function LandingServiceCard({ img, title, desc }) {
  return (
    <div className="py-[30px] px-5 flex flex-col justify-center align-middle">
      <div className="flex items-center justify-center">
        <img loading="lazy" src={img} alt="" />
      </div>
      <div className="mt-[30px] flex  flex-col justify-center align-middle text-center">
        <h2 className="text-[20px] leading-9 text-heading font-[700] text-center">
          {title}
        </h2>
        <p className="text-[16px] w-[300px] mx-auto leading-7 text-textcolor flex items-center justify-center font-[400] mt-4 ">
          {desc}
        </p>
        <Link
          to="/doctors"
          className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primarycolor hover:border-none"
        >
          <FaLongArrowAltRight className="group hover:text-white w-6 h-5" />
        </Link>
      </div>
    </div>
  );
}

export default LandingServiceCard;
