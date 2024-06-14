const User = require("../models/userModel");

const register = async (req, res) => {
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found!",
      });
    }

    const isValid = await user.comparePasswords(req.body.password);

    if (isValid) {
      return res.status(200).json({
        status: "success",
        data: {
          user,
        },
      });
    } else {
      return res.status(400).json({
        status: "fail",
        message: "wrong password",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
};
