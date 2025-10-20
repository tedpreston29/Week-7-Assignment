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
    <div key={game.id} className="game-detail-page">
      <div className="game-main-card">
        <img className="game-image" src={game.img_src} alt={game.game_title} />
        <div className="game-info">
          <h2 className="game-title">{game.game_title}</h2>
          <p className="game-genre">{game.genre}</p>
          <p className="game-year">{game.release_year}</p>
        </div>
      </div>

      <div className="cheats-section">
        <h3>Cheat Codes:</h3>
        {game.cheat_info &&
          game.cheat_info.map((cheat, i) => (
            <div key={i} className="cheat-card">
              <h2 className="cheat-title">{cheat.cheat_title}</h2>
              <p className="cheat-code">Code: {cheat.cheat_code}</p>
              <p>
                <em className="cheat-effect">{cheat.cheat_effect}</em>
              </p>
            </div>
          ))}
      </div>
      <form className="cheat-form" onSubmit={handleSubmit}>
        <div className="input-field">
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
        </div>
        <button className="submit-button" type="submit">
          ADD CHEAT
        </button>
      </form>
      <Link className="backToLibrary" to="/GameLibrary">
        Back to Library
      </Link>
    </div>
  );
}
