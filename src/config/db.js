import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const MAX_RETRIES = 5;
const RETRY_DELAY = 2000;

const connectWithRetry = async () => {
  let retries = MAX_RETRIES;
  while (retries) {
    try {
      const client = await pool.connect();
      console.log("Successfully connected to database");
      client.release();
      return;
    } catch (err) {
      retries -= 1;
      console.log(`Failed to connect. Retries left: ${retries}`);
      if (!retries) throw err;
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
    }
  }
};

pool.on("connect", () => {
  console.log("New pool connection established");
});

export { pool, connectWithRetry };
