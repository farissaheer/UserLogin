import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import userRouter from "./routers/userRouter.js";
import mongoDBConnect from "./config/dbConnect.js";
import adminRouter from "./routers/adminRouter.js";

mongoDBConnect();

const PORT = process.env.PORT;
const app = express();

app.use(cors());

app.use("/", userRouter);
app.use("/admin", adminRouter);

app.listen(PORT, () => {
  console.log(`Server started Port number: ${PORT}`);
});
