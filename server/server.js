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

app.get("/games", async (req, res) => {
  const result = await db.query(`SELECT game_title, img_src FROM games`);
  res.json(result.rows);
});

app.get("/games/:id", async (req, res) => {
  const result = await db.query(
    `SELECT
    games.id,
    games.game_title,
    games.release_year,
    games.img_src,
    ARRAY_AGG(cheats.cheat_title) AS cheat_titles,
    ARRAY_AGG(cheats.code) AS cheat_codes,
    ARRAY_AGG(cheats.effect) AS cheat_effects
    FROM games
    LEFT JOIN cheats ON cheats.game_id = games.id
    GROUP BY games.id,
    games.game_title,
    games.release_year,
    games.img_src`
  );
  res.json(result.rows);
});

app.listen(2424, () => {
  console.log(`server started on http://localhost:2424`);
});
