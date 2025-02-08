import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import AuthRouter from "./Routes/authRouter.js";
import ProductRouter from "./Routes/productRouter.js";
import dotenv from "dotenv";
import "./Models/db.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

console.log(`PORT: ${process.env.PORT}`);
console.log(`MONGO_CONN: ${process.env.MONGO_CONN}`);
console.log(`JWT_SECRET: ${process.env.JWT_SECRET}`);

app.get("/ping", (req, res) => {
  res.send("PONG");
});

app.use(bodyParser.json());
app.use(cors());
app.use("/auth", AuthRouter);
app.use("/products", ProductRouter);

app.listen(PORT, (error) => {
  if (error) {
    console.error("Server startup error:", error);
  } else {
    console.log(`Server is running on ${PORT}`);
  }
});
