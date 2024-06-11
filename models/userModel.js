const mongoose = require("mongoose");

const userScheme = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "User must have a name!"],
      unique: true,
    },
    emaill: {
      type: String,
      required: [true, "User must have an email!"],
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: [ture, "User must have a password!"],
      min: 4,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userScheme);

module.exports = User;
