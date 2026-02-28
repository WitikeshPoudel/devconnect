require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 8080;

// =======================
// Middleware
// =======================

app.use(cors());
app.use(express.json());

// =======================
// MongoDB Connection
// =======================

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ Mongo Error:", err));

// =======================
// Schema & Model
// =======================

const TestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Test = mongoose.model("Test", TestSchema);

// =======================
// Routes
// =======================

// Home Route
app.get("/", (req, res) => {
  res.send("DevConnect Backend Running 🚀");
});

// Show HTML Form
app.get("/form", (req, res) => {
  res.send(`
    <h2>Add Name</h2>
    <form id="testForm">
      <input type="text" id="name" placeholder="Enter name" required />
      <button type="submit">Submit</button>
    </form>

    <script>
      const form = document.getElementById("testForm");

      form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value;

        const response = await fetch("/create-test", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ name })
        });

        const data = await response.json();
        alert("Saved: " + JSON.stringify(data));
      });
    </script>
  `);
});

// Create Data (POST)
app.post("/create-test", async (req, res) => {
  try {
    const { name } = req.body;

    const newData = await Test.create({ name });

    res.json(newData);
  } catch (error) {
    res.status(500).json({ error: "Failed to insert data" });
  }
});

// Get All Data
app.get("/get-tests", async (req, res) => {
  try {
    const allData = await Test.find();
    res.json(allData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// =======================
// Start Server
// =======================

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});