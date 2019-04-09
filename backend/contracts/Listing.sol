pragma solidity ^0.5.0;

import "./SocialCommitment.sol";

contract Listing {

    address[] public commitmentContracts;

    event SocialCommitmentCreated(
        address contractAddress,
        address challenger,
        address successBeneficiary,
        address failureBeneficiary,
        address referee,
        string title,
        string description,
        uint256 deadline
    );

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
        emit SocialCommitmentCreated(
            addr,
            msg.sender,
            _successBeneficiary,
            _failureBeneficiary,
            _referee,
            _title,
            _description,
            _deadline
        );
    }

    function numberOfCommitments() public view returns (uint256) {
        return commitmentContracts.length;
    }
}