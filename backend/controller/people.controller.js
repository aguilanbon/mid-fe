import pool from "../config/db.js";

export const fetchPeople = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM people");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createPeople = async (req, res) => {
  const { first_name, last_name, address } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO people (first_name, last_name, address) VALUES ($1, $2, $3) RETURNING *",
      [first_name, last_name, address]
    );
    res
      .status(201)
      .json({ message: "People created successfully", data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
