import React from "react";

const Features = () => {
  return (
    <div
      className="bg-[#111a22] text-white font-sans"
      style={{ width: "917.6px", margin: "0 auto" }}
    >
      {/* Header Section */}
      <div className="relative flex flex-col items-center py-10 px-4">
        <h1 className="text-4xl font-bold text-center mb-4">
          Real-time deepfake detection
        </h1>
        <p className="text-lg text-center mb-6 max-w-2xl">
          Powered by the latest AI technology, our platform provides real-time
          analysis of video content to ensure its authenticity. Safeguard your
          reputation with malicious deepfake detection and ensure that you can
          trust the content you consume.
        </p>
        <div className="flex items-center gap-4 w-full max-w-md">
          <input
            type="text"
            placeholder="Enter a YouTube video URL"
            className="flex-1 px-4 py-3 rounded-lg bg-[#243647] text-white placeholder:text-gray-400 focus:outline-none focus:ring focus:ring-blue-500"
          />
          <button className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600">
            Check now
          </button>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="py-10 px-4">
        <h2 className="text-3xl font-bold text-center mb-6">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {/* Feature Cards */}
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="bg-[#243647] rounded-lg p-6 flex flex-col gap-3 text-center"
            >
              <h3 className="text-xl font-semibold">
                Feature Title {index + 1}
              </h3>
              <p className="text-sm text-gray-400">
                Brief description of the feature goes here. Make it short and
                impactful to grab attention.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="py-10 px-4 bg-[#1b2734]">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          {/* Placeholder Icons */}
          <div className="w-20 h-20 bg-gray-500 rounded-full"></div>
          <div className="w-20 h-20 bg-gray-500 rounded-full"></div>
          <div className="w-20 h-20 bg-gray-500 rounded-full"></div>
        </div>
        <div className="text-center mt-6">
          <h3 className="text-2xl font-bold mb-4">
            Ready to protect your business?
          </h3>
          <p className="text-gray-400 mb-6">
            Join leading companies who trust Deep Detection to protect their
            brand and reputation.
          </p>
          <button className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600">
            Get started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Features;
