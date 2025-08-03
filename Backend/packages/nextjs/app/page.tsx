"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Conectar a MetaMask
  const connectMetaMask = async () => {
    setError(null);
    if (!window.ethereum) {
      setError("MetaMask no está instalado");
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
    } catch (err: any) {
      if (err.code === 4001) setError("Conexión a MetaMask rechazada por el usuario.");
      else setError("Error al conectar MetaMask: " + (err.message || err));
    }
  };

  // Detectar si ya está conectado
  useEffect(() => {
    if (!window.ethereum) return;

    window.ethereum
      .request({ method: "eth_accounts" })
      .then((accounts: string[]) => {
        if (accounts.length > 0) setAccount(accounts[0]);
      })
      .catch(() => {});

    // Escuchar cambios de cuenta
    window.ethereum.on("accountsChanged", (accounts: string[]) => {
      if (accounts.length === 0) setAccount(null);
      else setAccount(accounts[0]);
    });
  }, []);

  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center min-h-screen px-4 py-16 bg-gradient-to-br from-[#ff6ec4] via-[#7873f5] to-[#5f4efc] transition-all duration-1000"
    >
      {/* Fondo blur */}
      <div className="absolute inset-0 backdrop-blur-sm" />

      <div className="relative z-10 w-full max-w-3xl rounded-3xl p-10 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-center text-white">
        
        {/* LOGO y Título */}
        <div className="mb-8">
          <h1 className="text-yellow-300 text-5xl font-extrabold mb-4 tracking-tight">
            TalentRise
          </h1>
          <p className="text-white/90 text-lg leading-relaxed max-w-md mx-auto">
            Descubre y apoya a los mejores talentos del mundo. Conecta, invierte y crece junto a ellos.
          </p>
        </div>

        {/* Dirección Wallet */}
        <div className="mb-10">
          <p className="mb-2 text-lg font-medium">Connected Address:</p>
          {account ? (
            <div className="mx-auto">
              <Address address={account} />
            </div>
          ) : (
            <button
              onClick={connectMetaMask}
              className="mt-2 bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-full font-semibold transition-all"
            >
              Conectar MetaMask
            </button>
          )}
          {error && (
            <p className="mt-4 text-red-300 text-sm font-medium">{error}</p>
          )}
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-md mx-auto">
          <Link
            href="/register"
            className="rounded-full bg-gradient-to-r from-[#fca311] to-[#ffb703] px-8 py-3 text-black font-bold shadow-md hover:opacity-90 transition-all"
          >
            Comenzar
          </Link>
          <Link
            href="/login"
            className="rounded-full border border-white/30 px-8 py-3 text-white font-medium bg-white/10 hover:bg-white/20 transition-all"
          >
            Ya tengo cuenta
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
