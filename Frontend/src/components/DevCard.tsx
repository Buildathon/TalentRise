import { useState, useEffect, useCallback } from "react";
import { Dev } from "../types.ts";

const DevCard = ({ dev }: { dev: Dev }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = dev.fotografia;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(false);
  }, [dev.fotografia]);

  const handleSeeDetails = useCallback(() => {
    window.location.href = `/dev/${dev.id}`;
  }, [dev.id]);

  return (
    <div className="w-full max-w-md mx-auto bg-clientLightPrimary dark:bg-clientDarkPrimary p-6 rounded-2xl shadow-xl relative overflow-hidden border border-gray-300 dark:border-gray-700">
      {/* Elementos decorativos estilo código </> */}
      <span className="absolute top-4 left-4 text-gray-300 dark:text-gray-600 text-2xl font-bold opacity-50">
        {"</>"}
      </span>
      <span className="absolute bottom-4 right-4 text-gray-300 dark:text-gray-600 text-2xl font-bold opacity-50">
        {"</>"}
      </span>
      <span className="absolute top-6 right-6 text-gray-300 dark:text-gray-600 text-xl opacity-40">
        ✹
      </span>
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-200 dark:text-gray-700 text-7xl font-extrabold opacity-20">
        ★
      </span>

      <div className="relative flex flex-col items-center text-gray-900 dark:text-white">
        <img
          className="w-24 h-24 object-cover rounded-full border-4 border-gray-300 dark:border-gray-700 shadow-xl  hover:border-[#32B596]"
          src={imageLoaded ? dev.fotografia : "https://nlbol.github.io/uagrm/logo.jpg"}
          alt={dev.nombre_completo || "Foto de perfil"}
        />

      <h5 className="text-base font-bold mt-3">
  {dev.nombre_completo
    .split(" ")  // Divide el nombre completo en palabras
    .slice(0, 3) // Limita a las primeras 3 palabras
    .join(" ")   // Junta las palabras nuevamente en un solo string
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase())}
</h5>

        <span className="text-xs text-gray-600 dark:text-gray-400">
          {dev.ocupacion_actual}
        </span>

      <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 text-center px-4">
        {dev.sobre_ti.length > 100 ? `${dev.sobre_ti.slice(0, 90)}...` : dev.sobre_ti}
      </p>

      </div>

<div className="mt-4 w-full text-gray-900 dark:text-white">
  <h6 className="text-sm font-semibold">Skills Tech:</h6>
  <div className="flex flex-wrap gap-2 mt-2">
    {dev.herramientas_tecnologias.slice(0, 3).map((tech, index) => (  // Limitar a 5 elementos
      <span
        key={index}
        className="px-2 py-1 text-xs font-medium text-white bg-[#32B596] rounded-md dark:bg-gray-700"
      >
        {tech}
      </span>
    ))}
    {dev.herramientas_tecnologias.length > 5 && (  // Mostrar "..." si hay más de 5 elementos
      <span className="px-2 py-1 text-xs font-medium text-white bg-gray-400 rounded-md dark:bg-gray-700">
        ...
      </span>
    )}
  </div>
</div>


      <div className="mt-4 w-full text-gray-900 dark:text-white">
        <div className="flex justify-center gap-4 mt-2">
          {dev.links.instagram && (
            <a
              href={dev.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#32B596] text-xl hover:opacity-80"
            >
              <i className="bx bxl-instagram"></i>
            </a>
          )}
          {dev.links.linkedin && (
            <a
              href={dev.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#32B596] text-xl hover:opacity-80"
            >
              <i className="bx bxl-linkedin"></i>
            </a>
          )}
          {dev.links.facebook && (
            <a
              href={dev.links.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#32B596] text-xl hover:opacity-80"
            >
              <i className="bx bxl-facebook"></i>
            </a>
          )}
          {dev.links.x && (
            <a
              href={dev.links.x}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#32B596] text-xl hover:opacity-80"
            >
              <i className="bx bxl-twitter"></i>
            </a>
          )}
        </div>
      </div>

      <button
        onClick={handleSeeDetails}
        className="mt-6 w-full py-2 bg-[#32B596] text-white font-bold rounded-lg shadow-md hover:bg-[#2A9C85] transition"
      >
        Ver Más
      </button>
    </div>
  );
};

export default DevCard;
