import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase"; // Import Firebase auth and provider
import { signInWithPopup, signOut } from "firebase/auth";

const Navbar = ({ user, setUser }) => {
  const [deepfakeDropdownOpen, setDeepfakeDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Function to handle sign-in with Google
  const signInWithGoogle = async () => {
    try {
      // Force Google account selection
      provider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
      alert("Sign-in successful! Welcome back.");
    } catch (error) {
      console.error("Error during sign-in:", error.message);
      alert("Sign-in failed! Please try again.");
    }
  };

  // Function to handle sign-out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      alert("You have successfully signed out.");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  const handleDeepfakeClick = () => {
    if (!user) {
      // Show login prompt if user isn't logged in
      alert("Please sign in to access Deepfake Detection.");
      return;
    }
    setDeepfakeDropdownOpen(!deepfakeDropdownOpen);
  };

  return (
    <nav className="bg-[#111a22] px-4 py-3 flex items-center justify-between relative">
      {/* Logo and Brand */}
      <div className="flex items-center gap-2">
        <div className="text-white">
          <svg
            className="w-4 h-4"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <span className="text-white font-bold text-lg">Deep Defenders</span>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-8">
        <a href="/" className="text-white text-sm hover:text-gray-300">
          Home
        </a>
        <a
          href="/howitworks"
          className="text-white text-sm hover:text-gray-300"
        >
          How it works
        </a>

        {/* Deepfake Detection Button with Dropdown */}
        <div className="relative">
          <button
            onClick={handleDeepfakeClick}
            className={`text-white text-sm hover:text-gray-300 cursor-pointer focus:outline-none ${
              !user ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!user} // Disable button if user is not logged in
          >
            Deepfake Detection
          </button>

          {deepfakeDropdownOpen && user && (
            <div className="absolute left-0 mt-2 w-48 bg-[#222a35] text-white flex flex-col gap-2 rounded-lg shadow-md z-20">
              <button
                onClick={() => {
                  navigate("/live-detection");
                  setDeepfakeDropdownOpen(false);
                }}
                className="px-4 py-2 hover:text-gray-300 text-left"
              >
                Live Detection
              </button>
              <button
                onClick={() => {
                  navigate("/audio-detection");
                  setDeepfakeDropdownOpen(false);
                }}
                className="px-4 py-2 hover:text-gray-300 text-left"
              >
                Audio Detection
              </button>
              <button
                onClick={() => {
                  navigate("/image-detection");
                  setDeepfakeDropdownOpen(false);
                }}
                className="px-4 py-2 hover:text-gray-300 text-left"
              >
                Image Detection
              </button>
            </div>
          )}
        </div>

        <a href="/features" className="text-white text-sm hover:text-gray-300">
          Features
        </a>
        <a href="/contactus" className="text-white text-sm hover:text-gray-300">
          Contact us
        </a>

        {/* Sign In / Sign Out Buttons */}
        <div className="flex items-center gap-4">
          {!user ? (
            <button
              onClick={signInWithGoogle}
              className="flex items-center gap-2 px-4 py-2 bg-[#1466b8] text-white font-bold rounded-xl hover:bg-[#1255a0] transition"
            >
              <img
                src="https://img.icons8.com/clouds/50/google-logo.png"
                alt="google-logo"
                className="w-10 h-10"
              />
              Sign In
            </button>
          ) : (
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-[#1466b8] text-white font-bold rounded-xl hover:bg-[#1255a0] transition"
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
