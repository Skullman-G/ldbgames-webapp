import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../constants';
import './GameDetails.css';
import DownloadButton from './DownloadButton';

function GameDetails() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/games/${id}`)
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

  return (
    <div className="game-details">
      <div
        className="hero-container"
        style={{ backgroundImage: `url(${API_BASE_URL}${game.hero})` }}
      >
        <img className="logo-img" src={`${API_BASE_URL}${game.logo}`} alt={game.name} />
      </div>

      <div className="game-details-info">
        <DownloadButton builds={ game.builds }/>

        <p>{game.description || 'No description available.'}</p>

        <Link to={`edit`} className="link-button" style={{ marginTop: "20px", display: "inline-block" }}>
          Edit Game
        </Link>
      </div>
    </div>
  );
}

export default GameDetails;
