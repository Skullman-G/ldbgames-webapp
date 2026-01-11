import { Link } from 'react-router-dom';

function GameCard({ game }) {
  const coverUrl = `http://localhost:8000/api/games/${game.id}/img/grid`;
  return (
    <li className="game-card">
      <Link to={`/game/${game.id}`}>
        {/* Cover image */}
        {game.img && game.img.grid ? (
          <img
            src={coverUrl}
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
