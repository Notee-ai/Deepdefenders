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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "@fontsource/space-grotesk";
import "@fontsource/noto-sans";

const theme = createTheme({
  typography: {
    fontFamily: "'Space Grotesk', 'Noto Sans', sans-serif",
  },
  palette: {
    text: {
      primary: "#FFFFFF",
    },
    background: {
      default: "#000000",
    },
    primary: {
      main: "#1976D2",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label": {
            color: "white",
          },
          "& label.Mui-focused": {
            color: "#FFFFFF",
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "#FFFFFF",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#FFFFFF",
            },
            "&:hover fieldset": {
              borderColor: "#FFFFFF",
            },
            "&.Mui-focused fieldset": {
              borderColor: "white",
            },
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: "white",
        },
        disabled: {
          color: "white !important",
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
  },
});

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
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="200px"
          >
            <CircularProgress color="primary" />
            <Typography ml={2} color="white">
              Connecting to blockchain...
            </Typography>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ height: "850px" }}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mt: 4,
            borderRadius: 2,
            backgroundColor: "transparent",
            height: "100%",
            color: "white",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: 700,
              textAlign: "center",
              mb: 3,
              color: "white",
            }}
          >
            Deepfake Detection Submission
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2, color: "white" }}>
              {error}
            </Alert>
          )}
          {!walletAddress && (
            <Alert severity="warning" sx={{ mb: 2, color: "white" }}>
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
                  helperText={
                    <Typography variant="body2" sx={{ color: "white" }}>
                      Connected wallet address
                    </Typography>
                  }
                  variant="outlined"
                  sx={{
                    "& label": {
                      color: "white", // Label in white
                    },
                    "& .Mui-disabled": {
                      color: "white !important", // Disabled text in white
                    },
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "white !important", // Text inside input in white
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "white",
                      },
                      "&:hover fieldset": {
                        borderColor: "white",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "white",
                      },
                    },
                  }}
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
                  sx={{ color: "white" }}
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
                    !isInitialized ||
                    !walletAddress ||
                    status === "Submitting..."
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
              elevation={0}
              sx={{
                mt: 3,
                p: 3,
                backgroundColor: "transparent",
                borderRadius: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "white",
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
                <Typography
                  variant="body1"
                  sx={{
                    color: "white",
                  }}
                >
                  Transaction Hash:
                  <Link
                    href={`https://etherscan.io/tx/${transactionHash}`}
                    target="_blank"
                    rel="noopener"
                    sx={{ ml: 1, color: "white" }}
                  >
                    {transactionHash}
                  </Link>
                </Typography>
              </Box>
            </Paper>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default DetectionForm;
