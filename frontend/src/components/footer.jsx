import React from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa"; // Import social icons

const Footer = () => {
  return (
    <footer className="bg-[#111a22] text-white py-6">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Social Media Links */}
        <div className="flex gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#1466b8] transition duration-300"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#1466b8] transition duration-300"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#1466b8] transition duration-300"
          >
            <FaLinkedin size={24} />
          </a>
        </div>

        {/* Copyright Information */}
        <p className="text-sm text-right">
          &copy; {new Date().getFullYear()} Deep Defenders. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
