export const validateTask = (req, res, next) => {
  const { title, description, completed } = req.body;
  if (!title || !description || completed === undefined) {
    return res.status(400).json({ error: "All fields are required" });
  }
  next();
};
