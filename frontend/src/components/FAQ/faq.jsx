import React from "react";
import faqImg from "../../assets/images/faq-img.png";
import FaqItem from "./FaqItem";
import FaqList from "./FaqList";
function Faq() {
  return (
    <div className="container">
      <div className="flex justify-between gap-[50px] lg:gap-0">
        <div className="w-1/2 hidden md:block">
          <img loading="lazy" src={faqImg} alt="" />
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="heading">Most questions by our beloved patients</h2>
          <FaqList />
        </div>
      </div>
    </div>
  );
}

export default Faq;
