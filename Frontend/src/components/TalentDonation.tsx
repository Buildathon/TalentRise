import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { VAULT_ABI, VAULT_ADDRESS } from "../contracts/vaultInfo";
import { usdtAbi } from "../contracts/usdtAbi";

interface Props {
  talentAddress: string;
  talentName: string;
}

const TalentDonation = ({ talentAddress, talentName }: Props) => {
  const [account, setAccount] = useState<string | null>(null);
  const [vaultContract, setVaultContract] = useState<ethers.Contract | null>(null);
  const [depositAmount, setDepositAmount] = useState("");
  const [harvestable, setHarvestable] = useState("0");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) return setMsg("❌ MetaMask no está instalado");

      const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      const network = await provider.getNetwork();
      if (network.chainId !== 11155111) {
        return setMsg("⚠️ Conéctate a Sepolia Testnet en MetaMask");
      }

      setAccount(address);
      const vault = new ethers.Contract(VAULT_ADDRESS, VAULT_ABI, signer);
      setVaultContract(vault);
    } catch (err: any) {
      setMsg(`❌ Error al conectar wallet: ${err.message}`);
    }
  };

  const handleDeposit = async () => {
    if (!vaultContract || !account) return;

    try {
      setLoading(true);
      const amount = ethers.utils.parseUnits(depositAmount, 6);

      const usdtAddress = await vaultContract.usdtToken();
      const usdt = new ethers.Contract(usdtAddress, usdtAbi, vaultContract.signer);

      await usdt.approve(VAULT_ADDRESS, amount);
      const tx = await vaultContract.depositForTalent(talentAddress, amount);
      await tx.wait();

      setMsg("✅ Depósito exitoso");
      setDepositAmount("");
      getHarvestable();
    } catch (error: any) {
      setMsg(`❌ ${error.message || "Error al depositar"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleHarvest = async () => {
    if (!vaultContract || !account) return;

    try {
      setLoading(true);
      const tx = await vaultContract.harvestAndDonate(talentAddress);
      await tx.wait();
      setMsg("🌱 Intereses cosechados y tokens entregados");
      getHarvestable();
    } catch (error: any) {
      setMsg(`❌ ${error.message || "Error al cosechar"}`);
    } finally {
      setLoading(false);
    }
  };

  const getHarvestable = async () => {
    if (!vaultContract || !account) return;

    try {
      const interest = await vaultContract.calculateHarvestableInterest(account, talentAddress);
      setHarvestable(ethers.utils.formatUnits(interest, 6));
    } catch {
      setHarvestable("0");
    }
  };

  useEffect(() => {
    if (vaultContract && account) {
      getHarvestable();
    }
  }, [vaultContract, account]);

  return (
    <div className="bg-gray-900 text-white p-6 rounded-xl shadow-md mb-6">
      <h2 className="text-xl font-bold mb-2">🎤 Apoya a {talentName}</h2>

      {!account ? (
        <button
          onClick={connectWallet}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 font-semibold"
        >
          Conectar Wallet
        </button>
      ) : (
        <>
          <p className="text-sm text-yellow-400 mb-2">✅ Conectado: {account.slice(0, 6)}...{account.slice(-4)}</p>

          <div className="flex flex-col gap-2">
            <input
              type="number"
              placeholder="Monto en USDT"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              className="w-full p-2 rounded text-black"
              min="0"
            />
            <button
              onClick={handleDeposit}
              disabled={loading}
              className="bg-green-600 py-2 rounded hover:bg-green-700"
            >
              Depositar
            </button>
          </div>

          <div className="bg-gray-800 p-3 rounded mt-4">
            <p className="text-md mb-1">💰 Intereses cosechables: <b className="text-lime-400">{harvestable} USDT</b></p>
            <button
              onClick={handleHarvest}
              disabled={loading || harvestable === "0"}
              className="bg-purple-500 w-full py-2 mt-2 rounded hover:bg-purple-600"
            >
              Cosechar y donar
            </button>
          </div>
        </>
      )}

      {msg && <div className="text-sm text-yellow-300 mt-4">{msg}</div>}
    </div>
  );
};

export default TalentDonation;
