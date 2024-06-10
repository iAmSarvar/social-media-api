const mongoose = require("mongoose");
const app = require("./app");
const port = 8000;

const DB = process.env.DATABASE;

mongoose.connect(
  DB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected successfully");
  }
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
