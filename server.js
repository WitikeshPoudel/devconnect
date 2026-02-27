const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Temporary in-memory storage
let users = [];

// ✅ GET all users
app.get("/users", (req, res) => {
  console.log("Fetching Users:", users);
  res.json(users);
});

// ✅ POST new user
app.post("/data", (req, res) => {
  const { name, age } = req.body;

  if (!name || !age) {
    return res.status(400).json({ message: "Name and age required" });
  }

  const newUser = {
    id: Date.now(),
    name,
    age
  };

  users.push(newUser);

  console.log("User Added:", newUser);
  console.log("Current Users:", users);

  res.status(201).json(newUser);
});


app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);

  users = users.filter(user => user.id !== id);

  console.log("User Deleted:", id);
  console.log("Current Users:", users);

  res.json({ message: "User deleted" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});