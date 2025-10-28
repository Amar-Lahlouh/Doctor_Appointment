import React from "react";
import heroImg01 from "../../assets/images/hero-img01.png";
import heroImg02 from "../../assets/images/hero-img02.png";
import heroImg03 from "../../assets/images/hero-img03.png";
import { Link } from "react-router-dom";
function Hero() {
  return (
    <section className="hero__section  pt-[60px] 2xl:h-[800px]">
      <div className="container">
        <div className="container pb-1 flex flex-col lg:flex-row gap-[90px] items-center justify-center">
          {/* Hero content */}
          <div className="flex mt-9 justify-center">
            <div className="lg:w-[490px] ">
              <h1 className="text-[36px] leading-[46px] text-heading font-[800] md:text-[30px] md:leading-[50px]">
                We help patients live a healthy, longer life.
              </h1>
              <p className="text__para font-light max-w-[400px]">
                Your health is our priority — expert care, compassionate
                service, every step of the way.
              </p>

              <div className="mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-[30px]">
                <div>
                  <h2 className="text-[30px] leading-[56px] lg:text-[40px] lg:leading-[54px] font-[700] text-heading">
                    30+
                  </h2>
                  <span className="w-[100px] h-2 bg-yellow rounded-full block mt-[-14px]"></span>
                  <p className="text__para">Years of Experience</p>
                </div>
                <div>
                  <h2 className="text-[30px] leading-[56px] lg:text-[40px] lg:leading-[54px] font-[700] text-heading">
                    15+
                  </h2>
                  <span className="w-[100px] h-2 bg-purple rounded-full block mt-[-14px]"></span>
                  <p className="text__para">Clinic Location</p>
                </div>
                <div>
                  <h2 className="text-[30px] leading-[56px] lg:text-[40px] lg:leading-[54px] font-[700] text-heading">
                    100%
                  </h2>
                  <span className="w-[100px] h-2 bg-irisblue rounded-full block mt-[-14px]"></span>
                  <p className="text__para">Patient Satisfaction</p>
                </div>
              </div>
            </div>

            {/* hero counter */}
          </div>
          {/* Hero Content */}
          <div className="flex max-w-[400px] gap-[30px] justify-end">
            <div>
              <img loading="lazy" src={heroImg01} alt="" />
            </div>
            <div className="mt-[30px]">
              <img
                loading="lazy"
                src={heroImg02}
                alt=""
                className="w-full mb-[30px]"
              />
              <img loading="lazy" src={heroImg03} alt="" className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
