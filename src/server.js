import express from "express";
import cors from "cors";
import "dotenv/config";
import pool from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import createUserTable from "./data/createUserTable.js";

const app = express();
const port = process.env.PORT || 3001;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", userRoutes);

// Error handling middleware
app.use(errorHandler);

// Create table before server starts
createUserTable();

// Test
app.get("/", async (req, res) => {
  const test = await pool.query("SELECT current_database()");
  res.send(test.rows[0].current_database);
});

// Server
app.listen(port, () => {
  console.log(`Server is up and running at http://localhost:${port}`);
});
