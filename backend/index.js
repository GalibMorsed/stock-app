const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./Routes/authRouter");
const ProductRouter = require("./Routes/productRouter");
const TableRouter = require("./Routes/tableRouter");
const dotenv = require("dotenv");
require("./Models/db");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 6060;

console.log(`PORT: ${process.env.PORT}`);
console.log(`MONGO_CONN: ${process.env.MONGO_CONN}`);
console.log(`JWT_SECRET: ${process.env.JWT_SECRET}`);

app.get("/ping", (req, res) => {
  res.send("PONG adlhalg ldajhdall algdjk");
});

app.use(bodyParser.json());
app.use(cors());
app.use("/auth", AuthRouter);
app.use("/product", ProductRouter);
app.use("/table", TableRouter);

app.listen(PORT, (error) => {
  if (error) {
    console.error("Server startup error:", error);
  } else {
    console.log(`Server is running on ${PORT}`);
  }
});
