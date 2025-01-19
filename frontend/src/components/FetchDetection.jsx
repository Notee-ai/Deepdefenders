import React, { useState } from "react";
import { getDetection } from "./blockchainFunctions";

function FetchForm() {
  const [mediaHash, setMediaHash] = useState("");
  const [result, setResult] = useState(null);

  const handleFetch = async () => {
    try {
      const detection = await getDetection(mediaHash);
      setResult(detection);
    } catch (error) {
      alert("Error fetching detection: " + error.message);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Media Hash"
        value={mediaHash}
        onChange={(e) => setMediaHash(e.target.value)}
        required
      />
      <button onClick={handleFetch}>Fetch Detection</button>
      {result && (
        <div>
          <p>Deepfake: {result[0] ? "Yes" : "No"}</p>
          <p>Details: {result[1]}</p>
          <p>Timestamp: {new Date(result[2] * 1000).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}

export default FetchForm;
