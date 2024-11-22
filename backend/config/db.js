import pkg from "pg";
import dotenv from "dotenv";
const { Pool } = pkg;

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export const initDatabase = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const result = await pool.query("SELECT COUNT(*) FROM tasks");

    const count = parseInt(result.rows[0].count, 10);
    if (count === 0) {
      const randomData = [
        {
          title: "Read",
          description: "do reading",
          completed: false,
        },
        { title: "Write", description: "do writing", completed: false },
        { title: "Delete", description: "do deleting", completed: false },
      ];

      for (const person of randomData) {
        await pool.query(
          "INSERT INTO tasks (title, description, completed) VALUES ($1, $2, $3)",
          [person.title, person.description, person.completed]
        );
        console.log("Inserted 3 tasks into the database");
      }
    }
  } catch (error) {
    console.error("Database initialization error:", error);
  }
};

export default pool;
