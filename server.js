const mongoose = require("mongoose");
const app = require("./app");
const port = 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});