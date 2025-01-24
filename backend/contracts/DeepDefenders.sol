pragma solidity ^0.8.28;

contract DeepDefenders {
    struct DetectionResult {
        string mediaHash;
        bool isDeepfake;
        string details;
    }

    mapping(string => DetectionResult) public results;

    event DetectionRecorded(string mediaHash, bool isDeepfake, string details);

    function recordDetection(string memory mediaHash, bool isDeepfake, string memory details) public {
        results[mediaHash] = DetectionResult(mediaHash, isDeepfake, details);
        emit DetectionRecorded(mediaHash, isDeepfake, details);
    }

    function getDetection(string memory mediaHash) public view returns (DetectionResult memory) {
        require(bytes(results[mediaHash].mediaHash).length != 0, "Result not found");
        return results[mediaHash];
    }
}
