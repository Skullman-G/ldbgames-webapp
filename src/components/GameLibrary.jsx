import GameCard from "./GameCard";
import { useState, useEffect } from 'react';
import './GameLibrary.css';
import { API_BASE_URL } from '../constants';

function GameLibrary() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/games`)
      .then(res => res.json())
      .then(data => {
        setGames(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="game-library">
      <h1>Game Library</h1>
      {loading ? <p>Loading games…</p> : games.length === 0 ? <p>No games loaded.</p> : (
        <ul className="game-grid">
          {games.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default GameLibrary;