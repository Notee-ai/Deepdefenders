import contract from "../../../backend/utils/contract";
import web3 from "../../../backend/utils/web3";

export const recordDetection = async (mediaHash, isDeepfake, details) => {
  const accounts = await web3.eth.getAccounts(); // Get user's wallet
  await contract.methods
    .recordDetection(mediaHash, isDeepfake, details)
    .send({ from: accounts[0] });
};
export const getDetection = async (mediaHash) => {
  const result = await contract.methods.getDetection(mediaHash).call();
  return result;
};
