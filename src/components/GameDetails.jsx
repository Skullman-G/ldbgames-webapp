import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../constants';
import './GameDetails.css';

function GameDetails() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedVersion, setSelectedVersion] = useState("");
  const [selectedBuild, setSelectedBuild] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/games/${id}`)
      .then(res => res.json())
      .then(data => {
        setGame(data);

        if (data.builds && data.builds.length > 0) {
          setSelectedVersion(data.builds[0].version);
          setSelectedBuild(data.builds[0]);
        }

        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (!game?.builds?.length) return;
    const b = game.builds.find(x => x.version === selectedVersion);
    setSelectedBuild(b || null);
  }, [selectedVersion, game]);

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

      <p>{game.description || 'No description available.'}</p>

      <div style={{ display: "flex", gap: "10px", alignItems: "center", marginTop: "20px" }}>
        <label htmlFor="build-select">Version:</label>

        <select
          id="build-select"
          value={selectedVersion}
          onChange={(e) => setSelectedVersion(e.target.value)}
          disabled={!game.builds || game.builds.length === 0}
        >
          {!game.builds || game.builds.length === 0 ? (
            <option value="">No builds available</option>
          ) : (
            game.builds.map((b) => (
              <option key={b.version} value={b.version}>
                {b.version}
              </option>
            ))
          )}
        </select>

        {selectedBuild?.archive_path ? (
          <a
            className="link-button"
            href={`${API_BASE_URL}${selectedBuild.archive_path}`}
            download
          >
            Download
          </a>
        ) : (
          <button className="link-button" disabled>
            Download
          </button>
        )}
      </div>

      <Link to={`edit`} className="link-button" style={{ marginTop: "20px", display: "inline-block" }}>
        Edit Game
      </Link>
    </div>
  );
}

export default GameDetails;
