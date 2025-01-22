  import Web3 from "web3";
import abi from "./contractABI.json";

class BlockchainService {
  constructor(contractAddress, rpcUrl) {
    this.CONTRACT_ADDRESS =
      contractAddress ||
      process.env.REACT_APP_CONTRACT_ADDRESS ||
      "0x5fbdb2315678afecb367f032d93f642f64180aa3";
    this.RPC_URL =
      rpcUrl ||
      process.env.REACT_APP_RPC_URL ||
      "https://sepolia.base.org";
    this.web3 = null;
    this.contract = null;
    this.networkId = 84532; // Base Sepolia Chain ID
  }

  async initialize() {
    try {
      if (this.web3) return { web3: this.web3, contract: this.contract };

      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (!accounts?.length) throw new Error("No accounts found. Please unlock MetaMask.");

        const networkId = await window.ethereum.request({
          method: "net_version",
        });
        
        if (networkId !== this.networkId.toString()) {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x14A34' }], // 84532 in hex
          });
        }
        
        this.networkId = networkId;
        this.web3 = new Web3(window.ethereum);

        window.ethereum.on("chainChanged", () => window.location.reload());

        console.log("Web3 initialized with MetaMask on Base Sepolia:", networkId);
      } else if (this.RPC_URL) {
        this.web3 = new Web3(new Web3.providers.HttpProvider(this.RPC_URL));
        this.networkId = await this.web3.eth.net.getId();
      } else {
        throw new Error("No Web3 provider detected");
      }

      if (!this.CONTRACT_ADDRESS) throw new Error("Contract address is not defined");
      if (!this.web3.utils.isAddress(this.CONTRACT_ADDRESS)) throw new Error("Invalid contract address format");
      if (!Array.isArray(abi)) throw new Error("Invalid ABI format");

      this.contract = new this.web3.eth.Contract(abi, this.CONTRACT_ADDRESS);

      try {
        await this.contract.methods.getDetection("test").call();
      } catch (error) {
        if (error.message.includes("not a contract address")) {
          throw new Error("Contract not found at specified address");
        }
      }

      return { web3: this.web3, contract: this.contract };
    } catch (error) {
      this.web3 = null;
      this.contract = null;
      console.error("Blockchain initialization error:", error);
      throw this.handleError(error);
    }
  }

  handleError(error) {
    // More specific error handling
    if (error.message.includes("Internal JSON-RPC error")) {
      return new Error(
        "Network error: Please check your connection and ensure you're on the correct network"
      );
    }
    if (error.message.includes("BigInt")) {
      return new Error("Transaction error: Gas calculation failed");
    }
    if (error.message.includes("User denied")) {
      return new Error("Transaction rejected by user");
    }
    if (error.message.includes("insufficient funds")) {
      return new Error("Insufficient funds for transaction");
    }
    if (error.message.includes("nonce too low")) {
      return new Error("Transaction error: Please reset your MetaMask account");
    }
    return error;
  }

  async validateConnection() {
    if (!this.contract || !this.web3) {
      await this.initialize();
    }

    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (!accounts || accounts.length === 0) {
        throw new Error("Please connect your MetaMask wallet");
      }

      // Verify network
      const networkId = await window.ethereum.request({
        method: "net_version",
      });
      if (networkId !== this.networkId) {
        throw new Error(`Please switch to network ID ${this.networkId}`);
      }
    }
  }

  async storeDetectionResult(mediaHash, isDeepfake, details) {
    try {
      await this.validateConnection();

      if (!mediaHash?.trim()) {
        throw new Error("Media hash cannot be empty");
      }
      if (typeof isDeepfake !== "boolean") {
        throw new Error("IsDeepfake must be a boolean value");
      }
      if (!details?.trim()) {
        throw new Error("Details cannot be empty");
      }

      const accounts = await this.web3.eth.getAccounts();
      if (!accounts || accounts.length === 0) {
        throw new Error("No Ethereum account available");
      }

      const sender = accounts[0];

      // Get current gas price
      const gasPrice = await this.web3.eth.getGasPrice();

      // Create the transaction object
      const tx = this.contract.methods.recordDetection(
        mediaHash.trim(),
        isDeepfake,
        details.trim()
      );

      // Estimate gas with higher buffer
      const gasEstimate = await tx.estimateGas({ from: sender });
      const gasLimit = Math.floor(Number(gasEstimate) * 1.2); // 20% buffer

      // Send the transaction with explicit gas parameters
      const result = await tx.send({
        from: sender,
        gas: gasLimit,
        gasPrice: gasPrice,
      });

      console.log("Transaction successful:", result);
      return result.transactionHash;
    } catch (error) {
      console.error("Error storing detection result:", error);
      throw this.handleError(error);
    }
  }

  async verifyResult(mediaHash) {
    try {
      await this.validateConnection();

      if (!mediaHash?.trim()) {
        throw new Error("Media hash cannot be empty");
      }

      return await this.contract.methods.getDetection(mediaHash.trim()).call();
    } catch (error) {
      console.error("Error verifying result:", error);
      throw this.handleError(error);
    }
  }
}



const blockchainService = new BlockchainService();
export default blockchainService;

export const initializeBlockchain = () => blockchainService.initialize();
export const storeDetectionResult = (mediaHash, isDeepfake, details) =>
  blockchainService.storeDetectionResult(mediaHash, isDeepfake, details);
export const verifyResult = (mediaHash) =>
  blockchainService.verifyResult(mediaHash);
