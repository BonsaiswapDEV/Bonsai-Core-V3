// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.8.0) (token/ERC721/IERC721.sol)

pragma solidity ^0.7.6;
/**
 * @dev Required interface of an ERC721 compliant contract.
 */
interface IERC721 {
    function balanceOf(address owner) external view returns (uint256 balance);
}
