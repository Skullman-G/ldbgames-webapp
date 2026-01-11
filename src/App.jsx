import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import GameCard from './components/GameCard';
import GameDetails from './components/GameDetails';

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
    <Router>
      <div className="page-filler">
        <Routes>
          <Route path="/" element={
            <>
              <h1>My Game Library</h1>
              {loading ? <p>Loading games…</p> : games.length === 0 ? <p>No games loaded.</p> : (
                <ul>
                  {games.map(game => (
                    <GameCard key={game.id} game={game} />
                  ))}
                </ul>
              )}
            </>
          } />
          <Route path="/game/:id" element={<GameDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
