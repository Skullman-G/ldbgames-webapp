import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../constants';
import './GameDetails.css';

function GameDetails() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedPlatformId, setSelectedPlatformId] = useState(null);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [availableVersions, setAvailableVersions] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/games/${id}`)
      .then(res => res.json())
      .then(data => {
        setGame(data);

        if (data.builds && data.builds.length > 0) {
          setSelectedPlatformId(data.builds[0].platform.id);

          const versions = data.builds
            .filter(b => b.platform.id === data.builds[0].platform.id)
            .map(b => b.version);
          setAvailableVersions(versions);
          setSelectedVersion(versions[0]);
        }

        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (!game?.builds) return;

    const versions = game.builds
      .filter(b => b.platform.id === Number(selectedPlatformId))
      .map(b => b.version);

    setAvailableVersions(versions);
    setSelectedVersion(versions[0] || null);
  }, [selectedPlatformId, game]);

  if (loading) return <p>Loading game details...</p>;
  if (!game) return <p>Game not found.</p>;

  const selectedBuild = game.builds.find(
    b => b.platform.id === Number(selectedPlatformId) && b.version === selectedVersion
  );

  return (
    <div className="game-details">
      <div
        className="hero-container"
        style={{ backgroundImage: `url(${API_BASE_URL}${game.hero})` }}
      >
        <img className="logo-img" src={`${API_BASE_URL}${game.logo}`} alt={game.name} />
      </div>

      <div className="download-container">
        <select
          value={selectedPlatformId ?? ""}
          onChange={e => setSelectedPlatformId(e.target.value)}
        >
          {[...new Map(game.builds.map(b => [b.platform.id, b.platform])).values()].map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>

        <select
          value={selectedVersion ?? ""}
          onChange={e => setSelectedVersion(e.target.value)}
        >
          {availableVersions.map(v => (
            <option key={v} value={v}>{v}</option>
          ))}
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
          <button className="link-button" disabled>Download</button>
        )}
      </div>

      <p>{game.description || 'No description available.'}</p>

      <Link to={`edit`} className="link-button" style={{ marginTop: "20px", display: "inline-block" }}>
        Edit Game
      </Link>
    </div>
  );
}

export default GameDetails;
