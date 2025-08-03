import { useEffect, useState } from "react";
import { ethers } from "ethers";

const Banner: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Cargar cuenta desde localStorage si existe
  useEffect(() => {
    const storedAccount = localStorage.getItem("connectedAccount");
    if (storedAccount) {
      setAccount(storedAccount);
    }
  }, []);

  // Redirigir si ya está conectado
  useEffect(() => {
    if (account) {
      // Redirige con delay para mostrar estado conectado
      const timer = setTimeout(() => {
        window.location.href = "/home";
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [account]);

  // Función para conectar con MetaMask
  const connectMetaMask = async () => {
    setError(null);
    setLoading(true);

    try {
      if (!window.ethereum) {
        setError("MetaMask no está instalado.");
        setLoading(false);
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);

      const selectedAccount = accounts[0];
      setAccount(selectedAccount);
      localStorage.setItem("connectedAccount", selectedAccount);
    } catch (err: any) {
      setError(err.message || "Error al conectar a MetaMask.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="home"
      className="relative flex items-center justify-center min-h-screen px-4 py-16 bg-gradient-to-br from-[#ff6ec4] via-[#7873f5] to-[#5f4efc] transition-all duration-1000"
    >
      <div className="absolute inset-0 backdrop-blur-sm" />

      <div className="relative z-10 w-full max-w-xl p-10 text-center rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
        <div className="mb-6">
          <div className="mb-2 text-5xl text-yellow-300">
            <i className="bx bxs-star" />
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-yellow-300">
            TalentRise
          </h1>
          <p className="text-lg leading-relaxed text-white/90">
            Descubre y apoya a los mejores talentos del mundo. Conecta, invierte y crece junto a ellos.
          </p>
        </div>

        <div className="flex flex-col gap-4 mt-8">
          <a
            href="/register"
            className="px-8 py-3 font-bold text-black transition-all rounded-full shadow-md bg-gradient-to-r from-[#fca311] to-[#ffb703] hover:opacity-90"
          >
            Comenzar
          </a>

          <button
            onClick={connectMetaMask}
            disabled={loading}
            className={`px-8 py-3 font-bold text-white transition-all rounded-full shadow-lg ${
              loading ? "bg-purple-400 cursor-wait" : "bg-purple-600 hover:bg-purple-700"
            } flex justify-center items-center gap-2`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Conectando...
              </>
            ) : account ? (
              `Conectado: ${account.slice(0, 6)}...${account.slice(-4)}`
            ) : (
              "Ya tengo cuenta"
            )}
          </button>

          {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
        </div>
      </div>
    </section>
  );
};

export default Banner;
