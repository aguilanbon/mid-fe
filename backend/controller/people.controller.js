import pool from "../config/db.js";

export const fetchPeople = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM people");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createPerson = async (req, res) => {
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

export const updatePerson = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, address } = req.body;
  try {
    const result = await pool.query(
      "UPDATE people SET first_name = $1, last_name = $2, address = $3 WHERE id = $4 RETURNING *",
      [first_name, last_name, address, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Person not found" });
    }

    res
      .status(201)
      .json({ message: "Person updated successfully", data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deletePerson = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM people WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Person not found" });
    }
    res
      .status(201)
      .json({ message: "Person deleted successfully", data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const findPerson = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM people WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Person not found" });
    }
    res.status(201).json({ message: "Success", data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
