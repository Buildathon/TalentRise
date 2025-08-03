// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title TalentRiseCoin
 * @dev Token ERC20.
 * El propietario (owner) puede agregar/quitar direcciones autorizadas para emitir tokens.
 */
contract TalentRiseCoin is ERC20, ERC20Burnable, ERC20Pausable, Ownable {

    // --- Modulo de Minters ---
    mapping(address => bool) public minters;

    modifier onlyMinter() {
        require(minters[msg.sender], "Caller is not an authorized minter");
        _;
    }

    event MinterAdded(address indexed minter);
    event MinterRemoved(address indexed minter);

    // --- Constructor ---
    constructor(address initialOwner)
        ERC20("TalentRiseCoin", "TRC")
        Ownable(initialOwner)
    {}

    // --- Funciones de Administracion ---

    /**
     * @dev Permite al owner agregar una nueva direccion como emisor autorizado.
     */
    function addMinter(address _minter) external onlyOwner {
        require(!minters[_minter], "Address is already a minter");
        minters[_minter] = true;
        emit MinterAdded(_minter);
    }

    /**
     * @dev Permite al owner revocar el permiso de emision a una direccion.
     */
    function removeMinter(address _minter) external onlyOwner {
        require(minters[_minter], "Address is not a minter");
        minters[_minter] = false;
        emit MinterRemoved(_minter);
    }

    /**
     * @dev Pausa todas las transferencias y operaciones del token.
     */
    function pause() public onlyOwner {
        _pause();
    }

    /**
     * @dev Reanuda las transferencias y operaciones del token.
     */
    function unpause() public onlyOwner {
        _unpause();
    }

    // --- Función de Emision ---

    /**
     * @dev Acuña tokens a favor de una direccion. Solo puede ser llamado por un minter autorizado.
     * Se usa 'external' para una ligera optimizacion de gas.
     */
    function mint(address to, uint256 amount) external onlyMinter {
        _mint(to, amount);
    }

    // --- Hooks Internos ---

    /**
     * @dev Combina la logica de pausado y transferencia para OpenZeppelin v5.
     */
    function _update(address from, address to, uint256 value)
        internal
        override(ERC20, ERC20Pausable)
    {
        super._update(from, to, value);
    }
}