require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const router = require("./router/index");

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;
const app = express();

mongoose.set("strictQuery", false);

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api", router);

const start = async () => {
  const db = mongoose.connection;

  try {
    // await mongoose.connect(DB_URL);
    mongoose.connect(DB_URL);

    // mongo db connection succeed check
    db.once("open", (_) => {
      console.log("Database connected:", DB_URL);
    });
    db.on("error", (err) => {
      console.error("connection error:", DB_URL);
    });

    app.listen(PORT, () => console.log(`server tarted on port: ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
