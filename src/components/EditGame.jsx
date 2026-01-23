import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './AddGame.css';
import { API_BASE_URL } from '../constants';
import ImagePicker from './ImagePicker';
import AddGameBuild from './AddGameBuild';

function EditGame() {
  const { id } = useParams();
  const [game, setGame] = useState({});
  const [gameName, setGameName] = useState('');
  const [gameLogo, setGameLogo] = useState('');
  const [gameHeroImage, setGameHeroImage] = useState('');
  const [gameIcon, setGameIcon] = useState('');
  const [gameGridImage, setGameGridImage] = useState('');
  const [gameHeaderImage, setGameHeaderImage] = useState('');
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState('metadata');

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/games/${id}`)
      .then(res => res.json())
      .then(data => {
        setGame(data);
        setGameName(data.name);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: gameName,
      logo: gameLogo,
      hero: gameHeroImage,
      icon: gameIcon,
      grid: gameGridImage,
      header: gameHeaderImage,
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/games/${id}/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        navigate('/');
      } else {
        console.error('Failed to update game');
        alert('Error updating game. Please try again.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteGame = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE_URL}/api/games/${id}/delete`, {
        method: 'POST'
      });
      if (res.ok) {
        navigate('/');
      } else {
        console.error('Failed to delete game');
        alert('Error deleting game. Please try again.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
      <div
        style={{
          width: '220px',
          border: '1px solid #333',
          borderRadius: '8px',
          padding: '12px',
          background: '#111',
          color: '#fff',
        }}
      >
        <h3 style={{ marginTop: 0 }}>Edit Game</h3>

        <button
          type="button"
          onClick={() => setActiveTab('metadata')}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '6px',
            border: '1px solid #444',
            cursor: 'pointer',
            background: activeTab === 'metadata' ? '#2b78ff' : '#222',
            color: '#fff',
          }}
        >
          Metadata
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('builds')}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '6px',
            border: '1px solid #444',
            cursor: 'pointer',
            background: activeTab === 'builds' ? '#2b78ff' : '#222',
            color: '#fff',
          }}
        >
          Builds
        </button>
      </div>

      <div className="add-new-game-div" style={{ flex: 1 }}>
        {activeTab === 'metadata' && (
          <>
            <h1>Edit Game Metadata</h1>

            <form className="add-new-game-form" onSubmit={handleSubmit}>
              <label htmlFor="gameName">Game Name:</label>
              <input
                id="gameName"
                type="text"
                placeholder="Game Name"
                value={gameName}
                onChange={(e) => setGameName(e.target.value)}
              />

              <label>Logo:</label>
              <ImagePicker
                defaultImagePath={game.logo}
                setImageName={setGameLogo}
                imageType="logo"
                gameId={id}
              />

              <label>Hero Image:</label>
              <ImagePicker
                defaultImagePath={game.hero}
                setImageName={setGameHeroImage}
                imageType="hero"
                gameId={id}
              />

              <label>Icon:</label>
              <ImagePicker
                defaultImagePath={game.icon}
                setImageName={setGameIcon}
                imageType="icon"
                gameId={id}
              />

              <label>Grid Image:</label>
              <ImagePicker
                defaultImagePath={game.grid}
                setImageName={setGameGridImage}
                imageType="grid"
                gameId={id}
              />

              <label>Header Image:</label>
              <ImagePicker
                defaultImagePath={game.header}
                setImageName={setGameHeaderImage}
                imageType="header"
                gameId={id}
              />

              <button type="submit">Update Game</button>
              <button onClick={deleteGame}>Delete Game</button>
            </form>
          </>
        )}

        {activeTab === 'builds' && (
          <>
            <h1>Manage Builds</h1>

            <AddGameBuild gameId={id} />
          </>
        )}
      </div>
    </div>
  );
}

export default EditGame;
