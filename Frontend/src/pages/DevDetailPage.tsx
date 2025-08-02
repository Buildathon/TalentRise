// src/pages/DevDetailPage.tsx
import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import devsData from "../data/cv.json";
import { Dev } from "../types/cv";

const DevDetailPage = () => {
  const [_, params] = useRoute<{ id: string }>("/dev/:id");
  const [dev, setDev] = useState<Dev | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!params?.id) {
      setError("ID de desarrollador no proporcionado");
      setLoading(false);
      return;
    }

    const idNumber = Number(params.id);
    if (isNaN(idNumber)) {
      setError("ID de desarrollador inválido");
      setLoading(false);
      return;
    }

    const devFound = devsData.find((d) => d.id === idNumber);
    if (devFound) {
      setDev(devFound as Dev); // Asegúrate de tipar devFound como Dev
    } else {
      setError("Desarrollador no encontrado");
    }
    setLoading(false);
  }, [params?.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-clientLightPrimary dark:border-clientDarkPrimary"></div>
        <span className="ml-4 text-gray-500">Cargando...</span>
      </div>
    );
  }

  if (error || !dev) {
    return <p className="text-center text-red-500 font-semibold">{error}</p>;
  }

  return (
    <div className="mx-auto p-6 sm:p-8 max-w-4xl rounded-lg shadow-lg relative overflow-hidden">
      {/* Sección 1: Imagen y Datos Personales */}
      <div className="flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-8 mb-8 p-6 rounded-lg bg-gradient-to-r from-blue-500 via-teal-500 to-indigo-500 text-white dark:bg-gradient-to-r dark:from-indigo-600 dark:via-teal-500 dark:to-blue-500 shadow-xl transform ease-in-out">
        <img
          src={dev.fotografia || "https://nlbol.github.io/uagrm//logo/logo.png"}
          alt={`Fotografía de ${dev.nombre_completo}`}
          className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-700 shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
        />

        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-bold">{dev.nombre_completo}</h1>
          <p className="text-lg mt-2">{dev.ocupacion_actual}</p>
        </div>
      </div>

      {/* Sección 2: Biografía */}
      <section className="mb-6">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Sobre mí</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">{dev.sobre_ti}</p>
      </section>

      {/* Sección 3: Información Académica y Trabajo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        {/* Estudios */}
        <section className="space-y-2 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg transform ease-in-out">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Estudios</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {dev.estudios.carrera} - {dev.estudios.universidad}
          </p>
        </section>

        {/* Trabajo Actual */}
        <section className="space-y-2 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg transform ease-in-out">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Trabajo Actual</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {dev.trabajo.cargo} en {dev.trabajo.empresa}
          </p>
        </section>
      </div>

      {/* Sección 4: Áreas de Colaboración y Experiencia */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
        <section className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg transform ease-in-out">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Áreas de Colaboración</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
            {dev.area_colaboracion.map((area, index) => (
              <li key={index}>{area}</li>
            ))}
          </ul>
        </section>

        <section className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg transform ease-in-out">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Áreas de Experiencia</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
            {dev.experiencia_areas.map((area, index) => (
              <li key={index}>{area}</li>
            ))}
          </ul>
        </section>
      </div>

      {/* Sección 5: Habilidades y Herramientas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
        <section className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg transform ease-in-out">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Habilidades Blandas</h2>
          <div className="flex flex-wrap gap-4">
            {dev.habilidades_blandas.map((habilidad, index) => (
              <span
                key={index}
                className="px-4 py-2 text-sm font-medium bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
              >
                {habilidad}
              </span>
            ))}
          </div>
        </section>

        <section className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg transform ease-in-out">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Herramientas y Tecnologías</h2>
          <div className="flex flex-wrap gap-4">
            {dev.herramientas_tecnologias.map((tech, index) => (
              <div
                key={index}
                className="px-4 py-2 bg-gray-300 text-sm text-gray-700 rounded-md hover:bg-gray-400 transition duration-300"
              >
                {tech}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Sección 6: Redes Sociales y Disponibilidad */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
        <section className="space-y-6 p-6 rounded-lg shadow-md bg-gray-100 dark:bg-gray-800 transform ease-in-out">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-3">
            <i className="bx bx-calendar text-2xl text-indigo-500"></i> Días Disponibles
          </h2>
          <ul className="list-none space-y-3">
            {dev.dias_disponibles.map((dia, index) => (
              <li key={index} className="flex items-center text-gray-600 dark:text-gray-300 text-lg">
                <i className="bx bx-check-circle text-green-500 mr-3 text-xl"></i>
                {dia}
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-6 p-6 rounded-lg shadow-md bg-gray-100 dark:bg-gray-800 transform ease-in-out">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-3">
            <i className="bx bx-time text-2xl text-indigo-500"></i> Horarios Disponibles
          </h2>
          <p className="flex items-center gap-3 text-gray-600 dark:text-gray-300 text-lg">
            <i className="bx bx-alarm text-yellow-500 text-xl"></i>
            {dev.horarios_disponibles}
          </p>
        </section>
      </div>

      {/* Sección 7: Redes Sociales */}
      <div className="mt-4 w-full">
        <div className="flex justify-center gap-4 mt-2 flex-wrap">
          {dev.links.instagram && (
            <a
              href={dev.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#32B596] text-2xl hover:opacity-80 transition-transform duration-200 hover:scale-110"
            >
              <i className="bx bxl-instagram"></i>
            </a>
          )}
          {dev.links.linkedin && (
            <a
              href={dev.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#32B596] text-2xl hover:opacity-80 transition-transform duration-200 hover:scale-110"
            >
              <i className="bx bxl-linkedin"></i>
            </a>
          )}
          {dev.links.facebook && (
            <a
              href={dev.links.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#32B596] text-2xl hover:opacity-80 transition-transform duration-200 hover:scale-110"
            >
              <i className="bx bxl-facebook"></i>
            </a>
          )}
          {dev.links.x && (
            <a
              href={dev.links.x}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#32B596] text-2xl hover:opacity-80 transition-transform duration-200 hover:scale-110"
            >
              <i className="bx bxl-twitter"></i>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default DevDetailPage;