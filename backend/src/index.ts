import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
const connectionURL = process.env.CONNECTION_URL as string;
mongoose
  .connect(connectionURL)
  .then(() => {
    console.log("connected to database successfully");
    const port = process.env.PORT || 3000;
    app.listen(port, () =>
      console.log(`listening on http://localhost:${port}`)
    );
  })
  .catch((error) => {
    console.error(error);
    process.exit();
  });
