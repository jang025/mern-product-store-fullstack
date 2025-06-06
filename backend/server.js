//entry point for our api

// nodemon allows us to listen to any changes in our server.js file

// creating routes

import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoute from "./routes/productRoute.js";
import path from "path";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
//console.log(process.env.MONGO_URI);

const __dirname = path.resolve();

// middleware to parse the user's data
app.use(express.json());

// product route
app.use("/api/product", productRoute);

// in production , serve the frontend react files as a static asset
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log("server started at port " + PORT);
});
