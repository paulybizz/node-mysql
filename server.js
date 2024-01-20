// Imports
import express from "express";
import cors from "cors";
import db from "./database.js";

// ========== Setup ========== //

// Create Express app
const server = express();
const PORT = process.env.PORT || 3000;

// Configure middleware
server.use(express.json()); // to parse JSON bodies
server.use(cors()); // Enable CORS for all routes

// ========== Routes ========== //

// Root route
server.get("/", async (req, res) => {
    // Check database connection
    const result = await db.ping();

    if (result) {
        res.send("Node.js REST API with Express.js - connected to database");
    } else {
        res.status(500).send("Error connecting to database");
    }
});

// Get all users route (GET /users)
server.get("/users", async (req, res) => {
    const query = "SELECT * FROM users"; // SQL query
    const [users] = await db.query(query); // Execute query
    res.json(users); // Send result as JSON
});

// Get user by id route (GET /users/:id)
server.get("/users/:id", async (req, res) => {
    const id = req.params.id; // Get id from URL params
    const query = "SELECT * FROM users WHERE id = ?"; // SQL query
    const values = [id]; // Values to pass into query
    const [users] = await db.query(query, values); // Execute query
    res.json(users[0]); // Send result as JSON
});

// Create user route (POST /users)
server.post("/users", async (req, res) => {
    const user = req.body; // Get user data from request body
    const query = "INSERT INTO users (name, mail, title, image) VALUES (?, ?, ?, ?)"; // SQL query
    const values = [user.name, user.mail, user.title, user.image]; // Values to pass into query
    const [result] = await db.query(query, values); // Execute query
    res.json({ id: result.insertId }); // Send result as JSON
});

// Update user route (PUT /users/:id)
server.put("/users/:id", async (req, res) => {
    const id = req.params.id; // Get id from URL params
    const user = req.body; // Get user data from request body
    const query =
        "UPDATE users SET name = ?, mail = ?, title = ?, image = ? WHERE id = ?"; // SQL query
    const values = [user.name, user.mail, user.title, user.image, id]; // Values to pass into query
    const [result] = await db.query(query, values); // Execute query
    res.json(result); // Send result as JSON
});

// Delete user route (DELETE /users/:id)
server.delete("/users/:id", async (req, res) => {
    const id = req.params.id; // Get id from URL params
    const query = "DELETE FROM users WHERE id = ?"; // SQL query
    const values = [id]; // Values to pass into query
    const [result] = await db.query(query, values); // Execute query
    res.json(result); // Send result as JSON
});

// Start server on port 3000
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
