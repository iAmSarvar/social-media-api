const User = require("../models/userModel");
const bcrypt = require("bcrypt");

// Get a user
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Update user
const updateUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        res.status(500).json({
          status: "error",
          message: error.message,
        });
      }
    }

    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      res.status(200).json({
        status: "success",
        message: "account updated",
        data: {
          user,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  } else {
    return res.status(403).json({
      status: "fail",
      message: "You can't update this account!",
    });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);

      res.status(204).json({
        status: "success",
        data: null,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  } else {
    return res.status(403).json({
      status: "fail",
      message: "You can't delete this account!",
    });
  }
};

// Follow user
const followUser = async (req, res) => {};

// Unfollow user
const unfollowUser = async (req, res) => {};

module.exports = {
  updateUser,
  deleteUser,
  getUser,
  followUser,
  unfollowUser,
};
