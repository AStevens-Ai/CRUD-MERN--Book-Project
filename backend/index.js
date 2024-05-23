import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import bookRoute from "./routes/bookRoutes.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:9000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.get("/", (req, res) => {
  console.log(req);
  return res.status(200).send("Hello World");
});

app.use("/books", bookRoute);
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App is connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
