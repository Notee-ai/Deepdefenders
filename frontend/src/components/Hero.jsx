import React from "react";
import ImageGrid from "./photogrid";

const Hero = () => {
  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <h1 className="text-white tracking-light text-[32px] font-bold leading-tight px-4 text-left pb-3 pt-6">
          Detect deepfakes with confidence
        </h1>
        <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
          Deep Defenders is the only system that combines AI-powered detection
          with expert human review to provide the most accurate deepfake
          detection on the market. Get results in minutes, not days.
          
        </p>
        <div className="flex px-4 py-3 justify-start">
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#1466b8] text-white text-sm font-bold leading-normal tracking-[0.015em]">
            <span className="truncate">Start</span>
          </button>
        </div>
        <ImageGrid />
      </div>
    </div>
  );
};


export default Hero;
