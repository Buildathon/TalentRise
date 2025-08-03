import { useState } from "react";

type Talento = {
  id: number;
  nombre_completo: string;
  username: string;
  fotografia: string;
  sobre_ti: string;
  seguidores: number;
  tokensRecaudados: number;
  hearts: number;
  recaudado: number;
  crecimientoPorc: number;
  tiempo_publicacion: string;
  me_gustas: number;
  comentarios: number;
  post_texto: string;
  post_foto?: string;
};

const talentosData: Talento[] = [
  {
    id: 1,
    nombre_completo: "Michael Dance",
    username: "dance_mike",
    fotografia: "https://randomuser.me/api/portraits/men/32.jpg",
    sobre_ti: "Bailarín",
    seguidores: 28400,
    tokensRecaudados: 1200,
    hearts: 2800,
    recaudado: 1150,
    crecimientoPorc: 38,
    tiempo_publicacion: "Hace 2 horas",
    me_gustas: 2800,
    comentarios: 142,
    post_texto: "Coreografía para el nuevo tema de Bad Bunny 💃🕺 ¿Qué opinan?",
    post_foto:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
  },
];

const formatNumber = (num: number) => {
  return num >= 1000 ? (num / 1000).toFixed(1) + "K" : num.toString();
};

const DevList = () => {
  const [comentarios, setComentarios] = useState<Record<number, string>>({});

  const handleComentarioChange = (id: number, value: string) => {
    setComentarios((prev) => ({ ...prev, [id]: value }));
  };

  const enviarComentario = (id: number) => {
    alert(`Comentario enviado: ${comentarios[id] || ""}`);
    setComentarios((prev) => ({ ...prev, [id]: "" }));
  };

  return (
    <div className="bg-black min-h-screen overflow-y-scroll snap-y snap-mandatory">
      {talentosData.map((talento) => (
        <article
          key={talento.id}
          className="relative h-screen w-full snap-start flex flex-col justify-end"
          style={{
            backgroundImage: `url(${talento.post_foto})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          {/* INFO PRINCIPAL */}
          <div className="relative z-10 p-6 max-w-md text-white space-y-3">
            <div className="flex items-center space-x-4">
              <img
                src={talento.fotografia}
                alt={talento.nombre_completo}
                className="w-14 h-14 rounded-full border-2 border-indigo-600 object-cover"
              />
              <div>
                <h2 className="font-bold text-xl">@{talento.username}</h2>
                <p className="text-indigo-400 text-sm">{talento.sobre_ti}</p>
                <p className="text-xs text-gray-300">
                  {formatNumber(talento.seguidores)} seguidores
                </p>
              </div>
            </div>

            {/* TEXTO POST */}
            <p className="text-white text-base">{talento.post_texto}</p>

            {/* ESTADÍSTICAS RESUMIDAS */}
            <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
              <div className="bg-white/10 p-3 rounded-lg text-center">
                <p className="text-xl font-bold text-yellow-400">
                  {formatNumber(talento.tokensRecaudados)}
                </p>
                <p className="text-gray-300">Tokens recaudados</p>
              </div>
              <div className="bg-white/10 p-3 rounded-lg text-center">
                <p className="text-xl font-bold text-pink-400">
                  {formatNumber(talento.hearts)}
                </p>
                <p className="text-gray-300">Hearts</p>
              </div>
              <div className="bg-white/10 p-3 rounded-lg text-center">
                <p className="text-xl font-bold text-green-300">
                  ${talento.recaudado.toLocaleString()}
                </p>
                <p className="text-gray-300">Recaudado</p>
              </div>
              <div className="bg-white/10 p-3 rounded-lg text-center">
                <p
                  className={`text-xl font-bold ${
                    talento.crecimientoPorc >= 0
                      ? "text-green-400"
                      : "text-red-500"
                  }`}
                >
                  {talento.crecimientoPorc >= 0 ? "+" : ""}
                  {talento.crecimientoPorc}%
                </p>
                <p className="text-gray-300">Crecimiento</p>
              </div>
            </div>

            {/* BOTONES TOKENIZAR & COMPARTIR */}
            <div className="flex space-x-4 mt-5">
              <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 transition rounded-full py-3 font-semibold">
                <i className="bx bx-share-alt mr-2"></i> Compartir
              </button>
              <button className="flex-1 bg-pink-600 hover:bg-pink-700 transition rounded-full py-3 font-semibold">
                <i className="bx bx-diamond mr-2"></i> Tokenizar
              </button>
            </div>
          </div>

          {/* BOTONES FLOTANTES (ICONOS) */}
          <div className="absolute right-4 bottom-36 flex flex-col items-center space-y-6 z-10 text-white text-2xl">
            <button className="hover:text-pink-500 transition">
              <i className="bx bxs-heart"></i>
              <div className="text-sm text-center">{formatNumber(talento.me_gustas)}</div>
            </button>
            <button className="hover:text-blue-400 transition">
              <i className="bx bxs-comment-dots"></i>
              <div className="text-sm text-center">{talento.comentarios}</div>
            </button>
            <button className="hover:text-green-400 transition">
              <i className="bx bx-share-alt"></i>
              <div className="text-sm text-center">Compartir</div>
            </button>
          </div>

          {/* COMENTARIO INPUT */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/70 z-10 flex space-x-3">
            <input
              type="text"
              placeholder="Añade un comentario..."
              className="flex-grow rounded-full p-3 bg-[#222] text-white placeholder-gray-400 focus:outline-none"
              value={comentarios[talento.id] || ""}
              onChange={(e) => handleComentarioChange(talento.id, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") enviarComentario(talento.id);
              }}
            />
            <button
              onClick={() => enviarComentario(talento.id)}
              className="bg-indigo-600 hover:bg-indigo-700 px-5 rounded-full font-semibold"
            >
              <i className="bx bx-send text-xl"></i>
            </button>
          </div>
        </article>
      ))}
    </div>
  );
};

export default DevList;
