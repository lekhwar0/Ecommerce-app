import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-appThemeDarkBlue p-5 text-white text-center rounded-t-lg">
      <h1 className="text-lg font-medium">
        All Right Reserved &copy; Ecommerce App
      </h1>
      <p className="flex justify-center items-center gap-2 mt-5">
        <Link
          to="/about"
          className="my-hover-effect-1 focus:after:scale-x-100 focus:after:origin-bottom-left"
        >
          About
        </Link>
        |
        <Link
          to="/contact"
          className="my-hover-effect-1 focus:after:scale-x-100 focus:after:origin-bottom-left"
        >
          Contact
        </Link>
        |
        <Link
          to="/policy"
          className="my-hover-effect-1 focus:after:scale-x-100 focus:after:origin-bottom-left"
        >
          Privacy Policy
        </Link>
      </p>
    </div>
  );
};

export default Footer;
