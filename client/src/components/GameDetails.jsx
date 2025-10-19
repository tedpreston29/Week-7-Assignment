import { useParams, Link } from "react-router";
import { useEffect, useState } from "react";

export default function GameDetails() {
  const { id } = useParams();
  const [game, setGame] = useState([]);

  useEffect(() => {
    async function fetchGame() {
      const data = await fetch(`http://localhost:2424/games/${id}`);
      const gameData = await data.json();
      setGame(gameData);
    }
    fetchGame();
  }, [id]);

  return (
    <div>
      <div key={game.id} className="game-detail">
        <img src={game.img_src} alt={game.game_title} />
        <h2>{game.game_title}</h2>
        <p>{game.genre}</p>
        <p>{game.release_year}</p>
      </div>
      <div>
        <Link to="/games">Back to Library</Link>
      </div>
    </div>
  );
}
