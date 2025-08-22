const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")





const authenticateUser = async (req, res) => {
  const { email, password } = req.body;
  const SECRET_KEY = process.env.JWT_SECRET_KEY;
  try {
    if (!email) return res.status(400).json({ message: "email is required" })
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ message: "user not found! , Please register first" });
    if (!password) return res.status(400).json({ message: "password is required" });
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid){
      return res.status(401).json({ message: "Password is Wrong" });
    }
     

    const accessToken = jwt.sign(
      { userId: user._id, name: user.name, email: user.email },
      SECRET_KEY,
      { expiresIn: "1D" }
    );

    const represhToken = jwt.sign(
      { userId: user._id, name: user.name, email: user.email },
      SECRET_KEY,
      { expiresIn: "1W" }
    );



    res.json({
      message: "Login success",
      accessToken,
      represhToken,
      userId: user._id,
      name: user.name,
      role : user.role,
      email : user.email
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = {  authenticateUser };