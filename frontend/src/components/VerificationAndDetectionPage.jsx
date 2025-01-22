import React from "react";
import DetectionForm from "../components/DetectionForm";
import BlockchainVerification from "../components/BlockchainVerification";

const VerificationAndDetectionPage = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 p-6 bg-gray-100 min-h-screen">
      {/* Left Column */}
      <div className="flex-1 p-6 shadow-lg rounded-lg bg-white">
        <h2 className="text-2xl font-bold text-center mb-4">
          Submit Detection Result
        </h2>
        <DetectionForm />
      </div>

      {/* Right Column */}
      <div className="flex-1 p-6 shadow-lg rounded-lg bg-white">
        <h2 className="text-2xl font-bold text-center mb-4">
          Verify Detection Result
        </h2>
        <BlockchainVerification />
      </div>
    </div>
  );
};

export default VerificationAndDetectionPage;
