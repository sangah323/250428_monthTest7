pragma solidity ^0.8.0;

contract Counter{
    uint256 public count;

    constructor() {
        count = 0;
    }

    function increment() public{
        count += 1;
    }

    function decrement() public{
        count -= 1;
    }

    function reset() public{
        count = 0;
    }

    function getCount() public view returns (uint256) {
        return count;
    }
}
