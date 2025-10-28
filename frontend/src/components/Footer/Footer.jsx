import React from "react";
import logo from "../../assets/images/logo.png";
import { FaGithub, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  const quickLinks02 = [
    {
      path: "/doctors",
      display: "Find a Doctor",
    },
    {
      path: "/doctors",
      display: "Request an Appointment",
    },
    {
      path: "/doctors",
      display: "Find a Location",
    },
    {
      path: "/doctors",
      display: "Get an Opinion",
    },
  ];
  const quickLink01 = [
    {
      path: "/",
      display: "Home",
    },
    {
      path: "/",
      display: "About Us",
    },
    {
      path: "/",
      display: "Services",
    },
    {
      path: "/",
      display: "blog",
    },
  ];
  const quickLink03 = [
    {
      path: "/",
      display: "FAQ",
    },
    {
      path: "/",
      display: "Support",
    },
    {
      path: "/",
      display: "Reach Us",
    },
    {
      path: "/",
      display: "Support",
    },
  ];

  const socialLinks = [
    {
      icon: <FaLinkedin className="group-hover:text-white w-4 h-5" />,
    },
    {
      icon: <FaGithub className="group-hover:text-white w-4 h-5" />,
    },
    {
      icon: <FaInstagram className="group-hover:text-white w-4 h-5" />,
    },
    { icon: <FaYoutube className="group-hover:text-white w-4 h-5" /> },
  ];
  const year = new Date().getFullYear();
  return (
    <div className="pb-16 pt-10 border-t  border-[#e5e2e2] mt-5">
      <div className="container">
        <div className="flex justify-between flex-col md:flex-row flex-wrap gap-[30px]">
          <div>
            <img loading="lazy" src={logo} alt="" />
            <p>
              Copyright © {year} developed by Amar Lahlouh all rights reserved
            </p>

            <div className="flex items-center gap-3 mt-4">
              {socialLinks.map((link) => (
                <Link className="w-9 h-9 border border-solid border-[#181A1E] rounded-full flex items-center justify-center group hover:bg-primarycolor">
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-heading">
              Quick Links
            </h2>
            <ul>
              {quickLink01.map((link, index) => (
                <li key={index} className="mb-4">
                  <Link
                    to={`${link.path}`}
                    className="text-[16px]  leading-7 font-[400] text-textcolor"
                  >
                    {link.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col">
            <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-heading">
              I want to
            </h2>
            <ul>
              {quickLinks02.map((link, index) => (
                <li key={index} className="mb-4">
                  <Link
                    to={`${link.path}`}
                    className="text-[16px]  leading-7 font-[400] text-textcolor"
                  >
                    {link.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col">
            <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-heading">
              Support
            </h2>
            <ul>
              {quickLink03.map((link, index) => (
                <li key={index} className="mb-4">
                  <Link
                    to={`${link.path}`}
                    className="text-[16px]  leading-7 font-[400] text-textcolor"
                  >
                    {link.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
