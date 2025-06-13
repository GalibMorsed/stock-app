const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./Routes/authRouter");
const ProductRouter = require("./Routes/productRouter");
const TableRouter = require("./Routes/tableRouter");
const dotenv = require("dotenv");
const path = require("path");
require("./Models/db");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 6060;

const _dirname = path.resolve();

console.log(`PORT: ${process.env.PORT}`);
console.log(`MONGO_CONN: ${process.env.MONGO_CONN}`);
console.log(`JWT_SECRET: ${process.env.JWT_SECRET}`);

app.get("/ping", (req, res) => {
  res.send("PONGA adlhalg ldajhdall algdjk");
});

app.use(bodyParser.json());
app.use(cors());
app.use("/auth", AuthRouter);
app.use("/product", ProductRouter);
app.use("/table", TableRouter);
app.use(express.static(path.join(_dirname, "/frontend/build")));
app.get("*", (_, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "build", "index.html"));
});

app.listen(PORT, (error) => {
  if (error) {
    console.error("Server startup error:", error);
  } else {
    console.log(`Server is running on ${PORT}`);
  }
});
