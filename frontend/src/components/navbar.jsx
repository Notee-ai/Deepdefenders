import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-[#111a22] px-4 py-3 flex items-center justify-between">
      {/* Logo and Brand */}
      <div className="flex items-center gap-2">
        <div className="text-white">
          <svg
            className="w-4 h-4"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* <path
              d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"
              fill="currentColor"
            /> */}
          </svg>
        </div>
        <span className="text-white font-bold text-lg">Deep Defenders</span>
      </div>

      {/* Navigation Links and Sign In Button */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-8">
          <a href="#" className="text-white text-sm hover:text-gray-300">
            Home
          </a>
          <a href="#" className="text-white text-sm hover:text-gray-300">
            How it works
          </a>
          <a href="#" className="text-white text-sm hover:text-gray-300">
            Features
          </a>
          <a href="#" className="text-white text-sm hover:text-gray-300">
            Contact us
          </a>
        </div>
        <button className="bg-[#1466b8] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#1255a0] transition-colors">
          Sign in
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
