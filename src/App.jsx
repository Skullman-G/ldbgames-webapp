import { useState, useEffect } from 'react'
import './App.css'
import GameCard from './components/GameCard';

function App() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/games")
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
    <div>
      <h1>My Game Library</h1>
      {loading ? <p>Loading games…</p> : games.length === 0 ? <p>No games loaded.</p> : (
        <ul>
          {games.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default App
