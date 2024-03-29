// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/utils/Counters.sol";
import "./Loyalty.sol";
import "./Fee.sol";
import "./PhoneBotToken.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract Controller is Fee, Loyalty, Pausable {
    using Counters for Counters.Counter;

    PhoneBotToken pb;

    // uint256 public lockTIme;
    address public taxCollector;

    error AddressAndAmountLengthInvalid();
    error NotEnoughBalance();
    error CannotSendToAddressZero();
    error valueCannotBeZero();
    error cannotBeContract();
    error AlreadyAdded();
    error CannotBeAddressZero();
    error ThisAintAllowedYet();

    event TokenRewarded(address to, uint256 amount);

    event TokensBurned(uint256 amount, address user);

    constructor(address _contract) {
        pb = PhoneBotToken(_contract);
    }

    modifier checkOnlyTeam() {
        require(pb.teamAccessRecord(msg.sender), "You are not part of team");
        _;
    }

    /**
     * @notice Method for security to ensure that address is not of a contract
     * @param _addr input address
     */
    function isContract(address _addr) internal view returns (bool) {
        uint256 size;
        assembly {
            size := extcodesize(_addr)
        }
        return size > 0;
    }

    function simpleMint(address _to, uint256 _amount) public checkOnlyTeam {
        pb.mintForContract(_to, _amount);
    }

    /**
     * @notice Method for adding _taxCollector
     * @param _taxCollector Address of treasy where fee will be collected
     */
    function setTaxCollector(address _taxCollector) external onlyOwner {
        if (isContract(_taxCollector)) {
            revert cannotBeContract();
        }
        taxCollector = _taxCollector;
    }

    /**
     * @notice Method for Rewarding to all winners.
     * @param _addresses array of addresses to which the amount will go
     * @param _amounts array of amounts which will be awarded
     */

    function batchMinting(
        address[] memory _addresses,
        uint256[] memory _amounts
    ) external checkOnlyTeam whenNotPaused {
        if (_addresses.length != _amounts.length) {
            revert AddressAndAmountLengthInvalid();
        }

        for (uint256 i = 0; i < _addresses.length; i++) {
            if (_addresses[i] == address(0)) {
                revert CannotBeAddressZero();
            }

            pb.mintForContract(_addresses[i], _amounts[i]);

            emit TokenRewarded(_addresses[i], _amounts[i]);
        }
    }

    function buyTokens(address to, uint amount) public payable {
        uint tokenPrice = pb.tokenPrice();
        require(msg.value >= (amount * tokenPrice), "Insuffcient funds");
        pb.buyToken(to, amount);
    }

    // CALL APPROVE BEFORE CALLING THIS FUNCTION, approval will be for teammember

    function burnOnPurchase(address _user, uint256 _amount)
        external
        checkOnlyTeam
        whenNotPaused
    {
        if (pb.balanceOf(_user) < _amount) {
            revert NotEnoughBalance();
        }
        pb.burnFrom(_user, _amount);
        emit TokensBurned(_amount, _user);
    }

    /**
     * @notice This function deducts tokens when transferring outside.
     * @param _to Address that they are sending to.
     * @param _amount The number of tokens to be transfered
     */
    function transferingTokensOutside(address _to, uint256 _amount) external {
        if (_to == address(0)) {
            revert CannotSendToAddressZero();
        }
        if (_amount <= 0) {
            revert valueCannotBeZero();
        }
        uint256 amount = calculateAfterfeeDeduction(_amount);
        uint256 FeeAmount = calculateFeeForAmount(_amount);
        address sender = _msgSender();
        pb.transferFunds(sender, taxCollector, FeeAmount);
        pb.transferFunds(sender, _to, amount);
    }

    function getTaxCollectorAddress()
        external
        view
        onlyOwner
        returns (address)
    {
        return taxCollector;
    }

    // function approve(address spender, uint256 amount) public returns(bool){
    //     return pb.approve(spender, amount);
    // }

    function transfer(address to, uint256 amount) public {
        if (!pb.allowNativeFunctionality()) {
            revert ThisAintAllowedYet();
        }
        pb.transfer(to, amount);
    }

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public {
        if (!pb.allowNativeFunctionality()) {
            revert ThisAintAllowedYet();
        }
        pb.transferFrom(from, to, amount);
    }

    function balanceOf(address _user) public view returns (uint256) {
        return pb.balanceOf(_user);
    }

    function allowance(address _owner, address _spender)
        public
        view
        returns (uint256)
    {
        return pb.allowance(_owner, _spender);
    }

    // function burn(uint256 amount) public {
    //     pb.burn(amount);
    // }
}
