import express from "express";
import cors from "cors";
import "dotenv/config";
import { pool, connectWithRetry } from "./config/db.js";
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

// Test
app.get("/", async (req, res) => {
  const test = await pool.query("SELECT current_database()");
  res.send("Cureent database: " + test.rows[0].current_database);
});

// Initialize database and start server
const initializeApp = async () => {
  try {
    // First ensure database connection
    await connectWithRetry();

    // Then create tables
    await createUserTable();

    // Finally start the server
    app.listen(port, () => {
      console.log(`Server is up and running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to initialize application:", error);
    process.exit(1);
  }
};

initializeApp();
