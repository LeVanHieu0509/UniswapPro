// SPDX-License-Identifier: MIT
pragma solidity >=0.7.6 <0.9.0;

interface IERC20 {
    function deposit() external payable;

    function withdraw(uint) external;

    function totalSupply() external view returns (uint256);

    function balanceOf(address account) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external view returns (uint256);

    function allowance(address sender, uint256 amount) external returns (bool);

    function approve(address sender, uint256 amount) external returns (bool);

    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);

    event Approve(address indexed owner, address indexed sender, uint256 value);
}
