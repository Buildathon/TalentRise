"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

const navItems = [
  { name: "Home", path: "/home", icon: "bx bx-home" },
  { name: "Perfil", path: "/perfil", icon: "bx bx-user" },
  { name: "Following", path: "/following", icon: "bx bx-group" },
  { name: "Notificaciones", path: "/notificaciones", icon: "bx bx-bell" },
  { name: "Ajustes", path: "/ajustes", icon: "bx bx-cog" },
];

// Función para acortar dirección tipo 0x1234...5678
const truncateAddress = (address: string) => {
  return address.slice(0, 6) + "..." + address.slice(-4);
};

export const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  // Desconectar (simplemente limpiar el estado local)
  const disconnect = () => {
    setAccount(null);
    setError(null);
  };

  // Detectar si ya está conectado cuando carga el componente
  useEffect(() => {
    if (!window.ethereum) return;

    window.ethereum
      .request({ method: "eth_accounts" })
      .then((accounts: string[]) => {
        if (accounts.length > 0) setAccount(accounts[0]);
      })
      .catch(() => { /* ignorar errores aquí */ });

    // Escuchar cambios de cuenta
    window.ethereum.on("accountsChanged", (accounts: string[]) => {
      if (accounts.length === 0) setAccount(null);
      else setAccount(accounts[0]);
    });
  }, []);

  useEffect(() => {
    const closeMenu = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        !(event.target as HTMLElement).closest("#mobile-menu") &&
        !(event.target as HTMLElement).closest("#menu-button")
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [isMenuOpen]);

  return (
    <>
      {/* Header para pantallas grandes */}
      <header className="bg-gradient-to-r from-indigo-700 to-purple-800 shadow-md p-4 hidden md:flex justify-between items-center text-white z-50">
        <Link href="/" className="flex items-center space-x-2">
          <img src="/logo.svg" alt="TalentRise Logo" className="w-8 h-8" />
          <span className="text-xl font-bold">TalentRise</span>
        </Link>

        <nav className="flex space-x-6 items-center">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`hover:text-sky-300 transition ${
                pathname === item.path ? "font-semibold text-sky-300" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}

          {/* Botón MetaMask */}
          {account ? (
            <button
              onClick={disconnect}
              className="bg-white text-purple-700 px-4 py-2 rounded-full hover:bg-purple-100 transition"
              title={account}
            >
              {truncateAddress(account)} (Desconectar)
            </button>
          ) : (
            <button
              onClick={connectMetaMask}
              className="bg-purple-500 px-4 py-2 rounded-full hover:bg-purple-600 transition"
            >
              Conectar MetaMask
            </button>
          )}
        </nav>
      </header>

      {/* Barra de navegación inferior para móviles */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-700 shadow-[0_-2px_6px_rgba(0,0,0,0.25)] md:hidden z-50 rounded-t-xl">
        <ul className="flex justify-around items-center py-2 px-1 text-white">
          {navItems.map((item) => {
            const isActive = pathname === item.path;

            return (
              <li key={item.name} className="flex flex-col items-center text-xs">
                <Link
                  href={item.path}
                  className={`flex flex-col items-center transition-all duration-300 ${
                    isActive ? "text-violet-600 scale-105 font-medium" : "text-gray-400 hover:text-violet-500"
                  }`}
                >
                  <i className={`${item.icon} text-2xl mb-1`} />
                  <span className="text-[11px]">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mensaje de error */}
      {error && (
        <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 bg-red-600 text-white rounded-lg px-4 py-2 z-50">
          {error}
        </div>
      )}
    </>
  );
};
