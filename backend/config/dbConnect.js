import dotenv from "dotenv";
// const dotenv = require("dotenv");
import mongoose from "mongoose";
// const mongoose = require("mongoose");

dotenv.config();

const mongoDBConnect = async () => {
  await mongoose
    .connect(process.env.dbconnect, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch(() => {
      console.log("Failed to connect DB!!!");
    });
};

export default mongoDBConnect;
