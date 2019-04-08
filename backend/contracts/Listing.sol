pragma solidity ^0.5.0;

import "./SocialCommitment.sol";

contract Listing {
    event SocialCommitmentCreated(address contractAddress);

    function deploy(
        address payable _successBeneficiary,
        address payable _failureBeneficiary,
        address _referee,
        string memory _title,
        string memory _description,
        uint256 _deadline
    ) external {
        address addr = new SocialCommitment(
            msg.sender, // challenger
            _successBeneficiary,
            _failureBeneficiary,
            _referee,
            _title,
            _description,
            _deadline
        );
        emit SocialCommitmentCreated(addr);
    }
}