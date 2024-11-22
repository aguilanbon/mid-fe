export const validatePerson = (req, res, next) => {
  const { first_name, last_name, address } = req.body;
  if (!first_name || !last_name || !address) {
    return res.status(400).json({ error: "All fields are required" });
  }
  next();
};
