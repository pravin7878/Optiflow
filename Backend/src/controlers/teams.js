const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const { sendMail } = require("../services/mailService");
const { welcomeEmailTemplate } = require("../services/welcomeTemplate");
const Activity = require("../models/activityModel");

const createMember = async (req, res) => {
  const { email, password } = req.body;
  const saltRound = 5;
  try {
    const hashPassword = await bcrypt.hash(password, saltRound);
    const isUserExist = await User.findOne({ email })

    if (isUserExist) return res.status(400).json({ massage: "Member Already Exist With This Email" })


    const user = new User({ ...req.body, password: hashPassword });
    const newUser = await user.save();

    // Construct the HTML email using the template
    const emailHtml = welcomeEmailTemplate({
      name: newUser.name,
      username: newUser.email,
      password,
      loginUrl: "https://optiflow-24.vercel.app/signin",
    });



    // After saving the new user:
    await sendMail({
      to: newUser.email,
      subject: "Welcome to the Team!",
      html: emailHtml,
    });

    await Activity.create({
      userId: req.user?.userId, // or admin's ID
      type: "employee_created",
      targetId: newUser._id,
      message: `Employee "${newUser.name}" created`
    });

    res.status(201).json({ message: "New Member Added Success", NewMember: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
}


module.exports = { createMember }
