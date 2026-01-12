import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function GameDetails() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/api/games/${id}`)
      .then(res => res.json())
      .then(data => {
        setGame(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading game details...</p>;
  if (!game) return <p>Game not found.</p>;

  const gameTitle = game.logo ? (
    <img className="logo-img" src={`http://localhost:8000/api/games/${id}/img/logo`} alt={game.name} />
  ) : (
    <h1>{game.name}</h1>
  );

  return (
    <div className="game-details">
      {game.hero ? (
        <div className="hero-container" style={{ backgroundImage: `url(http://localhost:8000/api/games/${id}/img/hero)` }}>
          {gameTitle}
        </div>
      ) : (
        <div className="hero-placeholder">{gameTitle}</div>
      )}
      <p>{game.description || 'No description available.'}</p>
    </div>
  );
}

export default GameDetails;