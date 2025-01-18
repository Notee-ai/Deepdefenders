// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Hero from "./components/Hero";
import Footer from "./components/footer";
import HowItWorks from "./pages/howitworks";
import ContactUs from "./pages/contactus";
import Features from "./pages/features";
import DeepfakeDetection from "./pages/DeepfakeDetection";
import Confetti from "react-confetti";

import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./components/accordion";

function App() {
  const [user, setUser] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const lastLoginTime = localStorage.getItem("lastLoginTime");
        const currentTime = Date.now();

        if (!lastLoginTime || currentTime - parseInt(lastLoginTime) > 300000) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 5000);
          localStorage.setItem("lastLoginTime", currentTime.toString());
        }
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#111a22] font-sans">
        {showConfetti && window.location.pathname === "/" && <Confetti />}
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <div className="px-8 py-6 flex justify-center items-center">
                  <div className="w-[917.6px] h-[230.4px] shadow-lg rounded-lg">
                    <Accordion type="single" collapsible>
                      <AccordionItem value="item-1">
                        <AccordionTrigger className="text-white">
                          What is Deep Defenders?
                        </AccordionTrigger>
                        <AccordionContent className="text-white">
                          Deep Defenders is an advanced system designed to
                          detect and mitigate threats posed by deepfake media.
                        </AccordionContent>
                      </AccordionItem>
                      {/* Add more accordion items as needed */}
                    </Accordion>
                  </div>
                </div>
              </>
            }
          />
          <Route path="/howitworks" element={<HowItWorks />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/features" element={<Features />} />

          <Route
            path="/image-detection"
            element={user ? <DeepfakeDetection type="image" /> : <Hero />}
          />
          <Route
            path="/video-detection"
            element={user ? <DeepfakeDetection type="video" /> : <Hero />}
          />
          <Route
            path="/audio-detection"
            element={user ? <DeepfakeDetection type="audio" /> : <Hero />}
          />
          <Route
            path="/live-detection"
            element={user ? <DeepfakeDetection type="live" /> : <Hero />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
