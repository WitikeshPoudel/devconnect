import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [users, setUsers] = useState([]);

  const addUser = () => {
    if (!name || !age) return;

    setUsers([...users, { name, age }]);
    setName("");
    setAge("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-slate-900 to-black flex items-center justify-center p-6">

      {/* Main Card */}
      <div className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 text-white">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🚀</div>
          <h1 className="text-3xl font-bold tracking-wide">
            DevConnect
          </h1>
          <p className="text-sm text-gray-300 mt-1">
            Professional User Manager
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">

          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-300"
          />

          <input
            type="number"
            placeholder="Enter age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-300"
          />

          <button
            onClick={addUser}
            className="w-full py-3 rounded-xl font-semibold bg-indigo-600 hover:bg-indigo-500 transition duration-300 shadow-lg hover:shadow-indigo-500/40"
          >
            Add User
          </button>
        </div>

        {/* Users List */}
        <div className="mt-8 space-y-4">
          {users.map((user, index) => (
            <div
              key={index}
              className="bg-white/20 border border-white/20 rounded-xl p-4 flex justify-between items-center hover:bg-white/30 transition duration-300"
            >
              <div>
                <h2 className="font-semibold text-lg">
                  {user.name}
                </h2>
                <p className="text-sm text-gray-300">
                  Age: {user.age}
                </p>
              </div>

              <button className="text-red-400 hover:text-red-300 text-sm">
                Delete
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}