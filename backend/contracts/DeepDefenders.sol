// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract DeepDefenders {
    struct DetectionResult {
        string mediaHash;
        bool isDeepfake;
        string details;
        uint256 timestamp;
    }

    mapping(string => DetectionResult) public results;

    function recordDetection(string memory mediaHash, bool isDeepfake, string memory details) public {
        results[mediaHash] = DetectionResult(mediaHash, isDeepfake, details, block.timestamp);
    }

    function getDetection(string memory mediaHash) public view returns (bool, string memory, uint256) {
        DetectionResult memory result = results[mediaHash];
        return (result.isDeepfake, result.details, result.timestamp);
    }
}
