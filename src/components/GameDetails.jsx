import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../constants";
import "./GameDetails.css";
import DownloadButton from "./DownloadButton";

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

  if (loading) return <p className="details-loading">Loading game details…</p>;
  if (!game) return <p>Game not found.</p>;

  return (
    <div className="game-details">
      <div
        className="hero-container"
        style={{
          backgroundImage: game.hero
            ? `url(${API_BASE_URL}${game.hero})`
            : undefined
        }}
      >
        <div className="hero-overlay" />

        {game.logo ? (
          <img
            className="logo-img"
            src={`${API_BASE_URL}${game.logo}`}
            alt={game.name}
          />
        ) : (
          <h1 className="hero-title">{game.name}</h1>
        )}
      </div>

      <div className="game-details-info">
        <DownloadButton builds={game.builds} />

        <p className="game-description">
          {game.description || "No description available."}
        </p>

        <Link to="edit" className="edit-link">
          Edit Game
        </Link>
      </div>
    </div>
  );
}

export default GameDetails;
