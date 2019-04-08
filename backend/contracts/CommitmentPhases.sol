pragma solidity ^0.5.0;

contract CommitmentPhases {
    uint256 public deadline;
    bool public finalized;

    event Finalized(bool success);

    modifier notFinalized() {
        require(!finalized, "Cannot call while finalized");
        _;
    }

    modifier beforeDeadline() {
        require(now < deadline, "Cannot call after deadline");
        _;
    }

    modifier finalizedOrAfterDeadline() {
        require(finalized || now > deadline, "Must be be finalized or after deadline");
        _;
    }

    function _finalize() internal {
        finalized = true;
        emit Finalized(true);
    }

    constructor(uint256 _deadline) public {
        require(_deadline > now);
        deadline = _deadline;
        finalized = false;
    }
}
