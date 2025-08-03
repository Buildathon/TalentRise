import { useState } from "react";

type Following = {
  id: number;
  name: string;
  username: string;
  followers: string; // e.g. "45.2M"
  posts: number;
  price: string; // e.g. "$2.45"
  change: string; // e.g. "+12.5%"
  avatar: string;
  category: "Música" | "Arte" | "Deportes";
};

const followingData: Following[] = [
  {
    id: 1,
    name: "Bad Bunny",
    username: "badbunny",
    followers: "45.2M",
    posts: 1200,
    price: "$2.45",
    change: "+12.5%",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    category: "Música",
  },
  {
    id: 2,
    name: "Shakira",
    username: "shakira",
    followers: "38.7M",
    posts: 890,
    price: "$1.89",
    change: "+8.3%",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    category: "Música",
  },
  {
    id: 3,
    name: "Taylor Swift",
    username: "taylorswift",
    followers: "35.1M",
    posts: 756,
    price: "$3.12",
    change: "+15.2%",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    category: "Música",
  },
  {
    id: 4,
    name: "Beyoncé",
    username: "beyonce",
    followers: "32.8M",
    posts: 543,
    price: "$2.78",
    change: "+9.7%",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    category: "Música",
  },
  {
    id: 5,
    name: "Drake",
    username: "drake",
    followers: "28.9M",
    posts: 432,
    price: "$1.95",
    change: "-2.1%",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
    category: "Música",
  },
];

const FollowingPage = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    "Todos" | "Música" | "Arte" | "Deportes"
  >("Todos");

  const filteredFollowing = followingData.filter((f) => {
    const matchesSearch =
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.username.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = selectedCategory === "Todos" ? true : f.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-gradient-to-r from-purple-700 to-indigo-800 p-6 text-white flex flex-col items-center">
      <section className="max-w-md w-full flex flex-col">
        <h1 className="text-4xl font-bold mb-6 text-center drop-shadow-lg flex justify-center items-center space-x-3">
          <i className="bx bx-user-check text-4xl"></i>
          <span>Ranking</span>
        </h1>

        {/* Filtros categoría */}
        <nav className="flex justify-center mb-6 space-x-2 overflow-x-auto scrollbar-hide px-1">
          {["Todos", "Música", "Arte", "Deportes"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat as any)}
              className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition
                ${
                  selectedCategory === cat
                    ? "bg-white text-purple-700 shadow-lg"
                    : "bg-purple-600 hover:bg-purple-700 text-white"
                }`}
            >
              {cat}
            </button>
          ))}
        </nav>

        {/* Buscador */}
        <input
          type="text"
          placeholder="Search people..."
          className="w-full p-3 mb-6 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Lista con scroll */}
        <ul
          className="space-y-5 overflow-y-auto max-h-[480px] pr-2"
          style={{ scrollbarWidth: "thin" /* Firefox */, scrollbarColor: "#8b5cf6 transparent" }}
        >
          {filteredFollowing.length === 0 ? (
            <p className="text-center text-gray-300">No matches found.</p>
          ) : (
            filteredFollowing.map(({ id, name, username, followers, posts, price, change, avatar }) => (
              <li
                key={id}
                className="flex items-center bg-[#2a2a2a] rounded-xl shadow-lg p-5 space-x-5
                  hover:shadow-purple-500/50 hover:-translate-y-1 transition-transform duration-300 cursor-pointer"
              >
                {/* Número redondeado */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-500 text-white font-bold text-lg select-none">
                  {id}
                </div>

                {/* Imagen y texto */}
                <img
                  src={avatar}
                  alt={name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-purple-400"
                />

                <div className="flex-grow">
                  <p className="text-xl font-semibold">{name}</p>
                  <p className="text-purple-300">@{username}</p>
                </div>

                {/* Datos a la derecha */}
                <div className="flex flex-col items-end space-y-1 text-sm text-gray-300 min-w-[140px]">
                  <p>
                    <strong>{followers}</strong> seguidores • <strong>{posts.toLocaleString()}</strong> posts
                  </p>
                  <p className="text-lg font-semibold">
                    <span>{price}</span>{" "}
                    <span className={change.startsWith("+") ? "text-green-400" : "text-red-400"}>
                      {change}
                    </span>
                  </p>
                </div>
              </li>
            ))
          )}
        </ul>
      </section>
    </main>
  );
};

export default FollowingPage;
