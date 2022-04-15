import React from "react";
import logo from "../assets/budda-logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="fixed w-full bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600  p-3 shadow-2xl z-50">
      <nav className="container w-3/4 mx-auto flex items-center justify-between flex-wrap">
        <Link to="/">
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <img
              className="w-10 h-10 mr-4"
              style={{ textShadow: "2px 2px 4px #000000" }}
              src={logo}
              alt=""
            />

            <span className="font-semibold text-xl tracking-tight">9Tham</span>
          </div>
        </Link>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <a
              href="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0 text-gray-50 hover:text-white mr-4"
            >
              หน้าแรก
            </a>
            <a
              href="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0 text-gray-50 hover:text-white mr-4"
            >
              เข้าสู่ระบบ
            </a>
            <a
              href="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0 text-gray-50 hover:text-white"
            >
              Blog
            </a>
          </div>
          <div>
            {/* register page */}
            <Link to={"/"}>
              <button className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
                ลงทะเบียน
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
