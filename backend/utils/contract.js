 import web3 from "./web3";

const contractABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "mediaHash",
        type: "string",
      },
    ],
    name: "getDetection",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "mediaHash",
        type: "string",
      },
      {
        internalType: "bool",
        name: "isDeepfake",
        type: "bool",
      },
      {
        internalType: "string",
        name: "details",
        type: "string",
      },
    ],
    name: "recordDetection",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "results",
    outputs: [
      {
        internalType: "string",
        name: "mediaHash",
        type: "string",
      },
      {
        internalType: "bool",
        name: "isDeepfake",
        type: "bool",
      },
      {
        internalType: "string",
        name: "details",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; // Replace with actual address

const contractInstance = new web3.eth.Contract(contractABI, contractAddress);
export default contractInstance;
