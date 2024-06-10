const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("common"));

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);

app.get("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: "Page not found!",
  });
});

module.exports = app;
