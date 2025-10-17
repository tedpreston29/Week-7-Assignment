import { useState, useEffect } from "react";

export default function FetchFunctions() {
  const [game, setGame] = useState([]);

  useEffect(() => {
    console.log("fetching Data");
    async function fetchGames() {
      const data = await fetch(`http://localhost:2424/games`);
      const gameData = await data.json();
      console.log(`fetched data`, gameData);
      setGame(gameData);
    }
    fetchGames();
  }, []);

  return (
    <div>
      <img src={game.img_src} />
      <p>{game.game_title}</p>
      <p>{game.release_year}</p>
    </div>
  );
}
