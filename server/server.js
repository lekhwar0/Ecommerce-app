import express from "express";
import "dotenv/config";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./models/mongoConnection.js";

import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const PORT = process.env.PORT || 8080;

connectDB();

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

app.get("/", (req, res) => {
  res.send({
    message: "hello from the server",
  });
});

app.listen(PORT, () => {
  console.log(`server is running on Port ${PORT}`);
});
