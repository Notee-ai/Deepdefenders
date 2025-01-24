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
  Link,
  Paper,
  Container,
  Grid,
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
  const [transactionHash, setTransactionHash] = useState("");
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
    setTransactionHash("");

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

      setStatus("Submission successful!");
      setTransactionHash(txHash);
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
      <Container maxWidth="sm">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
          <Typography ml={2}>Connecting to blockchain...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 2 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: "#1A2B3C",
            textAlign: "center",
            mb: 3,
          }}
        >
          Deepfake Detection Submission
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Wallet Address"
                value={walletAddress}
                disabled
                margin="normal"
                helperText="Connected wallet address"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Media Hash"
                value={mediaHash}
                onChange={(e) => setMediaHash(e.target.value)}
                margin="normal"
                helperText="Unique identifier for the analyzed media"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isDeepfake}
                    onChange={(e) => setIsDeepfake(e.target.checked)}
                    color="primary"
                  />
                }
                label="Is Deepfake"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Detection Details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                margin="normal"
                multiline
                rows={4}
                helperText="Provide comprehensive analysis of the media"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={
                  !isInitialized || !walletAddress || status === "Submitting..."
                }
                sx={{
                  mt: 2,
                  py: 1.5,
                  fontWeight: 700,
                  textTransform: "none",
                }}
              >
                {status === "Submitting..." ? (
                  <>
                    <CircularProgress size={24} sx={{ mr: 1 }} />
                    Submitting...
                  </>
                ) : (
                  "Submit Detection Result"
                )}
              </Button>
            </Grid>
          </Grid>
        </form>

        {transactionHash && (
          <Paper
            elevation={2}
            sx={{
              mt: 3,
              p: 3,
              backgroundColor: "#f4f6f8",
              borderRadius: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "success.main",
                mb: 2,
                fontWeight: 700,
              }}
            >
              Submission Successful
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Typography variant="body2">
                Your deepfake detection result has been securely recorded on the
                blockchain.
              </Typography>

              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  backgroundColor: "white",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
                  Transaction Hash: {transactionHash.substring(0, 10)}...
                  {transactionHash.substring(transactionHash.length - 10)}
                </Typography>

                <Link
                  href={`https://sepolia.basescan.org/tx/${transactionHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    textDecoration: "none",
                    backgroundColor: "primary.main",
                    color: "white",
                    px: 2,
                    py: 1,
                    borderRadius: 1,
                    "&:hover": {
                      backgroundColor: "primary.dark",
                    },
                  }}
                >
                  View Transaction Details
                </Link>
              </Paper>

              <Typography variant="body2" color="text.secondary">
                👉 Click the "View Transaction Details" button to: • Verify
                transaction timestamp • Check blockchain confirmation • Review
                complete transaction history • Ensure data integrity and
                transparency
              </Typography>
            </Box>
          </Paper>
        )}
      </Paper>
    </Container>
  );
};

export default DetectionForm;
