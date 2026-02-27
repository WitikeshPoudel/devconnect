import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

// Fetch users
const loadUsers = () => {
  fetch(`${import.meta.env.VITE_API_URL}/users`)
    .then(res => res.json())
    .then(data => setUsers(data));
};

useEffect(() => {
  loadUsers();
}, []);

  // Add user
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, age })
    })
      .then(() => {
        setName("");
        setAge("");
        loadUsers();
      });
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
        <input
          type="number"
          placeholder="Enter age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <button type="submit">Add User</button>
      </form>

      <hr />

      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        users.map(user => (
          <div key={user.id}>
            {user.name} - Age: {user.age}
          </div>
        ))
      )}
    </div>
  );
}

export default App;