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
      CREATE TABLE IF NOT EXISTS people (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        address TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const result = await pool.query("SELECT COUNT(*) FROM people");

    const count = parseInt(result.rows[0].count, 10);
    if (count === 0) {
      const randomData = [
        {
          first_name: "Alice",
          last_name: "Johnson",
          address: "123 Elm Street",
        },
        { first_name: "Bob", last_name: "Smith", address: "456 Oak Avenue" },
        { first_name: "Charlie", last_name: "Brown", address: "789 Pine Road" },
      ];

      for (const person of randomData) {
        await pool.query(
          "INSERT INTO people (first_name, last_name, address) VALUES ($1, $2, $3)",
          [person.first_name, person.last_name, person.address]
        );
        console.log("Inserted 3 person into the database");
      }
    }
  } catch (error) {
    console.error("Database initialization error:", error);
  }
};

export default pool;
