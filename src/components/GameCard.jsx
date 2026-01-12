import { Link } from 'react-router-dom';

function GameCard({ game }) {
  return (
    <li className="game-card">
      <Link to={`/game/${game.id}`}>
        {game.grid ? (
          <img
            src={`http://localhost:8000/api/games/${game.id}/img/grid`}
            alt={game.name}
            className="game-cover"
          />
        ) : (
          <div className="game-cover-placeholder">{game.name}</div>
        )}
      </Link>
    </li>
  );
}

export default GameCard;
