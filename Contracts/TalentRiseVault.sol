// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IPool} from "@aave/core-v3/contracts/interfaces/IPool.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {TalentRiseCoin} from "./TalentRiseCoin.sol";

contract TalentRiseVault {
    // --- Variables de Estado ---

    IPool public immutable aavePool;
    IERC20 public immutable usdtToken;
    IERC20 public immutable aUsdtToken;
    TalentRiseCoin public talentRiseCoinToken;

    uint256 public totalPrincipal;
    uint256 public constant MINTING_RATIO = 1;
    event Log(string step);

    struct Investment {
        address fan;
        address talent;
        uint256 principal;
    }

    mapping(address => mapping(address => Investment)) public investments;

    // --- Eventos ---

    event Deposited(
        address indexed fan,
        address indexed talent,
        uint256 amount
    );

    event Harvested(
        address indexed fan,
        address indexed talent,
        uint256 interestDonated,
        uint256 tokensMinted
    );

    // --- Constructor ---

    constructor(
        address _aavePoolAddress,
        address _usdtAddress,
        address _aUsdtAddress,
        address _talentRiseCoinAddress
    ) {
        aavePool = IPool(_aavePoolAddress);
        usdtToken = IERC20(_usdtAddress);
        aUsdtToken = IERC20(_aUsdtAddress);
        talentRiseCoinToken = TalentRiseCoin(_talentRiseCoinAddress);
    }

    // --- Funciones Principales ---

    function depositForTalent(
        address _talentAddress,
        uint256 _amount
    ) public {
        require(_amount > 0, "Amount must be greater than zero");
        
        totalPrincipal += _amount;

        usdtToken.transferFrom(msg.sender, address(this), _amount);
        usdtToken.approve(address(aavePool), _amount);
        aavePool.deposit(address(usdtToken), _amount, address(this), 0);

        Investment storage investment = investments[msg.sender][_talentAddress];
        investment.principal += _amount;

        if (investment.fan == address(0)) {
            investment.fan = msg.sender;
            investment.talent = _talentAddress;
        }

        emit Deposited(msg.sender, _talentAddress, _amount);
    }

    /**
     * @notice Cosecha los intereses de una inversion, los dona y emite tokens.
     * @dev El principal del usuario en Aave se mantiene para seguir generando intereses.
     * @param _talentAddress La direccion del talento cuya inversion se va a cosechar.
     */
    function harvestAndDonate(address _talentAddress) public {
        // 1. Obtener la inversion del fan que llama a la funcion.
        Investment storage investment = investments[msg.sender][_talentAddress];
        require(investment.principal > 0, "No investment found");

        // 2. Calcular el interes total acumulado en la boveda.
        // El valor total de la boveda es el balance actual de aUSDT.
        uint256 currentVaultValue = aUsdtToken.balanceOf(address(this));
        uint256 totalInterest = currentVaultValue - totalPrincipal;

        // 3. Calcular la parte del interes que corresponde a esta inversion (proporcional).
        uint256 interestToHarvest = (totalInterest * investment.principal) / totalPrincipal;
        require(interestToHarvest > 0, "No interest to harvest yet");

        // 4. Retirar el interes de Aave. El contrato recibe los USDT.
        aavePool.withdraw(address(usdtToken), interestToHarvest, address(this));

        // 5. Donar el interes (USDT) a la billetera del talento.
        usdtToken.transfer(_talentAddress, interestToHarvest);

        // 6. Calcular y emitir los TalentRiseCoin para el fan como recompensa.
        // Se asume que MINTING_RATIO y los decimales de USDT se alinean.
        // Cambiamos el 6 por un 2 para reflejar los decimales de EURS
        uint256 tokensToMint = (interestToHarvest * MINTING_RATIO * (10**18)) / (10**2);
        // uint256 tokensToMint = (interestToHarvest * MINTING_RATIO * (10**18)) / (10**6);

        talentRiseCoinToken.mint(msg.sender, tokensToMint);

        // 7. CRITICO: Reajuste contable. Para evitar que el mismo interes se coseche
        // dos veces, actualizamos el principal total de la boveda.
        totalPrincipal -= interestToHarvest;

        // 8. Emitir evento de la cosecha.
        emit Harvested(msg.sender, _talentAddress, interestToHarvest, tokensToMint);
    }

    /**
    * @notice Calcula el interes cosechable para una inversion sin ejecutar una transaccion.
    * @dev Es una funcion 'view' para ser llamada desde el frontend sin costo de gas.
    * @param _fanAddress La direccion del fan.
    * @param _talentAddress La direccion del talento.
    * @return La cantidad de interes en USDT que se puede cosechar.
    */
    function calculateHarvestableInterest(
        address _fanAddress,
        address _talentAddress
    ) public view returns (uint256) {
    
        // 1. Obtener la inversion
        Investment storage investment = investments[_fanAddress][_talentAddress];
        if (investment.principal == 0) {
            return 0;
        }

        // 2. Calcular interes total en la boveda
        uint256 currentVaultValue = aUsdtToken.balanceOf(address(this));
        // Prevenir underflow si el valor del aToken baja ligeramente
        if (currentVaultValue <= totalPrincipal) {
            return 0;
        }
        uint256 totalInterest = currentVaultValue - totalPrincipal;

        // 3. Calcular la parte del interes del usuario
        uint256 interestToHarvest = (totalInterest * investment.principal) / totalPrincipal;

        return interestToHarvest;
    }
}