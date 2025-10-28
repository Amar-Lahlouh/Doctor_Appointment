import React from "react";
import aboutImg from "../../assets/images/about.png";
import aboutCardImg from "../../assets/images/about-card.png";
import { Link } from "react-router-dom";
function About() {
  return (
    <section>
      <div className="container flex justify-center align-middle">
        <div className="flex items-center justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row ">
          <div className="relative w-3/4 lg:w-1/2 xl:w-[550px] z-10 order-2 lg:order-1">
            <img loading="lazy" src={aboutImg} alt="" />
            <div className="absolute z-20 bottom-4 w-[200px] md:w-[300px] right-[-30%] md:right-[-7%] lg:right-[22%]">
              <img loading="lazy" src={aboutCardImg} alt="" />
            </div>
          </div>

          {/* About Content */}
          <div className="w-ful lg:w-1/2 xl:w-[670px] order-1 lg:order-2">
            <h2 className="lg:text-[40px] text-[30px] font-bold ">
              Proud to be one of the nations best
            </h2>
            <p className="text__para max-w-[500px]">
              For 30 years in a row, U.S. News and World Report has recognized
              us as one of the best publics hospitals in the Nation and #1 in
              the Texas.
            </p>
            <p className="text__para mt-[30px] max-w-[500px]">
              Our best is something we strive for each day, caring for our
              patients - not looking back at what we accomplished but towards
              what we can do tomorrow. Providing the best
            </p>
            <Link to="/doctors">
              <button className="btn cursor-pointer">Learn More</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
