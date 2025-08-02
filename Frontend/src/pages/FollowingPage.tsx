import { useState } from "react";

type Following = {
  id: number;
  name: string;
  username: string;
  followers: string; // e.g. "45.2M"
  avatar: string;
};

const followingData: Following[] = [
  {
    id: 1,
    name: "Bad Bunny",
    username: "badbunny",
    followers: "45.2M",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    id: 2,
    name: "Shakira",
    username: "shakira",
    followers: "38.7M",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 3,
    name: "Taylor Swift",
    username: "taylorswift",
    followers: "35.1M",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 4,
    name: "Beyoncé",
    username: "beyonce",
    followers: "32.8M",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

const FollowingPage = () => {
  const [search, setSearch] = useState("");

  const filteredFollowing = followingData.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gradient-to-r from-purple-700 to-indigo-800 p-6 text-white">
      <section className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center drop-shadow-lg">
          Following
        </h1>

        <input
          type="text"
          placeholder="Search people..."
          className="w-full p-3 mb-8 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {filteredFollowing.length === 0 ? (
          <p className="text-center text-gray-300">No matches found.</p>
        ) : (
          <ul className="space-y-6">
            {filteredFollowing.map(({ id, name, username, followers, avatar }) => (
              <li
                key={id}
                className="flex items-center bg-[#1f1f1f] rounded-lg shadow-md p-4 space-x-4"
              >
                <img
                  src={avatar}
                  alt={name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-purple-500"
                />
                <div className="flex-grow">
                  <p className="text-xl font-semibold">{name}</p>
                  <p className="text-purple-300">@{username}</p>
                  <p className="text-gray-400 text-sm">{followers} followers</p>
                </div>
                <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md transition">
                  Benefits 🎁
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
