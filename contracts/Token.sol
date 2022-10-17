// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import 'hardhat/console.sol';

contract Token {
    string public name = "test token";
    string public symbol = "tkn";
    uint public totalSupply = 1000000000;
    address public owner;
    mapping(address => uint) balances;

    constructor () {
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    function transfer(address to, uint amount) external {
        console.log('Sender balance is %s tokens', balances[msg.sender]);
        require(balances[msg.sender] > amount, 'Not enough tokens');
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function balanceOf(address account) external view returns(uint) {
        return balances[account];
    }
}
