import express, { request } from "express";
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

app.get("/games", async (req, res) => {
  const result = await db.query(`SELECT
    games.id,
    games.game_title,
    games.release_year,
    games.img_src,
    ARRAY_AGG (json_build_object(
      'cheat_title', cheats.cheat_title,
      'cheat_code', cheats.code,
      'cheat_effect', cheats.effect
    )) AS cheat_info
    FROM games
    LEFT JOIN cheats ON cheats.game_id = games.id
    GROUP BY games.id, games.release_year, games.img_src`);
  res.json(result.rows);
});

app.get("/games/:id", async (req, res) => {
  const result = await db.query(
    `SELECT
    games.id,
    games.game_title,
    games.release_year,
    games.img_src,
    ARRAY_AGG (json_build_object(
      'id', cheats.id,     
      'cheat_title', cheats.cheat_title,
      'cheat_code', cheats.code,
      'cheat_effect', cheats.effect
    )) AS cheat_info
    FROM games
    LEFT JOIN cheats ON cheats.game_id = games.id WHERE games.id = $1
    GROUP BY games.id, games.release_year, games.img_src`,
    [req.params.id]
  );
  res.json(result.rows);
});

// app.post(`/cheats`, async(req, res) => {
//   const  = req.body;
//   const
// })

app.listen(2424, () => {
  console.log(`server started on http://localhost:2424`);
});
