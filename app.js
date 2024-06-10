const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("common"));

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Hello from server!",
  });
});

module.exports = app;
