pragma solidity ^0.5.0;

import "./SocialCommitment.sol";

contract Listing {

    address[] public commitmentContracts;

    event SocialCommitmentCreated(address contractAddress);

    function deploy(
        address payable _successBeneficiary,
        address payable _failureBeneficiary,
        address _referee,
        string calldata _title,
        string calldata _description,
        uint256 _deadline
    ) external {
        address addr = address(new SocialCommitment(
            msg.sender, // challenger
            _successBeneficiary,
            _failureBeneficiary,
            _referee,
            _title,
            _description,
            _deadline
        ));
        commitmentContracts.push(addr);
        emit SocialCommitmentCreated(addr);
    }

    function numberOfCommitmentContracts() public view returns (uint) {
        return commitmentContracts.length;
    }
}