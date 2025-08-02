const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-700 to-purple-800 text-white py-12 mt-10 shadow-inner">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Logo y descripción */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <a href="/" className="flex items-center space-x-3">
              <img src="/logo.svg" alt="TalentRise Logo" className="h-14" />
              <span className="text-2xl font-bold tracking-wide">TalentRise</span>
            </a>
            <p className="text-sm text-gray-300 max-w-xs text-center md:text-left leading-relaxed">
              Invierte en el talento del futuro. Conecta con creadores, artistas y emprendedores.
            </p>
          </div>

          {/* Navegación rápida */}
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <h3 className="text-white font-semibold mb-4 uppercase tracking-wider">Recursos</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="hover:underline hover:text-pink-300 transition-colors duration-300">
                    Eventos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline hover:text-pink-300 transition-colors duration-300">
                    Comunidad
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4 uppercase tracking-wider">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="hover:underline hover:text-pink-300 transition-colors duration-300">
                    Política de Privacidad
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline hover:text-pink-300 transition-colors duration-300">
                    Términos y Condiciones
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Redes sociales */}
          <div className="flex flex-col items-center md:items-end space-y-5">
            <h3 className="text-white font-semibold uppercase tracking-wider">Síguenos</h3>
            <div className="flex space-x-6 text-3xl">
              {[
                { href: "https://facebook.com/nucleolinuxuagrmsz", icon: "bxl-facebook", label: "Facebook" },
                { href: "#", icon: "bxl-instagram", label: "Instagram" },
                { href: "#", icon: "bxl-linkedin", label: "LinkedIn" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-white hover:text-pink-400 transition-transform transform hover:scale-110"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={`bx ${social.icon}`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        <hr className="border-t border-purple-600 my-8 opacity-60" />

        {/* Pie de página */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-300 font-medium tracking-wide">
          <span>© 2025 TalentRise. Todos los derechos reservados.</span>
          <span className="mt-3 sm:mt-0">Desarrollado por la comunidad 💜</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
