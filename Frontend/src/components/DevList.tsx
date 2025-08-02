import { useState } from 'react';

type Talento = {
  id: number;
  nombre_completo: string;
  username: string;
  fotografia: string;
  sobre_ti: string;
  tiempo_publicacion: string; // Ej: "Hace 5 horas"
  me_gustas: number;
  comentarios: number;
  post_texto: string;
  post_foto?: string; // foto del post (opcional)
};

const talentosData: Talento[] = [
  {
    id: 1,
    nombre_completo: "Carlos López",
    username: "carlos_lopez_art",
    fotografia: "https://randomuser.me/api/portraits/men/32.jpg",
    sobre_ti: "Artista visual, amante del color y la expresión.",
    tiempo_publicacion: "Hace 5 horas",
    me_gustas: 987,
    comentarios: 32,
    post_texto: 'Proceso creativo de mi última obra "Sueños de Color"',
    post_foto:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    nombre_completo: "Ana María Torres",
    username: "ana_m_torres",
    fotografia: "https://randomuser.me/api/portraits/women/45.jpg",
    sobre_ti: "Pintora y muralista",
    tiempo_publicacion: "Hace 3 horas",
    me_gustas: 654,
    comentarios: 20,
    post_texto: "Explorando nuevas técnicas digitales para complementar mi arte tradicional.",
    post_foto:
      "https://images.unsplash.com/photo-1487412912498-0447578fcca8?auto=format&fit=crop&w=600&q=80",
  },
  // más perfiles...
];

const RedSocial = () => {
  const [search, setSearch] = useState("");

  // Filtrar talentos por búsqueda
  const filteredTalentos = talentosData.filter(
    (talento) =>
      talento.nombre_completo.toLowerCase().includes(search.toLowerCase()) ||
      talento.username.toLowerCase().includes(search.toLowerCase()) ||
      talento.post_texto.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto p-4 bg-[#0A0A0A] min-h-screen text-white">
      <input
        type="text"
        placeholder="Buscar talento, username o contenido..."
        className="w-full p-3 rounded-md mb-6 text-black"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="space-y-6">
        {filteredTalentos.length === 0 && (
          <p className="text-center text-gray-400">No se encontraron resultados.</p>
        )}

        {filteredTalentos.map((talento) => (
          <article
            key={talento.id}
            className="bg-[#121212] rounded-lg shadow-md p-5 flex flex-col space-y-4"
          >
            {/* Header: Foto + Nombre + Username + Tiempo */}
            <header className="flex items-center space-x-4">
              <img
                src={talento.fotografia}
                alt={talento.nombre_completo}
                className="w-14 h-14 rounded-full object-cover border-2 border-indigo-600"
              />
              <div>
                <p className="font-semibold text-lg">{talento.nombre_completo}</p>
                <p className="text-indigo-400 text-sm">@{talento.username}</p>
                <p className="text-gray-400 text-xs">{talento.tiempo_publicacion}</p>
              </div>
              <button className="ml-auto text-gray-400 hover:text-white">⋯</button>
            </header>

            {/* Contenido del post */}
            <p className="text-white">{talento.post_texto}</p>

            {/* Imagen del post, si existe */}
            {talento.post_foto && (
              <img
                src={talento.post_foto}
                alt={`Post de ${talento.username}`}
                className="rounded-md mt-2 max-h-80 w-full object-cover"
              />
            )}

            {/* Footer: Likes y comentarios */}
            <footer className="flex items-center space-x-6 text-gray-400 text-sm">
              <button className="flex items-center space-x-1 hover:text-pink-500 transition">
                <span className="text-xl">♡</span>
                <span>{talento.me_gustas.toLocaleString()} me gustas</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-blue-400 transition">
                <span className="text-xl">🗨</span>
                <span>{talento.comentarios} comentarios</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-green-400 transition">
                <span className="text-xl">↷</span>
                <span>Compartir</span>
              </button>
            </footer>

            {/* Comentario input simulado */}
            <div className="border-t border-gray-700 pt-3">
              <input
                type="text"
                placeholder="Añade un comentario..."
                className="w-full rounded-md p-2 bg-[#1E1E1E] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default RedSocial;
