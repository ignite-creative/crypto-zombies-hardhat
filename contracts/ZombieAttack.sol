// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./ZombieHelper.sol";

contract ZombieAttack is ZombieHelper {
    uint256 randNonce = 0;
    uint256 attackVictoryProbability = 70;

    function randMod(uint256 _modulus) internal returns (uint256) {
        randNonce++;

        return
            uint256(
                keccak256(
                    abi.encodePacked(block.timestamp, msg.sender, randNonce)
                )
            ) % 100;
    }

    function attack(uint256 _zombieId, uint256 _targetId) external {
                   
    } 
}
