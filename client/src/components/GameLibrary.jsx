import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function GameLibrary() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    console.log("fetching Data");
    async function fetchGames() {
      const data = await fetch(`http://localhost:2424/games`);
      const gameData = await data.json();
      console.log(`fetched data`, gameData);
      setGames(gameData);
    }
    fetchGames();
  }, []);
  return (
    <div>
      <div className="library-title">
        <h2>Game Library</h2>
      </div>
      <div className="game-grid">
        {games.map((game) => (
          <div key={game.id} className="game-card">
            <Link to={`games/${game.id}`}>
              <img src={games.img_src} alt={games.game_title} />
              <p>{games.game_title}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
