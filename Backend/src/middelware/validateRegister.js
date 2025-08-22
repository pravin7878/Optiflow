const validateRegisterBody = (req, res, next) => {
  const { name, email, password, role } = req.body;
  const errors = [];

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    errors.push("Name is required and should be a non-empty string.");
  }
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    errors.push("Valid email is required.");
  }
  if (!password || password.length < 6) {
    errors.push("Password should be at least 6 characters long.");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  next();
};

  module.exports = validateRegisterBody