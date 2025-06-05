//entry point for our api

// nodemon allows us to listen to any changes in our server.js file

// creating routes

import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoute from "./routes/productRoute.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
//console.log(process.env.MONGO_URI);

// middleware to parse the user's data
app.use(express.json());

// product route
app.use("/api/product", productRoute);

app.listen(PORT, () => {
  connectDB();
  console.log("server started at port " + PORT);
});
