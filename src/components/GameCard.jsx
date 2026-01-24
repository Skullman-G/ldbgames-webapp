import { Link } from "react-router-dom";
import "./GameCard.css";
import { API_BASE_URL } from "../constants";

function GameCard({ game }) {
  return (
    <li className="game-card">
      <Link to={`/game/${game.id}`} className="game-card-link">
        <div className="image-container">
          {game.grid ? (
            <img
              src={`${API_BASE_URL}${game.grid}`}
              alt={game.name}
              className="game-cover"
            />
          ) : (
            <div className="game-cover-placeholder">
              {game.name}
            </div>
          )}
        </div>
      </Link>
    </li>
  );
}

export default GameCard;
