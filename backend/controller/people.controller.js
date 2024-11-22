import pool from "../config/db.js";

export const fetchPeople = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM people");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
