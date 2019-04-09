import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

pragma solidity ^0.5.0;

// This is stupid. Truffle migrations should work with interfaces. Not sure how to do that at the moment.
contract SampleERC20 is ERC20 {}
