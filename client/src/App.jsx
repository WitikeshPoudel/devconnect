import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  // ================= LOAD USERS =================
  const loadUsers = () => {
    fetch(`${API_URL}/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // ================= ADD USER =================
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    })
      .then((res) => res.json())
      .then(() => {
        setName("");
        loadUsers();
      })
      .catch((err) => console.error("Error creating user:", err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>DevConnect Users</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">Add User</button>
      </form>

      <hr />

      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        users.map((user) => (
          <div key={user._id}>
            {user.name}
          </div>
        ))
      )}
    </div>
  );
}

export default App;