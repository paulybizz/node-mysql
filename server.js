// Imports
import express from "express";
import cors from "cors";

// ========== Setup ========== //

// Create Express app
const server = express();
const PORT = process.env.PORT || 3000;

// Configure middleware
server.use(express.json()); // to parse JSON bodies
server.use(cors()); // Enable CORS for all routes

// ========== Routes ========== //

// Root route
server.get("/", (req, res) => {
    res.send("Node.js REST API with Express.js");
});

// Start server on port 3000
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
