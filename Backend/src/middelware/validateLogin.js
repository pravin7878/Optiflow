const validateLogin = (req, res, next)=> {
    const { email, password } = req.body;
    const errors = [];

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      errors.push('Valid email is required.');
    }
    if (!password) {
      errors.push('Password is required.');
    }

    if (errors.length > 0) {
      return res.status(400).json({message :  errors[0] });
    }
    next();
  }

  module.exports = validateLogin