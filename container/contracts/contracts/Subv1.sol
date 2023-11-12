// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SubscriptionService {
    address public owner;
    uint256 public subscriptionPrice; // Price in ether
    uint256 public subscriptionDuration; // Duration in seconds
    uint256 public lastSubscriptionTime;

    mapping(address => uint256) public subscriptionExpiry;
    mapping(address => bool) public isSubscribed; // To track unique subscribers
    address[] public allSubscribers;
    address[] public activeSubscribers;

    event SubscriptionPurchased(address indexed user, uint256 expiryTime);

    constructor(uint256 _priceInEther, uint256 _duration) {
        owner = msg.sender;
        subscriptionPrice = _priceInEther * 1 ether; // Convert to wei
        subscriptionDuration = _duration;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    function setSubscriptionPrice(uint256 _priceInEther) public onlyOwner {
        subscriptionPrice = _priceInEther * 1 ether; // Convert to wei
    }

    function purchaseSubscription() public payable {
        require(msg.value == subscriptionPrice, string(abi.encodePacked("Incorrect payment amount. Payment should be ", subscriptionPrice, " wei")));
        uint256 newExpiry = block.timestamp + subscriptionDuration;

        if (!isSubscribed[msg.sender]) {
            isSubscribed[msg.sender] = true;
            allSubscribers.push(msg.sender); // Add the subscriber's address to the list of all subscribers
            activeSubscribers.push(msg.sender); // Add the subscriber to the list of active subscribers
        } else if (block.timestamp > subscriptionExpiry[msg.sender]) {
            // Renewing the subscription, so update the expiry
            subscriptionExpiry[msg.sender] = newExpiry;
        }

        lastSubscriptionTime = block.timestamp;
        emit SubscriptionPurchased(msg.sender, newExpiry);
    }

    function isSubscriber(address user) public view returns (bool) {
        return block.timestamp <= subscriptionExpiry[user];
    }

    function getSubscriptionExpiry(address user) public view returns (uint256) {
        return subscriptionExpiry[user];
    }

    function getAllSubscribers() public view returns (address[] memory) {
        return allSubscribers;
    }

    function getActiveSubscribers() public view returns (address[] memory) {
        return activeSubscribers;
    }

    function getInactiveSubscribers() public view returns (address[] memory) {
        address[] memory result = new address[](allSubscribers.length - activeSubscribers.length);
        uint256 resultIndex = 0;

        for (uint256 i = 0; i < allSubscribers.length; i++) {
            if (!isSubscriber(allSubscribers[i])) {
                result[resultIndex] = allSubscribers[i];
                resultIndex++;
            }
        }

        return result;
    }

    function getTotalSubscribers() public view returns (uint256) {
        return allSubscribers.length;
    }

    function getTotalActiveSubscribers() public view returns (uint256) {
        return activeSubscribers.length;
    }

    function getTotalInactiveSubscribers() public view returns (uint256) {
        return allSubscribers.length - activeSubscribers.length;
    }

    function withdrawFunds() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    function expireSubscriptions() public {
        for (uint256 i = 0; i < activeSubscribers.length; i++) {
            if (block.timestamp > subscriptionExpiry[activeSubscribers[i]]) {
                isSubscribed[activeSubscribers[i]] = false;
                subscriptionExpiry[activeSubscribers[i]] = 0;
            }
        }
    }
}
