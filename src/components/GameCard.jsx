import { Link } from 'react-router-dom';
import './GameCard.css';
import { API_BASE_URL } from '../constants';

function GameCard({ game }) {
  return (
    <li className="game-card">
      <Link to={`/game/${game.id}`}>
        <div className="image-container">
          <img
            src={`${API_BASE_URL}${game.grid}`}
            alt=' '
            className="game-cover"
          />
          {!game.grid && <div className="overlay-text">{game.name}</div>}
        </div>
      </Link>
    </li>
  );
}

export default GameCard;
