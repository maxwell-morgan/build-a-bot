// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "hardhat/console.sol";
import "./Token.sol";

contract ProxyTrader {
  address public owner;
  IUniswapV2Router02 public immutable uRouter;

  constructor(address _uRouter) {
    owner = msg.sender;
    uRouter = IUniswapV2Router02(_uRouter);
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "Function caller is not owner");
    _;
  }

  function withdraw_erc20(uint256 _amount, address _tokenAddress) public onlyOwner {
    Token erc20 = Token(_tokenAddress);
    require(erc20.balanceOf(address(this)) >= _amount , "Insufficient contract token balance");
    erc20.transfer(owner, _amount);
  }

  function withdraw_eth(uint256 _amount) public onlyOwner {
    require((address(this).balance) >= _amount , "Insufficient contract Ether balance");
    (bool sent,) = owner.call{ value: _amount } ("");
    require(sent, "ETH not sent to owner");
  }

  function swap(uint256 _inAmount, uint256 _outAmount, address _inToken, address _outToken) public onlyOwner {
    address[] memory path = new address[](2);
    path[0] = _inToken;
    path[1] = _outToken;
    uRouter.swapExactTokensForTokens(_inAmount, _outAmount, path, address(this), (block.timestamp + 1200));
  }

}
