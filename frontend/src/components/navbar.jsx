import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider, signInWithPopup } from "../firebase";

const Navbar = ({ user, setUser }) => {
  const [authDropdownOpen, setAuthDropdownOpen] = useState(false);
  const [deepfakeDropdownOpen, setDeepfakeDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const signUpWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
        console.log("User signed up:", result.user);
        alert("Sign-up successful! Welcome to Deep Defenders.");
        setAuthDropdownOpen(false);
      })
      .catch((error) => {
        console.error("Error during sign-up:", error.message);
        alert("Sign-up failed! Please try again.");
      });
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
        console.log("User signed in:", result.user);
        alert("Sign-in successful! Welcome back.");
        setAuthDropdownOpen(false);
      })
      .catch((error) => {
        console.error("Error during sign-in:", error.message);
        alert("Sign-in failed! Please try again.");
      });
  };

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        setUser(null);
        setDeepfakeDropdownOpen(false);
        alert("You have successfully signed out.");
        setAuthDropdownOpen(false);
      })
      .catch((error) => {
        console.error("Error signing out:", error.message);
      });
  };

  const handleDeepfakeClick = () => {
    if (!user) {
      alert("Please sign in or sign up to access Deepfake Detection!");
      setAuthDropdownOpen(true);
      return;
    }
    setDeepfakeDropdownOpen(!deepfakeDropdownOpen);
  };

  // Close dropdowns when clicking outside
  const handleClickOutside = () => {
    setDeepfakeDropdownOpen(false);
    setAuthDropdownOpen(false);
  };

  return (
    <nav className="bg-[#111a22] px-4 py-3 flex items-center justify-between relative">
      {/* Overlay to capture clicks outside dropdowns */}
      {(deepfakeDropdownOpen || authDropdownOpen) && (
        <div className="fixed inset-0 z-10" onClick={handleClickOutside}></div>
      )}

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

        {/* Deepfake Detection Button and Dropdown */}
        <div className="relative">
          <button
            onClick={handleDeepfakeClick}
            className="text-white text-sm hover:text-gray-300 cursor-pointer focus:outline-none"
          >
            Deepfake Detection
          </button>

          {/* Deepfake Detection Dropdown - Only visible when logged in */}
          {deepfakeDropdownOpen && user && (
            <div className="absolute left-0 mt-2 w-48 bg-[#222a35] text-white flex flex-col gap-2 rounded-lg shadow-md z-20">
              <button
                onClick={() => {
                  navigate("/image-detection");
                  setDeepfakeDropdownOpen(false);
                }}
                className="px-4 py-2 hover:text-gray-300 text-left"
              >
                Image Detection
              </button>
              <button
                onClick={() => {
                  navigate("/video-detection");
                  setDeepfakeDropdownOpen(false);
                }}
                className="px-4 py-2 hover:text-gray-300 text-left"
              >
                Video Detection
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
                  navigate("/live-detection");
                  setDeepfakeDropdownOpen(false);
                }}
                className="px-4 py-2 hover:text-gray-300 text-left"
              >
                Live Detection
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

        {/* Auth Dropdown */}
        <div className="relative">
          <button
            onClick={() => setAuthDropdownOpen(!authDropdownOpen)}
            className="bg-[#1466b8] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#1255a0] transition-colors relative overflow-hidden"
          >
            <span className="relative">
              {user ? "Welcome" : "Let's Go"}
              <span className="absolute top-0 -right-6 animate-bounce">🚀</span>
            </span>
          </button>
          {authDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[#222a35] text-white flex flex-col gap-2 rounded-lg shadow-md z-20">
              {!user ? (
                <>
                  <button
                    onClick={signUpWithGoogle}
                    className="px-4 py-2 text-left hover:text-gray-300"
                  >
                    Sign Up with Google
                  </button>
                  <button
                    onClick={signInWithGoogle}
                    className="px-4 py-2 text-left hover:text-gray-300"
                  >
                    Sign In with Google
                  </button>
                </>
              ) : (
                <button
                  onClick={signOut}
                  className="px-4 py-2 text-left hover:text-gray-300"
                >
                  Sign Out
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
