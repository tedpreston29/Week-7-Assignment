import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function GameDetails() {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
  }

  useEffect(() => {
    async function fetchGame() {
      const data = await fetch(`http://localhost:2424/games/${id}`);
      const gameData = await data.json();
      setGame(gameData[0]);
    }
    fetchGame();
  }, [id]);

  if (!game) {
    return <p>Loading...</p>;
  }

  return (
    <div key={game.id} className="game-detail">
      <h2>{game.game_title}</h2>
      <img src={game.img_src} alt={game.game_title} />
      <p>{game.genre}</p>
      <p>{game.release_year}</p>

      <h3>Cheat Codes:</h3>
      {game.cheat_info &&
        game.cheat_info.map((cheat, i) => (
          <div key={i} className="cheat_item">
            <h4>{cheat.cheat_title}</h4>
            <p>Code: {cheat.cheat_code}</p>
            <p>
              <em>{cheat.cheat_effect}</em>
            </p>
          </div>
        ))}
      <form onSubmit={handleSubmit}></form>
      <Link to="/GameLibrary">Back to Library</Link>
    </div>
  );
}
