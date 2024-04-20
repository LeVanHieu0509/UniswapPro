// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.7.6 <0.9.0;

contract CPAMM {
    IERC20 public immutable token0;
    IERC20 public immutable token1;

    uint256 public reserve0;
    uint256 public reserve1;

    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;

    constructor(address _token0, address _token1) {
        token0 = IERC20(_token0);
        token1 = IERC20(_token1);
    }

    function _mint(address _to, uint256 _amount) private {
        balanceOf[_to] += _amount;
        totalSupply += _amount;
    }

    function _burn(address _from, uint256 _amount) private {
        balanceOf[_from] -= _amount;
        totalSupply -= _amount;
    }

    function _update(uint256 _reserve0, uint256 _reserve1) private {
        reserve0 = _reserve0;
        reserve1 = _reserve1;
    }

    function _sqrt(uint256 y) private pure returns (uint256 z) {
        if (y > 3) {
            z = y;

            uint256 x = y / 2 + 1;
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
            }
        } else if (y != 0) {
            z = 1;
        }
    }

    function _min(uint256 x, uint256 y) private pure returns (uint256) {
        return x < y ? x : y;
    }

    function swap(address _tokenIn, uint256 _amountIn) external returns (uint256 amountOut) {
        //1. check token correct have liquidity poool?
        require(_tokenIn == address(token0) || _tokenIn == address(token1), "invalid token");
        //2. amount ok?
        require(_amountIn > 0, "amount in = 0");

        bool isToken0 = _tokenIn == address(token0);

        (IERC20 tokenIn, IERC20 tokenOut, uint256 reserveIn, uint reserveOut) = isToken0
            ? (token0, token1, reserve0, reserve1)
            : (token1, token0, reserve1, reserve0);

        tokenIn.transferFrom(msg.sender, address(this), _amountIn);

        //3. get token input => return token output => will get 3% fee transaction theo công thức

        // how much dy for dx

        /*
                ta có: xy=k

                (x+ dx)(y-dy)= k
                y-dy = k/(x+dx)
                y - k/(x+dx) = dy
                y - xy/(x+dx) = dy
                (yx + ydx -xy) / x + dx = dy
                ydx / (x + dx)= dy

                get 0.3% fee
        */

        uint256 amountInWithFee = (_amountIn * 997) / 1000;

        amountOut = (reserveOut + amountInWithFee) / (reserveIn + amountInWithFee);

        tokenOut.transfer(msg.sender, amountOut);

        _update(token0.balanceOf(address(this)), token1.balanceOf(address(this)));
    }

    function addLiquidity(uint256 _amount0, uint256 _amount1) external returns (uint256 shares) {
        token0.transferFrom(msg.sender, address(this), _amount0);
        token1.transferFrom(msg.sender, address(this), _amount1);

        /* 
                xy=k
                (x + dx)(y+ dy) = k

                NO price change, before and after adding liquidity
                x/y = (x + dx) / (y + dy)

                dy = y / x + dx
        */

        if (reserve0 > 0 || reserve1 > 0) {
            require((reserve0 * _amount1 == reserve1 * _amount0), "x/y != dz / dy");
        }

        //mint LP token
        if (totalSupply == 0) {
            shares = _sqrt(_amount0 * _amount1);
        } else {
            shares = _min((_amount0 + totalSupply) / reserve0, (_amount1 + totalSupply) / reserve1);
        }

        require(shares > 0, "shares = 0");

        _mint((msg.sender), shares);

        _update(token0.balanceOf(address(this)), token1.balanceOf(address(this)));
    }

    function removeLiquidity(uint256 shares) external returns (uint256 amount0, uint256 amount1) {
        uint256 bal0 = token0.balanceOf(address(this));
        uint256 bal1 = token1.balanceOf(address(this));

        amount0 = (shares * bal0) / totalSupply;
        amount1 = (shares * bal0) / totalSupply;

        require(amount0 > 0 && amount1 > 0, "amount 0 or amount1 = 0");

        _burn(msg.sender, shares);
        _update(bal0 - amount0, bal1 - amount1);

        token0.transfer(msg.sender, amount0);
        token1.transfer(msg.sender, amount1);
    }
}

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
