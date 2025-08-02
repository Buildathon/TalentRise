import { useState, useEffect } from "react";
import { Dev } from "../types/types";

const BusinessCard = ({ dev }: { dev: Dev }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Efecto para manejar la carga de la imagen
  useEffect(() => {
    const img = new Image();
    img.src = dev.fotografia || "https://nlbol.github.io/uagrm/logo/logo.png"; // Imagen por defecto si no hay foto
    img.onload = () => setImageLoaded(true);
  }, [dev.fotografia]);

  return (
    <div className="w-[85mm] h-[55mm] bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col justify-between relative overflow-hidden">
      {/* Fondo con colores y figuras */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[rgba(2,190,165,255)] to-[rgba(67,133,246,255)] opacity-30 rounded-lg z-0">
        {/* Agregar ondas o formas de fondo */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 left-0 w-full h-20 z-0"
          viewBox="0 0 1440 320"
        >
          <path
            fill="rgba(30,232,182,255)"
            fillOpacity="1"
            d="M0,256L1440,128L1440,320L0,320Z"
          ></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 left-0 w-full h-16 z-0"
          viewBox="0 0 1440 320"
        >
          <path
            fill="rgba(79,194,248,255)"
            fillOpacity="1"
            d="M0,256L1440,128L1440,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Contenido de la tarjeta */}
      <div className="flex flex-col items-center z-10 space-y-0">
        {/* Imagen del Dev, con manejo de carga */}
        <div className="w-20 h-20 rounded-full overflow-hidden mb-0">
          {imageLoaded ? (
            <img
              src={dev.fotografia || "https://nlbol.github.io/uagrm//logo/logo.png"} // Imagen por defecto si no hay foto
              alt={dev.nombre_completo}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center text-xs">
              ...
            </div>
          )}
        </div>

        {/* Nombre y Cargo */}
        <h2 className="text-lg font-semibold text-[#000000] mb-1">
          {dev.nombre_completo
            .split(" ") // Divide el nombre completo en palabras
            .slice(0, 3) // Limita a las primeras 3 palabras
            .join(" ") // Junta las palabras nuevamente en un solo string
            .toLowerCase()
            .replace(/\b\w/g, (char) => char.toUpperCase())}
        </h2>


        {/* Skills Tech & Soft Skills */}
        <div className="text-xs text-[#00000] mb-4">
          <p className="text-[#000000] text-left">
            <strong>Skills Tech:</strong>{" "}
            {dev.herramientas_tecnologias?.slice(0, 3).join(", ") || "N/A"}
            {dev.herramientas_tecnologias?.length > 3 ? "..." : ""}
          </p>
          <p className="text-[#000000] text-left">
            <strong>Soft Skills:</strong>{" "}
            {dev.habilidades_blandas?.slice(0, 1).join(", ") || "N/A"}
          </p>

          {/* Contacto */}
          <p className="flex items-center justify-center text-[#00000]">
            <i className="bx bx-phone text-sm mr-2"></i>{" "}
            {/* Icono de teléfono */}
            {dev.numero_contacto || "N/A"}
          </p>
        </div>
      </div>

      {/* Logo de WTM */}
      <div className="absolute top-2 right-2 w-12 h-12 z-10">
        <img
          src="https://nlbol.github.io/uagrm//logo/logo.png"
          alt="WTM Logo"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Logo de GDG */}
      <div className="absolute top-2 left-2 w-12 h-12 z-10">
        <img
          src="https://nlbol.github.io/uagrm/logo/gdg.png"
          alt="GDG Logo"
          className="w-full h-full object-contain"
        />
      </div>

      {/* QR Code */}
              <div className="absolute bottom-4 right-4 w-12 h-12 z-0">
          {imageLoaded ? (
            <img
              src={dev.qr || "https://nlbol.github.io/uagrm//logo/logo.png"} // Imagen por defecto si no hay foto
              alt={dev.nombre_completo}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center text-xs">
              ...
            </div>
          )}
        </div>

    </div>
  );
};

export default BusinessCard;