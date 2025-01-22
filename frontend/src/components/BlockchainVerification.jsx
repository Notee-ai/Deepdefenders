import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { initializeBlockchain, verifyResult } from "../utils/blockchain";

const BlockchainVerification = () => {
  const [mediaHash, setMediaHash] = useState("");
  const [result, setResult] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    const initBlockchain = async () => {
      try {
        await initializeBlockchain();
        setIsInitialized(true);
      } catch (err) {
        setError(err.message || "Blockchain initialization failed");
        console.error("Initialization error:", err);
      } finally {
        setIsInitializing(false);
      }
    };

    initBlockchain();
  }, []);

  const handleVerify = async () => {
    if (!mediaHash.trim()) {
      setError("Media hash required");
      return;
    }

    setIsVerifying(true);
    setError("");
    setResult(null);

    try {
      const data = await verifyResult(mediaHash);
      setResult(data);
    } catch (error) {
      setError(error.message || "Verification failed");
      console.error("Verification error:", error);
    } finally {
      setIsVerifying(false);
    }
  };

  if (isInitializing) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" p={3}>
        <CircularProgress />
        <Typography ml={2}>Connecting to blockchain...</Typography>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Verify Detection Result
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        fullWidth
        label="Media Hash"
        value={mediaHash}
        onChange={(e) => setMediaHash(e.target.value)}
        margin="normal"
        error={!!error && error.includes("hash")}
        helperText="Enter the media hash to verify"
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleVerify}
        disabled={!isInitialized || isVerifying || !mediaHash.trim()}
        sx={{ mt: 2 }}
      >
        {isVerifying ? (
          <>
            <CircularProgress size={24} sx={{ mr: 1 }} />
            Verifying...
          </>
        ) : (
          "Verify"
        )}
      </Button>

      {result && (
        <Box mt={3} p={2} bgcolor="background.paper" borderRadius={1}>
          <Typography variant="h6" gutterBottom>
            Verification Result
          </Typography>
          <Typography>Media Hash: {result.mediaHash}</Typography>
          <Typography>
            Is Deepfake: {result.isDeepfake ? "Yes" : "No"}
          </Typography>
          <Typography>Details: {result.details}</Typography>
          <Typography>
            Timestamp: {new Date(result.timestamp * 1000).toLocaleString()}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default BlockchainVerification;
