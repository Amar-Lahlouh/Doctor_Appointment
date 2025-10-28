import React, { useContext, useEffect, useRef } from "react";
import logo from "../../assets/images/logo.png";
import { NavLink, Link } from "react-router-dom";
import userImg from "../../assets/images/avatar-icon.png";
import { BiMenu } from "react-icons/bi";
import { authContext } from "../../context/authContext";
function Header() {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const { currentUser, logout } = useContext(authContext);

  const navLinks = [
    { path: "/home", display: "Home" },
    { path: "/doctors", display: "Find a Doctor" },
    { path: "/services", display: "Services" },
    // { path: "/contact", display: "Contact" },
  ];

  const Header = () => {
    const headerRef = useRef(null);
    const menuRef = useRef(null);
    const handleStickyHeader = () => {
      window.addEventListener("scroll", () => {
        if (
          document.body.scrollTop > 80 ||
          document.documentElement.scrollTop > 80
        ) {
          headerRef.current.classList.add("sticky__header");
        } else {
          headerRef.current.classList.remove("sticky__header");
        }
      });
    };
    useEffect(() => {
      handleStickyHeader();
      return () => window.removeEventListener("scroll", handleStickyHeader());
    });
  };

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");
  return (
    <header className="header flex items-center " ref={headerRef}>
      <div className="container ">
        <div className="flex items-center  justify-between">
          {/* LOGO */}
          <div className="">
            <img loading="lazy" src={logo} alt="" />
          </div>
          {/* menu */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      isActive
                        ? "text-primarycolor text-[16px] leading-7 font-[600]"
                        : "text-textcolor text-[16px] leading-7 font-[500] hover:text-primarycolor"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          {/* nav right */}
          <div className="flex gap-4">
            {currentUser ? (
              <div className="flex my-auto align-middle gap-5">
                <Link
                  to={`${
                    currentUser.user?.role === "patient"
                      ? "/users/profile/me"
                      : "/doctors/profile/me"
                  }`}
                >
                  <figure
                    className="w-[35px] mt-9 h-[35px] rounded-full my-auto"
                    alt=""
                  >
                    <img
                      className="w-fit h-fit"
                      src={currentUser?.user?.data?.photo || userImg}
                      alt=""
                    />
                  </figure>
                </Link>
                <h2 className="">Hello {currentUser?.user?.data?.name} !</h2>
                <button
                  onClick={() => logout()}
                  className="bg-primarycolor my-2 px-6 text-white font-[600] h-[44px] flex items-center rounded-[50px]"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-primarycolor my-2 px-6 text-white font-[600] h-[44px] flex items-center rounded-[50px]">
                  Login
                </button>
              </Link>
            )}
            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
