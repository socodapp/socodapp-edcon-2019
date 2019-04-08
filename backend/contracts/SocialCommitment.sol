pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";


contract SocialCommitment {
    IERC20 dai = IERC20(0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359);

    using SafeMath for uint256;

    address public challenger;
    address payable public successBeneficiary;
    address payable public failureBeneficiary;
    address public referee;
    string public title;
    string public description;
    uint256 public deadline;
    mapping(address => uint256) balances;
    bool finalized = false;

    event PledgeReceived(address indexed backer, uint256 amount);
    event Finalized(bool success);

    modifier notFinalized() {
        require(!finalized, "Cannot call while finalized");
        _;
    }

    modifier beforeDeadline() {
        require(now < deadline, "Cannot call after deadline");
        _;
    }

    modifier onlyReferee() {
        require(msg.sender == referee, "Only referee can call");
        _;
    }

    /**
    * Initialise the SocialCommitment parameters
    */
    constructor (
        address _challenger,
        address payable _successBeneficiary,
        address payable _failureBeneficiary,
        address _referee,
        string memory _title,
        string memory _description,
        uint256 _deadline
    ) public {
        require(_challenger != address(0), "Challenger is not defined");
        require(_successBeneficiary != address(0), "Success beneficiary not defined");
        require(_referee != address(0), "Referee not defined");
        require(bytes(_title).length != 0, "Title not defined");
        require(_deadline > now);

        challenger = _challenger;
        successBeneficiary = _successBeneficiary;
        failureBeneficiary = _failureBeneficiary;
        referee = _referee;
        title = _title;
        description = _description;
        deadline = _deadline;
    }

    function pledge() public beforeDeadline notFinalized {
        uint256 amount = dai.allowance(msg.sender, address(this));
        require(amount > 0, "Zero pledge");
        balances[msg.sender] = balances[msg.sender].add(amount);
        require(dai.transferFrom(msg.sender, address(this), amount), "Dai transfer failed");
        emit PledgeReceived(msg.sender, amount);
    }

    function finaliseSucceed() public onlyReferee beforeDeadline notFinalized {
        dai.transfer(successBeneficiary, dai.balanceOf(address(this)));
        finalized = true;
        emit Finalized(true);
    }

    function finaliseFail() public onlyReferee beforeDeadline notFinalized {
        if (failureBeneficiary != address(0)) {
            dai.transfer(failureBeneficiary, dai.balanceOf(address(this)));
        }
        finalized = true;
        emit Finalized(false);
    }

    function withdraw() public {
        require(finalized || now > deadline, "Must be be finalized or after deadline");
        uint256 amount = balances[msg.sender];
        balances[msg.sender] = 0;
        dai.transfer(msg.sender, amount);
    }
}
