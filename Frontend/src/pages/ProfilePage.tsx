import React from "react";

const ProfilePage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-r from-purple-800 to-indigo-900 text-white flex justify-center p-8">
      <section className="bg-[#1f1f1f] rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Portada */}
        <div className="relative h-40 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80')" }}>
          {/* Avatar */}
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="@talent_music"
            className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 border-4 border-white rounded-full w-24 h-24 object-cover shadow-lg"
          />
        </div>

        {/* Contenido debajo de portada */}
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
            <h2 className="text-xl font-semibold">💖 Minas de Heart</h2>
            <p className="text-2xl mt-1">2,847</p>
            <p className="text-gray-300">Hearts recolectados este mes</p>
          </div>

          {/* Fan Badge */}
          <div className="text-center text-yellow-400 font-semibold text-lg drop-shadow-md">
            🏆 Fan Badge de Oro
          </div>

          {/* Wallet connection */}
          <div className="space-y-4 mt-6">
            <h3 className="text-xl font-semibold text-center mb-4">💰 Conectar Wallet</h3>

            <button className="flex items-center justify-between w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-5 py-3 transition shadow-lg">
              <span className="flex items-center space-x-3">
                <span className="text-2xl">🦊</span>
                <span>MetaMask</span>
              </span>
              <span className="text-gray-200 text-sm italic">Billetera más popular</span>
            </button>

            <button className="flex items-center justify-between w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-5 py-3 transition shadow-lg">
              <span className="flex items-center space-x-3">
                <span className="text-2xl">🔗</span>
                <span>WalletConnect</span>
              </span>
              <span className="text-gray-200 text-sm italic">Conecta múltiples wallets</span>
            </button>

            <button className="flex items-center justify-between w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-5 py-3 transition shadow-lg">
              <span className="flex items-center space-x-3">
                <span className="text-2xl">🪙</span>
                <span>Coinbase Wallet</span>
              </span>
              <span className="text-gray-200 text-sm italic">Billetera de Coinbase</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;
