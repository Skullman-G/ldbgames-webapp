import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddGame.css';
import { API_BASE_URL } from '../constants';

function AddGame() {
  const [gameId, setGameId] = useState('');
  const [gameName, setGameName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      id: gameId,
      name: gameName,
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/games/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        navigate('/');
      } else {
        console.error('Failed to add game');
        alert('Error adding game. Please try again.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="add-new-game-div">
      <h1>Add New Game</h1>
      <form className="add-new-game-form" onSubmit={handleSubmit}>
        <label htmlFor="gameId">Game ID:</label>
        <input id="gameId" type="text" placeholder="Game Id" value={gameId} onChange={(e) => setGameId(e.target.value)} />
        <label htmlFor="gameName">Game Name:</label>
        <input id="gameName" type="text" placeholder="Game Name" value={gameName} onChange={(e) => setGameName(e.target.value)} />
        
        <button type="submit">Add Game</button>
      </form>
    </div>
  );
}

export default AddGame;