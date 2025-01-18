import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#111a22] text-white py-6 mt-12">
      <div className="container mx-auto text-center">
        {/* Copyright Information */}
        <p className="text-sm mb-2">
          &copy; {new Date().getFullYear()} Deep Defenders. All rights reserved.
        </p>

        {/* Contact Information */}
        <div className="text-sm">
          <p>Contact NMAM Institute of Technology:</p>
          <p>
            Email:{" "}
            <a
              href="mailto:info@nmamit.in"
              className="text-[#1466b8] hover:text-[#1255a0]"
            >
              info@nmamit.in
            </a>
          </p>
          <p>
            Phone:{" "}
            <a
              href="tel:+918280120234"
              className="text-[#1466b8] hover:text-[#1255a0]"
            >
              +91 8280 120234
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
