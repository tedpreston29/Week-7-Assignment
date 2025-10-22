import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function GameLibrary() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    console.log("fetching Data");
    async function fetchGames() {
      const data = await fetch(
        `https://week-7-assignment-gt03.onrender.com/games`
      );
      const gameData = await data.json();
      console.log(`fetched data`, gameData);
      setGames(gameData);
    }
    fetchGames();
  }, []);

  if (!games) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="library-title">
        <h2>Game Library</h2>
      </div>
      <div className="game-grid">
        {games.map((games) => (
          <div key={games.id} className="game-card">
            <Link to={`/games/${games.id}`}>
              <p>{games.game_title}</p>
              <img src={games.img_src} alt={games.game_title} />
            </Link>
          </div>
        ))}
      </div>
      <Link className="backToStart" to="/">
        Back to Start Menu
      </Link>
    </div>
  );
}
