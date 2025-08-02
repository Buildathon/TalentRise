import { ethers } from "ethers";
import { useState, useEffect } from "react";

// Aquí importa tu dirección y ABI (que debes tener en un archivo separado)
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../contracts/contractInfo";

const ProfilePage = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [symbol, setSymbol] = useState<string>("");

  // Conectar MetaMask y crear contrato
  const connectMetaMask = async () => {
    setError(null);
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

  // Al cambiar el contrato, obtener nombre y símbolo
  useEffect(() => {
    if (!contract) return;

    const fetchContractData = async () => {
      try {
        const contractName = await contract.name();
        const contractSymbol = await contract.symbol();
        setName(contractName);
        setSymbol(contractSymbol);
      } catch (err: any) {
        setError("Error al obtener datos del contrato: " + (err.message || err));
      }
    };

    fetchContractData();
  }, [contract]);

  // Función para acortar dirección
  const truncateAddress = (addr: string) => {
    return addr.slice(0, 6) + "..." + addr.slice(-4);
  };

  return (
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
          <div className="text-center mt-4">
            <p className="text-lg">
              <strong>Contrato:</strong>{" "}
              {name ? `${name} (${symbol})` : "No conectado"}
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

            {/* Error */}
            {error && (
              <p className="text-red-500 text-center mt-3 font-semibold">{error}</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;
