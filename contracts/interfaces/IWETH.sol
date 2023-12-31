// SPDX-License-Identifier: MIT
pragma solidity >=0.7.6 <0.9.0;

interface IWETH {
    function deposit() external payable;

    function withdraw(uint) external;

    function totalSupply() external view returns (uint);

    function balanceOf(address account) external view returns (uint);

    function transfer(address recipient, uint amount) external view returns (uint);

    function allowance(address sender, uint amount) external returns (bool);

    function approve(address sender, uint amount) external returns (bool);

    function transferFrom(address sender, address recipient, uint amount) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint value);

    event Approve(address indexed owner, address indexed sender, uint value);
}
