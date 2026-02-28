import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  const loadUsers = async () => {
    try {
      const res = await fetch(`${API_URL}/users`);
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, age })
      });

      setName("");
      setAge("");
      loadUsers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={backgroundStyle}>
      <div style={containerStyle}>
        <h1 style={titleStyle}>DevConnect Users 🚀</h1>

        <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={inputStyle}
          />

          <input
            type="number"
            placeholder="Enter age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            style={inputStyle}
          />

          <button style={buttonStyle}>Add User</button>
        </form>

        {users.length === 0 ? (
          <p style={{ textAlign: "center" }}>No users found</p>
        ) : (
          users.map((user) => (
            <div key={user._id} style={cardStyle}>
              <div>
                <strong>{user.name}</strong>
                <p style={{ margin: 0 }}>Age: {user.age}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const backgroundStyle = {
  minHeight: "100vh",
  background: "linear-gradient(to right, #141e30, #243b55)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const containerStyle = {
  background: "white",
  padding: "30px",
  borderRadius: "15px",
  width: "400px",
  boxShadow: "0 15px 30px rgba(0,0,0,0.2)"
};

const titleStyle = {
  textAlign: "center",
  marginBottom: "20px"
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc"
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#243b55",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer"
};

const cardStyle = {
  background: "#f1f5f9",
  padding: "12px",
  borderRadius: "8px",
  marginBottom: "10px"
};

export default App;