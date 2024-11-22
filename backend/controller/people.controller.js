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
      .json({ message: "Person created successfully", data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePeople = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, address } = req.body;
  try {
    const result = await pool.query(
      "UPDATE people SET first_name = $1, last_name = $2, address = $3 WHERE id = $4 RETURNING *",
      [first_name, last_name, address, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Person not found" });
    }

    res
      .status(200)
      .json({ message: "Person updated successfully", data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
