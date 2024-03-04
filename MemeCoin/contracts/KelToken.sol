// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract KelToken is ERC20, Ownable {

    mapping(address => uint256) private _userStakeAmounts;
    mapping(address => uint256) private _lastStakeTime;
    uint256 private _rewardRate = 3;
    uint256 private lockInPeriod = 60; 

    constructor(address initialOwner) 
        ERC20("KelToken", "KTK") 
        Ownable(initialOwner)
    {}

    function mintKelToken(address to, uint256 amount) public {
        uint256 changedAmount = amount * 1e18;
        _mint(to, changedAmount);
    }

    function stakeKelTokens(uint256 amount) public {
        uint256 changedAmount = amount * 1e18;

        require(changedAmount > 0, "Staking amount must be greater than 0");
        require(balanceOf(msg.sender) >= changedAmount, "Not enough tokens for staking");

        _userStakeAmounts[msg.sender] += changedAmount;
        _lastStakeTime[msg.sender] = block.timestamp;
        _transfer(msg.sender, address(this), changedAmount);
  }

    function getStakedAmount(address account) public view returns (uint256) {
        uint256 stakedInWei = _userStakeAmounts[account];
        uint256 stakedInEth = stakedInWei / 1e18;
        return stakedInEth;
  }

    function withdraw() public {
        require(block.timestamp > (_lastStakeTime[msg.sender] + lockInPeriod), "Unable to withdraw funds; currently within the extended lock-in period.");
        require(_userStakeAmounts[msg.sender] > 0, "There are no tokens currently held in a staked position.");

        uint256 stakedAmount = _userStakeAmounts[msg.sender];
        uint256 reward = ((block.timestamp - _lastStakeTime[msg.sender]) * _rewardRate) * 1e18;

        _userStakeAmounts[msg.sender] = 0;
        _transfer(address(this), msg.sender, stakedAmount);
        _mint(msg.sender, reward);
  }

    function getWithdrawableAmount(address account) public view returns (uint256) {
        uint256 stakedAmount = _userStakeAmounts[msg.sender] / 1e18;
        uint256 reward = ((block.timestamp - _lastStakeTime[account]) * _rewardRate);

        uint256 total = reward + stakedAmount; 
        return total;
  }

     function getElapsedStakeDuration(address account) public view returns (uint256) {
        uint256 time = (block.timestamp - _lastStakeTime[account]);
        return time;
  } 

    function getLastStakeTimestamp(address account) public view returns (uint256) {
        return _lastStakeTime[account];
  }
    
}