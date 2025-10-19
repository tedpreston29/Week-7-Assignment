import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function GameDetails() {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  const [cheatTitle, setCheatTitle] = useState("");
  const [cheatCode, setCheatCode] = useState("");
  const [cheatEffect, setCheatEffect] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:2424/cheats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cheat_title: cheatTitle,
        code: cheatCode,
        effect: cheatEffect,
        game_id: id,
      }),
    });
  };

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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Cheat Title"
          value={cheatTitle}
          onChange={(e) => setCheatTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Cheat Code"
          value={cheatCode}
          onChange={(e) => setCheatCode(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Effect"
          value={cheatEffect}
          onChange={(e) => setCheatEffect(e.target.value)}
          required
        />
        <button type="submit">ADD CHEAT</button>
      </form>
      <Link to="/GameLibrary">Back to Library</Link>
    </div>
  );
}
