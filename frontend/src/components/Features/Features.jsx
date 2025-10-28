import React from "react";
import { Link } from "react-router-dom";
import featureImg from "../../assets/images/feature-img.png";
import videoIcon from "../../assets/images/video-icon.png";
import avatarIcon from "../../assets/images/avatar-icon.png";
function Features() {
  return (
    <section className="container">
      <div className="flex items-center px-6 flex-col lg:flex-row">
        <div className="xl:w-[670px]">
          <h2 className="lg:text-[40px] text-[20px] sm:text-[30px] font-bold">
            Get virtual treatment <br />
            anytime:
          </h2>
          <ul className="pl-4">
            <li className="text__para ">
              1.Schedule the appointment directly.
            </li>
            <li className="text__para">
              2. Search for you physician here , and contact their office.
            </li>
            <li className="text__para">
              3.View our physicians who are accepting new patients, use the
              online schedualing tool to select an appoinment time.
            </li>
          </ul>
          <Link to="/doctors">
            <button className="btn">Learn More</button>
          </Link>
        </div>
        <div className="relative z-10 xl:w-[770px] flex justify-end mt-[50px] lg:mt-0">
          <img loading="lazy" src={featureImg} className="w-3/4" alt="" />
          <div className="w-[150px] lg:w-[248px] bg-white absolute bottom-[50px] left-0 md:bottom-[100px] md:left-5 z-20 p-2 pb-3 lg:pt-4 lg:px-4 lg:pb-[26px] rounded-[10px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[6px] lg:gap-3">
                <p className="text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-heading font-[600] ">
                  Tue , 24
                </p>
                <p className="text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-heading font-[400] ">
                  10:00AM
                </p>
              </div>
              <span className="w-5 h-5 lg:w-[34px] lg:h-[34px] flex items-center justify-center bg-yellow rounded py-1 px-[6px] lg:py-3 lg:px-[9px]">
                <img loading="lazy" src={videoIcon} alt="" />
              </span>
            </div>

            <div className="w-[65px] lg:w-[96px] bg-[#CCF0F3] py-1 px-2 lg:py-[6px] lg:px-[10px] text-[8px] leading-[8px] lg:text-[12px] lg:leading-4 text-irisblue font-[500] mt-2 lg:mt-4 rounded-full">
              Consultation
            </div>
            <div className="flex items-center gap-[6px] lg:gap-[10px] mt-2 lg:mt-[18px]">
              <img loading="lazy" src={avatarIcon} alt="" />
              <h4 className="text-[10px] leading-3 lg:text-[16px] lg:leading-[22px] font-[700] text-heading">
                Wayne Collins
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
