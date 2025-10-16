import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pg from "pg";

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());

const db = new pg.Pool({
  connectionString: process.env.DB_CONN,
});

app.get("/", (req, res) => {
  res.status(200).json("this is the root");
});

app.listen(2424, () => {
  console.log(`server started on http://localhost:2424`);
});
