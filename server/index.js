import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postRouter from "./routes/post.js";
import userRouter from "./routes/user.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRouter);
app.use("/users", userRouter);
app.get("/", (req, res) => {
  res.send("APP IS RUNNING");
});
// const CONNECTION_URL =
//   "mongodb+srv://Suman313:Suman313@clustersuman.awwpz.mongodb.net/RegisteredUsers?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000; // need to add .env when uploading on heroku
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`This server is running on server ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
