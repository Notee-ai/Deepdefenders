import React, { useState } from "react";
import { recordDetection } from "./blockchainFunctions";

function RecordForm() {
  const [mediaHash, setMediaHash] = useState("");
  const [isDeepfake, setIsDeepfake] = useState(false);
  const [details, setDetails] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await recordDetection(mediaHash, isDeepfake, details);
      alert("Detection recorded successfully!");
    } catch (error) {
      alert("Error recording detection: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Media Hash"
        value={mediaHash}
        onChange={(e) => setMediaHash(e.target.value)}
        required
      />
      <select onChange={(e) => setIsDeepfake(e.target.value === "true")}>
        <option value="false">Authentic</option>
        <option value="true">Deepfake</option>
      </select>
      <textarea
        placeholder="Details"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        required
      />
      <button type="submit">Record Detection</button>
    </form>
  );
}

export default RecordForm;
