import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../contracts/contractInfo";

const ProfilePage = () => {
  // Estados generales
  const [account, setAccount] = useState<string | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Datos del token
  const [name, setName] = useState<string>("");
  const [symbol, setSymbol] = useState<string>("");
  const [decimals, setDecimals] = useState<number>(18);
  const [balance, setBalance] = useState<string>("0");

  // Modal y datos para transferencia
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transferTo, setTransferTo] = useState("");
  const [transferAmount, setTransferAmount] = useState("");

  // ----------------------------
  // Función para conectar MetaMask
  // ----------------------------
  const connectMetaMask = async () => {
    setError(null);
    setSuccessMsg(null);

    if (!window.ethereum) {
      setError("MetaMask no está instalado. Por favor instala MetaMask.");
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      setContract(contractInstance);
    } catch (err: any) {
      if (err.code === 4001) setError("Conexión a MetaMask rechazada por el usuario.");
      else setError("Error al conectar a MetaMask: " + (err.message || err));
    }
  };

  // ----------------------------
  // Obtener datos del contrato y balance al cambiar contrato o cuenta
  // ----------------------------
  useEffect(() => {
    if (!contract || !account) return;

    const fetchData = async () => {
      setError(null);
      setSuccessMsg(null);
      try {
        const [contractName, contractSymbol, contractDecimals, rawBalance] = await Promise.all([
          contract.name(),
          contract.symbol(),
          contract.decimals(),
          contract.balanceOf(account),
        ]);

        setName(contractName);
        setSymbol(contractSymbol);
        setDecimals(contractDecimals);
        setBalance(ethers.utils.formatUnits(rawBalance, contractDecimals));
      } catch (err: any) {
        setError("Error al obtener datos del contrato o balance: " + (err.message || err));
      }
    };

    fetchData();
  }, [contract, account]);

  // ----------------------------
  // Función para acortar dirección para UI
  // ----------------------------
  const truncateAddress = (addr: string) => {
    return addr.slice(0, 6) + "..." + addr.slice(-4);
  };

  // ----------------------------
  // Manejar transferencia de tokens
  // ----------------------------
  const handleTransfer = async () => {
    setError(null);
    setSuccessMsg(null);

    if (!contract || !account) {
      setError("Conecta primero MetaMask y el contrato.");
      return;
    }

    if (!ethers.utils.isAddress(transferTo)) {
      setError("La dirección destino no es válida.");
      return;
    }

    if (!transferAmount || isNaN(Number(transferAmount)) || Number(transferAmount) <= 0) {
      setError("Ingresa una cantidad válida para transferir.");
      return;
    }

    if (Number(transferAmount) > Number(balance)) {
      setError("Saldo insuficiente para realizar la transferencia.");
      return;
    }

    try {
      setLoading(true);

      const amountParsed = ethers.utils.parseUnits(transferAmount, decimals);
      const tx = await contract.transfer(transferTo, amountParsed);
      await tx.wait();

      setSuccessMsg(`Transferencia exitosa de ${transferAmount} ${symbol} a ${truncateAddress(transferTo)}`);
      setTransferAmount("");
      setTransferTo("");
      setIsModalOpen(false);

      // Actualizar balance
      const rawBalance = await contract.balanceOf(account);
      setBalance(ethers.utils.formatUnits(rawBalance, decimals));
    } catch (err: any) {
      setError(err.message || "Error en la transferencia.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="min-h-screen bg-gradient-to-r from-purple-800 to-indigo-900 text-white flex justify-center p-8">
        <section className="bg-[#1f1f1f] rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
          {/* Portada */}
          <div
            className="relative h-40 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80')",
            }}
          >
            {/* Avatar */}
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="@talent_music"
              className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 border-4 border-white rounded-full w-24 h-24 object-cover shadow-lg"
            />
          </div>

          {/* Contenido */}
          <div className="pt-16 px-8 pb-8 space-y-6">
            {/* Nombre y descripción */}
            <div className="text-center">
              <h1 className="text-4xl font-bold">@talent_music</h1>
              <p className="text-purple-300 mt-1">Cantante y compositor</p>
            </div>

            {/* Estadísticas */}
            <div className="flex justify-around text-center">
              <div>
                <p className="text-3xl font-semibold">15.2k</p>
                <p className="text-gray-400">Seguidores</p>
              </div>
              <div>
                <p className="text-3xl font-semibold">$8.5k</p>
                <p className="text-gray-400">Ganado</p>
              </div>
              <div>
                <p className="text-3xl font-semibold">24</p>
                <p className="text-gray-400">Videos</p>
              </div>
            </div>

            {/* Minas de Heart */}
            <div className="bg-purple-700 rounded-lg p-4 text-center shadow-md">
              <h2 className="text-xl font-semibold flex justify-center items-center space-x-2">
                <i className="bx bxs-heart text-pink-400 text-2xl"></i>
                <span>Minas de Heart</span>
              </h2>
              <p className="text-2xl mt-1">2,847</p>
              <p className="text-gray-300">Hearts recolectados este mes</p>
            </div>

            {/* Fan Badge */}
            <div className="text-center text-yellow-400 font-semibold text-lg drop-shadow-md flex justify-center items-center space-x-2">
              <i className="bx bxs-trophy"></i>
              <span>Fan Badge de Oro</span>
            </div>

            {/* Datos del contrato */}
            <div className="text-center mt-4 space-y-2">
              <p className="text-lg">
                <strong>Contrato:</strong> {name ? `${name} (${symbol})` : "No conectado"}
              </p>
              <p className="text-lg">
                <strong>Cuenta:</strong> {account ? truncateAddress(account) : "No conectado"}
              </p>
              <p className="text-lg">
                <strong>Balance:</strong> {balance} {symbol}
              </p>
            </div>

            {/* Wallet connection */}
            <div className="space-y-4 mt-6">
              <h3 className="text-xl font-semibold text-center mb-4 flex justify-center items-center space-x-2">
                <i className="bx bx-wallet text-yellow-300 text-2xl"></i>
                <span>Conectar Wallet</span>
              </h3>

              {/* MetaMask */}
              <button
                onClick={connectMetaMask}
                className="flex items-center justify-between w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-5 py-3 transition shadow-lg"
              >
                <span className="flex items-center space-x-3">
                  <i className="bx bxl-metamask text-2xl"></i>
                  <span>MetaMask</span>
                </span>
                <span className="text-gray-200 text-sm italic">
                  {account ? truncateAddress(account) : "Billetera más popular"}
                </span>
              </button>

              {/* WalletConnect (solo UI) */}
              <button className="flex items-center justify-between w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-5 py-3 transition shadow-lg">
                <span className="flex items-center space-x-3">
                  <i className="bx bx-link-alt text-2xl"></i>
                  <span>WalletConnect</span>
                </span>
                <span className="text-gray-200 text-sm italic">Conecta múltiples wallets</span>
              </button>

              {/* Coinbase Wallet (solo UI) */}
              <button className="flex items-center justify-between w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-5 py-3 transition shadow-lg">
                <span className="flex items-center space-x-3">
                  <i className="bx bxl-coinbase text-2xl"></i>
                  <span>Coinbase Wallet</span>
                </span>
                <span className="text-gray-200 text-sm italic">Billetera de Coinbase</span>
              </button>

              {/* Botón para abrir modal de transferir con estilo mejorado */}
              {account && contract && (
                <button
                  onClick={() => {
                    setIsModalOpen(true);
                    setError(null);
                    setSuccessMsg(null);
                  }}
                  className="w-full 
                    bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 
                    hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700 
                    text-white rounded-xl py-3 text-lg font-semibold 
                    shadow-lg transition-transform transform hover:scale-105 active:scale-95"
                >
                  Transferir Tokens
                </button>
              )}

              {/* Mensajes de éxito y error */}
              {error && <p className="text-red-500 text-center mt-3 font-semibold">{error}</p>}
              {successMsg && <p className="text-green-400 text-center mt-3 font-semibold">{successMsg}</p>}
            </div>
          </div>
        </section>
      </main>

      {/* Modal para transferencia con estilos mejorados */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fadeIn"
          onClick={() => !loading && setIsModalOpen(false)}
        >
          <div
            className="bg-[#27272a] rounded-3xl p-8 max-w-md w-full shadow-2xl
                       animate-zoomIn
                       text-white
                       flex flex-col space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-3xl font-extrabold text-center mb-2 tracking-wide">
              Transferir Tokens
            </h2>

            <label className="block text-gray-300 font-medium">Dirección destino</label>
            <input
              type="text"
              value={transferTo}
              onChange={(e) => setTransferTo(e.target.value)}
              placeholder="0x..."
              className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white 
                         placeholder-gray-400 focus:outline-none focus:ring-4 
                         focus:ring-indigo-500 transition"
              disabled={loading}
            />

            <label className="block text-gray-300 font-medium">Cantidad ({symbol || "Token"})</label>
            <input
              type="number"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
              placeholder="0.0"
              min="0"
              step="any"
              className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white 
                         placeholder-gray-400 focus:outline-none focus:ring-4 
                         focus:ring-indigo-500 transition"
              disabled={loading}
            />

            <div className="flex justify-between items-center pt-4">
              <button
                onClick={() => !loading && setIsModalOpen(false)}
                className="px-6 py-3 rounded-xl bg-gray-700 hover:bg-gray-600 
                           text-white font-semibold transition shadow-md
                           focus:ring-2 focus:ring-gray-500"
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                onClick={handleTransfer}
                className={`px-6 py-3 rounded-xl
                            bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 
                            hover:from-indigo-600 hover:via-purple-700 hover:to-pink-600
                            text-white font-extrabold shadow-lg
                            transition-transform transform hover:scale-105 active:scale-95
                            disabled:opacity-60 disabled:cursor-not-allowed`}
                disabled={loading}
              >
                {loading ? "Transfiriendo..." : "Enviar"}
              </button>
            </div>

            {/* Mostrar error en modal también */}
            {error && <p className="text-red-400 text-center font-semibold">{error}</p>}
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
