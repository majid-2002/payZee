import React from "react";

import logo from "../images/logo.png";

const Footer = () => (
  <div className="w-full p-4 bg-gradient-to-t flex flex-col items-center from-gray-800 to-gray-600 text-white">
    <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
      {/* Add content or links here */}
    </div>

    <div className=" w-full h-1 bg-gray-400 mt-5" />

    <div className=" w-full flex justify-between items-center mt-3">
      <a
        className="text-white text-left text-xs hover:underline"
        href="https://github.com/majid-2002/payZee"
        target="_blank"
        rel="noopener noreferrer"
      >
        Visit the GitHub Repository
      </a>
      <p className="text-white text-right text-xs">
        © {new Date().getFullYear()} PayZee. All rights reserved.
      </p>
    </div>
  </div>
);

export default Footer;
