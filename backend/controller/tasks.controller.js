import pool from "../config/db.js";

export const fetchTasks = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tasks");
    res.status(200).json({
      message: "Tasks fetched successfully",
      error: false,
      data: result.rows,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      error: true,
      data: null,
    });
  }
};

export const createTask = async (req, res) => {
  const { title, description, completed } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO tasks (title, description, completed) VALUES ($1, $2, $3) RETURNING *",
      [title, description, completed]
    );
    res.status(201).json({
      message: "Task created successfully",
      error: false,
      data: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      error: true,
      data: null,
    });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  try {
    const result = await pool.query(
      "UPDATE tasks SET title = $1, description = $2, completed = $3 WHERE id = $4 RETURNING *",
      [title, description, completed, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Task with specified ID does not exist",
        error: true,
        data: null,
      });
    }

    res.status(200).json({
      message: "Task updated successfully",
      error: false,
      data: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      error: true,
      data: null,
    });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM tasks WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Task with specified ID does not exist",
        error: true,
        data: null,
      });
    }
    res.status(200).json({
      message: "Task deleted successfully",
      error: false,
      data: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      error: true,
      data: null,
    });
  }
};

export const findTask = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Task with specified ID does not exist",
        error: true,
        data: null,
      });
    }
    res.status(200).json({
      message: "Task fetched successfully",
      error: false,
      data: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      error: true,
      data: null,
    });
  }
};
