const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Temporary in-memory storage
let users = [];

// GET all users
app.get("/users", (req, res) => {
  res.json(users);
});

// POST new user
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

  res.status(201).json(newUser);
});

// DELETE user
app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter(user => user.id !== id);
  res.json({ message: "User deleted" });
});

// ✅ ONLY ONE PORT declaration
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});