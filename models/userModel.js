const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userScheme = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "User must have a name!"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "User must have an email!"],
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "User must have a password!"],
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
    description: {
      type: String,
      max: 100,
    },
    city: {
      type: String,
      max: 100,
    },
    from: {
      type: String,
      max: 100,
    },
    relationship: {
      type: Number,
      enum: [1, 2, 3],
    },
  },
  { timestamps: true }
);

// Hashing the password
userScheme.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);

  this.password = hashedPassword;

  next();
});

userScheme.methods.comparePasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User ", userScheme);

module.exports = User;
