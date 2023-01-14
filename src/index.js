require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;
const app = express();

mongoose.set("strictQuery", false);

app.use(express.json());
app.use(cookieParser());
app.use(cors());

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    app.listen(PORT, () => console.log(`server tarted on port: ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
