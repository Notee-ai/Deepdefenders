import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  initializeBlockchain,
  storeDetectionResult,
} from "../utils/blockchain";

const DetectionForm = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [mediaHash, setMediaHash] = useState("");
  const [isDeepfake, setIsDeepfake] = useState(false);
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initBlockchain = async () => {
      try {
        await initializeBlockchain();
        setIsInitialized(true);

        if (window.ethereum) {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
          }

          window.ethereum.on("accountsChanged", (accounts) => {
            setWalletAddress(accounts[0] || "");
          });
        }
      } catch (err) {
        setError("Blockchain connection initialization failed.");
        console.error("Initialization error:", err);
      } finally {
        setIsInitializing(false);
      }
    };

    initBlockchain();

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", () => {});
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");
    setError("");

    try {
      if (!isInitialized) {
        throw new Error("Blockchain connection not initialized.");
      }

      if (!walletAddress) {
        throw new Error("Wallet not connected.");
      }

      if (!mediaHash.trim() || !details.trim()) {
        throw new Error("Please complete all required fields.");
      }

      const txHash = await storeDetectionResult(
        mediaHash.trim(),
        isDeepfake,
        details.trim()
      );

      setStatus(`Submission successful! Transaction Hash: ${txHash}`);
      setMediaHash("");
      setIsDeepfake(false);
      setDetails("");
    } catch (error) {
      setError(error.message || "An error occurred during submission.");
      setStatus("");
      console.error(error);
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
        Submit Detection Result
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!walletAddress && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          Please connect your wallet to submit results.
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Wallet Address"
          value={walletAddress}
          disabled
          margin="normal"
          helperText="Connected wallet address"
        />
        <TextField
          fullWidth
          required
          label="Media Hash"
          value={mediaHash}
          onChange={(e) => setMediaHash(e.target.value)}
          margin="normal"
          helperText="Unique identifier for the analyzed media."
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isDeepfake}
              onChange={(e) => setIsDeepfake(e.target.checked)}
              color="primary"
            />
          }
          label="Is Deepfake"
          sx={{ my: 1 }}
        />
        <TextField
          fullWidth
          required
          label="Details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          margin="normal"
          multiline
          rows={4}
          helperText="Provide detailed analysis."
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={
            !isInitialized || !walletAddress || status === "Submitting..."
          }
          sx={{ mt: 2 }}
        >
          {status === "Submitting..." ? (
            <>
              <CircularProgress size={24} sx={{ mr: 1 }} />
              Submitting...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </form>

      {status && (
        <Box mt={2} p={2} bgcolor="background.paper" borderRadius={1}>
          <Typography variant="body1" color="success.main">
            {status}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default DetectionForm;
