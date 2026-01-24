import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddGame.css';
import { API_BASE_URL } from '../constants';

function AddGame() {
  const [gameId, setGameId] = useState('');
  const [gameName, setGameName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const isFormValid =
    gameId.trim().length > 0 && gameName.trim().length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      setError('Both fields are required.');
      return;
    }

    setError('');

    const data = {
      id: gameId.trim(),
      name: gameName.trim(),
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/games/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        navigate('/');
      } else {
        setError('Failed to add game. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Network error. Please try again.');
    }
  };

  return (
    <div className="add-new-game-page">
      <div className="add-new-game-card">
        <h1>Add New Game</h1>

        <form className="add-new-game-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="gameId">Game ID</label>
            <input
              id="gameId"
              type="text"
              placeholder="elden-ring"
              value={gameId}
              onChange={(e) => setGameId(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="gameName">Game Name</label>
            <input
              id="gameName"
              type="text"
              placeholder="Elden Ring"
              value={gameName}
              onChange={(e) => setGameName(e.target.value)}
            />
          </div>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" disabled={!isFormValid}>
            Add Game
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddGame;
