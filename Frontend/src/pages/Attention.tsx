import { useEffect, useState } from 'react';
import attentionData from '../data/attention.json';  // Importa el JSON con los datos

// Tipar el estado para que coincida con la estructura del JSON
import { AttentionData } from '../types/attention';

const HorarioAtencion = ({
  dia,
  hora,
  encargado,
  notas
}: {
  dia: string;
  hora: string;
  encargado: string;
  notas: string;
}) => (
  <div className="mx-auto p-8 rounded-xl shadow-2xl">
    <div className="flex items-center space-x-2">
      <i className="bx bx-calendar text-lg text-gray-600 dark:text-gray-300"></i>
      <p className="text-gray-800 dark:text-gray-300 font-medium">{dia}</p>
    </div>
    <div className="text-gray-700 dark:text-gray-300">
      <p className="font-semibold">{hora}</p>
      <p><strong>{encargado}</strong> - Encargado de Núcleo Linux</p>
      <p className="text-gray-500 dark:text-gray-400 text-sm">{notas}</p> {/* Mostramos las notas del horario */}
    </div>
  </div>
);

const Attention = () => {
  const [contact, setContact] = useState<AttentionData | null>(null);

  useEffect(() => {
    // Asignamos los datos del JSON al estado del componente
    setContact(attentionData);
  }, []);

  if (!contact) return <div className="text-center text-gray-500 dark:text-gray-300">Cargando...</div>;  // Cargando más estilizado

  const { location, officeHours } = contact;  // Desestructuración para mayor claridad

  return (
<div className="mx-auto p-8  rounded-xl shadow-2xl">
      {/* Mapa de Google */}
      <div className="bg-white p-2 rounded-lg shadow-lg  text-black dark:bg-[#3d2a3b] dark:text-white">
          {/* Título y descripción */}
  <div className="text-center mb-8">
    <h2 className="text-4xl font-semibold text-black dark:text-white mb-4">{location.title}</h2>
    <p className="text-lg text-gray-700 dark:text-gray-300">
      {location.description}
    </p>
  </div>
        {/* Mapa Embed de Google */}
        <div className="w-full h-64 bg-gray-600 rounded-md mb-4">
          <iframe
            src={location.mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
          ></iframe>
        </div>

        {/* Dirección */}
        <div className="mb-6">
          <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Dirección:</h4>
          <p className="text-gray-600 dark:text-gray-300">
            {location.addressDetails.street}, {location.addressDetails.city}, {location.addressDetails.state}, {location.addressDetails.country} - {location.addressDetails.zipCode}
          </p>
        </div>
      </div>

      {/* Horarios de Atención */}
      <div className="p-8 rounded-lg shadow-lg mt-10 text-black dark:bg-[#3d2a3b] dark:text-white">
        {/* Horarios */}
        <div className="space-y-4">
          <h2 className="text-4xl font-semibold text-black dark:text-white mb-4 text-center">
              <i className="bx bx-time text-3xl mr-3"></i>
            Horario de Atención</h2> {/* Centrado y el nuevo tamaño */}
          
          {/* Usar el componente HorarioAtencion */}
          {officeHours.map((item, index) => (
            <HorarioAtencion
              key={index}
              dia={item.day}
              hora={item.time}
              encargado={item.inCharge}
              notas={item.notes}  // Añadimos las notas del horario
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Attention;
