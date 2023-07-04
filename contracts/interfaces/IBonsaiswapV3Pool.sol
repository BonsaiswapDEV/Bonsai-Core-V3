// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0;

import './pool/IBonsaiswapV3PoolImmutables.sol';
import './pool/IBonsaiswapV3PoolState.sol';
import './pool/IBonsaiswapV3PoolDerivedState.sol';
import './pool/IBonsaiswapV3PoolActions.sol';
import './pool/IBonsaiswapV3PoolOwnerActions.sol';
import './pool/IBonsaiswapV3PoolEvents.sol';

/// @title The interface for a Bonsaiswap V3 Pool
/// @notice A Bonsaiswap pool facilitates swapping and automated market making between any two assets that strictly conform
/// to the ERC20 specification
/// @dev The pool interface is broken up into many smaller pieces
interface IBonsaiswapV3Pool is
    IBonsaiswapV3PoolImmutables,
    IBonsaiswapV3PoolState,
    IBonsaiswapV3PoolDerivedState,
    IBonsaiswapV3PoolActions,
    IBonsaiswapV3PoolOwnerActions,
    IBonsaiswapV3PoolEvents
{

}
