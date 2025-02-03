const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8080;

app.get("/ping", (req, res) => {
  res.send("PONG");
});
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
