pragma solidity ^0.5.0;

import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';

contract SocialCommitment is Ownable {

    address payable public successBeneficiary;
    address payable public failureBeneficiary;
    address public referee;
    string public title;
    string public description;
    uint256 public deadline;
    mapping(address => uint256) balances;

    /**
    * Initialise the SocialCommitment parameters
    */
    constructor (
        address payable _successBeneficiary,
        address payable _failureBeneficiary,
        address _referee,
        string memory _title,
        string memory _description,
        uint256 _deadline
    ) public {
        require(_successBeneficiary != address(0), "Success beneficiary not defined");
        require(_referee != address(0), "Referee not defined");
        require(bytes(_title).length != 0, "Title not defined");
        require(_deadline > now);

        successBeneficiary = _successBeneficiary;
        failureBeneficiary = _failureBeneficiary;
        referee = _referee;
        title = _title;
        description = _description;
        deadline = _deadline;
    }
}
