import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

const navItems = [
  { name: "home", path: "/home", icon: "bx bx-home" },
  { name: "Perfil", path: "/perfil", icon: "bx bx-user" },
  { name: "Following", path: "/Following", icon: "bx bx-group" },
  { name: "Notificaciones", path: "/notificaciones", icon: "bx bx-bell" },
  { name: "Ajustes", path: "/ajustes", icon: "bx bx-cog" },
];

const Header = () => {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <Link href="/home" className="hover:text-sky-300 transition">home</Link>
          <Link href="/explorar" className="hover:text-sky-300 transition">Explorar</Link>
          <Link href="/portafolio" className="hover:text-sky-300 transition">Portafolio</Link>
          <Link href="/notificaciones" className="hover:text-sky-300 transition">Notificaciones</Link>
          <Link href="/contacto" className="hover:text-sky-300 transition">Contacto</Link>
          <Link href="/login" className="bg-white text-purple-700 px-4 py-2 rounded-full hover:bg-purple-100 transition">Iniciar sesión</Link>
          <Link href="/register" className="bg-purple-500 px-4 py-2 rounded-full hover:bg-purple-600 transition">Registrarse</Link>
        </nav>
      </header>

      {/* Barra de navegación inferior para móviles */}
<nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-200 shadow-[0_-2px_6px_rgba(0,0,0,0.05)] md:hidden z-50 rounded-t-xl">
      <ul className="flex justify-around items-center py-2 px-1 text-white">
        {navItems.map((item) => {
          const isActive = location === item.path;

          return (
            <li key={item.name} className="flex flex-col items-center text-xs">
              <Link
                href={item.path}
                className={`flex flex-col items-center transition-all duration-300 ${
                  isActive ? "text-violet-600 scale-105 font-medium" : "text-gray-500 hover:text-violet-500"
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
    </>
  );
};

export default Header;
