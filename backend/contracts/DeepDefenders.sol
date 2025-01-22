// Solidity Contract Example
pragma solidity ^0.8.0;

contract Detection {
    struct DetectionResult {
        bool isDeepfake;
        string details;
        uint256 timestamp;
    }

    mapping(string => DetectionResult) public detectionResults;
    mapping(string => string) public transactionToMedia;

    event DetectionRecorded(string mediaHash, bool isDeepfake, string details, uint256 timestamp, string transactionId);

    function recordDetection(string memory mediaHash, bool isDeepfake, string memory details) public {
        require(bytes(mediaHash).length > 0, "Media hash cannot be empty");
        require(bytes(details).length > 0, "Details cannot be empty");

        detectionResults[mediaHash] = DetectionResult(isDeepfake, details, block.timestamp);
        transactionToMedia[msg.sender] = mediaHash;

        emit DetectionRecorded(mediaHash, isDeepfake, details, block.timestamp, msg.sender);
    }

    function getDetection(string memory mediaHash) public view returns (bool, string memory, uint256) {
        DetectionResult memory result = detectionResults[mediaHash];
        require(bytes(result.details).length > 0, "No detection result found");
        return (result.isDeepfake, result.details, result.timestamp);
    }

    function getDetectionByTransaction(string memory txId) public view returns (bool, string memory, uint256) {
        string memory mediaHash = transactionToMedia[txId];
        return getDetection(mediaHash);
    }
}
