import { useState } from "react";

type Following = {
  id: number;
  name: string;
  username: string;
  followers: string; // e.g. "45.2M"
  avatar: string;
  category: "Música" | "Arte" | "Deportes" | "Literatura"; // Categoría añadida
};

const followingData: Following[] = [
  {
    id: 1,
    name: "Bad Bunny",
    username: "badbunny",
    followers: "45.2M",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    category: "Música",
  },
  {
    id: 2,
    name: "Shakira",
    username: "shakira",
    followers: "38.7M",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    category: "Música",
  },
  {
    id: 3,
    name: "Taylor Swift",
    username: "taylorswift",
    followers: "35.1M",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    category: "Música",
  },
  {
    id: 4,
    name: "Beyoncé",
    username: "beyonce",
    followers: "32.8M",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    category: "Música",
  },
  {
    id: 5,
    name: "Frida Kahlo",
    username: "fridakahlo",
    followers: "10.5M",
    avatar: "https://randomuser.me/api/portraits/women/20.jpg",
    category: "Arte",
  },
  {
    id: 6,
    name: "Michael Jordan",
    username: "mj23",
    followers: "40.1M",
    avatar: "https://randomuser.me/api/portraits/men/15.jpg",
    category: "Deportes",
  },
  {
    id: 7,
    name: "Gabriel García Márquez",
    username: "ggmarquez",
    followers: "8.9M",
    avatar: "https://randomuser.me/api/portraits/men/30.jpg",
    category: "Literatura",
  },
];

const categories = ["Todos", "Música", "Arte", "Deportes", "Literatura"] as const;

const FollowingPage = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>("Todos");

  const filteredFollowing = followingData.filter((f) => {
    const matchesSearch =
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.username.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = selectedCategory === "Todos" ? true : f.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-gradient-to-r from-purple-700 to-indigo-800 p-6 text-white flex flex-col items-center">
      <section className="max-w-md w-full">
        <h1 className="text-4xl font-bold mb-6 text-center drop-shadow-lg flex justify-center items-center space-x-3">
          <i className="bx bx-user-check text-4xl"></i>
          <span>Following</span>
        </h1>

        {/* Filtros categoría */}
        <nav className="flex justify-center mb-6 space-x-2 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
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

        {/* Lista */}
        {filteredFollowing.length === 0 ? (
          <p className="text-center text-gray-300">No matches found.</p>
        ) : (
          <ul className="space-y-4">
            {filteredFollowing.map(({ id, name, username, followers, avatar }) => (
              <li
                key={id}
                className="flex items-center bg-[#1f1f1f] rounded-xl shadow-md p-4 space-x-4"
              >
                <img
                  src={avatar}
                  alt={name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-purple-500"
                />
                <div className="flex-grow">
                  <p className="text-lg font-semibold flex items-center space-x-2">
                    <span>{name}</span>
                    <i className="bx bx-star text-yellow-400"></i>
                  </p>
                  <p className="text-purple-300">@{username}</p>
                  <p className="text-gray-400 text-xs flex items-center space-x-1">
                    <i className="bx bx-user"></i>
                    <span>{followers} followers</span>
                  </p>
                </div>
                <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md transition text-sm font-medium flex items-center space-x-2">
                  <i className="bx bx-gift"></i>
                  <span>Benefits</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};

export default FollowingPage;
