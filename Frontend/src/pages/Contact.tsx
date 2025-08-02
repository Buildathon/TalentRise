import { useEffect, useState } from "react";
import contactData from "../data/contact.json"; // Importar datos del archivo JSON
import { ContactData } from "../types/contact"; // Importar el tipo definido

const Contact = () => {
  // Estado para almacenar los datos de contacto, con el tipo explícito
  const [contact, setContact] = useState<ContactData | null>(null);

  useEffect(() => {
    // Cargar los datos desde el JSON y asignarlos al estado
    setContact(contactData);
  }, []);

  if (!contact) return <div>Cargando...</div>; // Mostrar un mensaje mientras se cargan los datos

  return (
<div className="mx-auto p-8  rounded-xl shadow-2xl">
  {/* Título y descripción */}
  <div className="text-center mb-12">
    <h2 className="text-4xl font-semibold text-black dark:text-white mb-4">Contáctanos</h2>
    <p className="text-lg text-gray-700 dark:text-gray-300">
      Estamos aquí para resolver tus dudas. No dudes en ponerte en contacto con nosotros.
    </p>
  </div>

  <div className="grid md:grid-cols-2 gap-12">
    {/* Información de Contacto */}
    <div className="bg-white p-8 rounded-lg shadow-lg text-black dark:bg-[#2A3B47] dark:text-white">
      <h3 className="text-2xl font-semibold text-lila-500 dark:text-lila-400 mb-6">Información de Contacto</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        <strong className="text-gray-800 dark:text-white">Dirección:</strong> {contact.contactInfo.address}
      </p>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        <strong className="text-gray-800 dark:text-white">Teléfono:</strong> {contact.contactInfo.phone}
      </p>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        <strong className="text-gray-800 dark:text-white">Correo Electrónico:</strong> {contact.contactInfo.email}
      </p>

      {/* Redes sociales */}
      <div className="flex space-x-6 text-3xl text-gray-600 dark:text-gray-300">
        <a
          href={contact.socialLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600 transition-colors duration-300"
        >
          <i className="bx bxl-facebook"></i>
        </a>
        <a
          href={contact.socialLinks.twitter}
          rel="noopener noreferrer"
          className="hover:text-sky-500 transition-colors duration-300"
        >
          <i className="bx bxl-twitter"></i>
        </a>
        <a
          href={contact.socialLinks.instagram}
          rel="noopener noreferrer"
          className="hover:text-pink-600 transition-colors duration-300"
        >
          <i className="bx bxl-instagram"></i>
        </a>
      </div>
    </div>

    {/* Foto o ambiente */}
    <div className="bg-white p-8 rounded-lg shadow-lg text-black dark:bg-[#2A3B47] dark:text-white">
      <h3 className="text-2xl font-semibold text-lila-500 dark:text-lila-400 mb-6">{contact.visitTitle}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6">{contact.visitDescription}</p>

      {/* Imagen del lugar o ambiente */}
      <div className="w-full h-64 bg-gray-300 rounded-md mb-6">
        <img
          src={contact.image}
          alt="Ambiente Núcleo Linux"
          className="w-full h-full object-cover rounded-md"
        />
      </div>
    </div>
  </div>
</div>

  );
};

export default Contact;
