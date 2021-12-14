const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({path:"./config.env"})
const userRouter = require("./routes/userRoute");

mongoose
  .connect(
    `mongodb+srv://ashar:${process.env.MONGO_PASSWORD}@cluster0.1p73t.mongodb.net/mongo-practice?retryWrites=true&w=majority`,
    { useNewURLParser: true, useUnifiedTopology: true }
  )
  .then((con) => {
    console.log("mongodb connected");
  });
const express = require("express");

const app = express();
app.use(express.json());
// app.use("/api/v1/users", userRouter);
app.use("/api/v2/auth",userRouter);

app.listen(process.env.PORT, () => {
  console.log(`server started at PORT ${process.env.PORT}`);
});
