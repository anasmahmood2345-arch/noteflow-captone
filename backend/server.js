const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const authMiddleware = require("./middleware/authMiddleware");

const PORT = 3000;

app.use(express.json());
app.use(cors());
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Notes routes
const notesRouter = require("./routes/notes");
const authRouter = require("./routes/auth");
app.use("/api/notes", authMiddleware, notesRouter);
app.use("/api/auth", authRouter);
// Home route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to NoteFlow API"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});