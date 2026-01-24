import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../constants";
import './EditGameGeneral.css';
import ImagePicker from "./ImagePicker";

function EditGameGeneral({ gameId }) {
  const [game, setGame] = useState({});
  const [gameName, setGameName] = useState('');
  const [gameLogo, setGameLogo] = useState('');
  const [gameHeroImage, setGameHeroImage] = useState('');
  const [gameIcon, setGameIcon] = useState('');
  const [gameGridImage, setGameGridImage] = useState('');
  const [gameHeaderImage, setGameHeaderImage] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchGame = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/games/${gameId}`);
      const game = await res.json();
      setGame(game);
      setGameName(game.name);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGame();
  }, [gameId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!gameName.trim()) return; // prevent empty names

    const data = {
      name: gameName,
      logo: gameLogo,
      hero: gameHeroImage,
      icon: gameIcon,
      grid: gameGridImage,
      header: gameHeaderImage,
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/games/${gameId}/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) navigate('/');
      else alert('Error updating game. Please try again.');
    } catch (err) {
      console.error(err);
    }
  };

  const deleteGame = async (e) => {
    e.preventDefault();
    if (!window.confirm('Are you sure you want to delete this game?')) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/games/${gameId}/delete`, { method: 'POST' });
      if (res.ok) navigate('/');
      else alert('Error deleting game. Please try again.');
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p style={{ textAlign: 'center', color: '#fff' }}>Loading...</p>;

  return (
    <div class="edit-game-container">
      <h2>Edit Game Metadata</h2>
      <hr className="form-separator" />
      <form className="edit-game-form" onSubmit={handleSubmit}>
        <label class="edit-game-form-label" htmlFor="gameName">Game Name:</label>
        <input
          id="gameName"
          type="text"
          placeholder="Game Name"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
        />

        <div className="image-picker-grid">
          <div>
            <label className="edit-game-form-label">Logo:</label>
            <ImagePicker defaultImagePath={game.logo} setImageName={setGameLogo} imageType="logo" gameId={gameId} />
          </div>

          <div>
            <label className="edit-game-form-label">Hero Image:</label>
            <ImagePicker defaultImagePath={game.hero} setImageName={setGameHeroImage} imageType="hero" gameId={gameId} />
          </div>

          <div>
            <label className="edit-game-form-label">Icon:</label>
            <ImagePicker defaultImagePath={game.icon} setImageName={setGameIcon} imageType="icon" gameId={gameId} />
          </div>

          <div>
            <label className="edit-game-form-label">Grid Image:</label>
            <ImagePicker defaultImagePath={game.grid} setImageName={setGameGridImage} imageType="grid" gameId={gameId} />
          </div>

          <div>
            <label className="edit-game-form-label">Header Image:</label>
            <ImagePicker defaultImagePath={game.header} setImageName={setGameHeaderImage} imageType="header" gameId={gameId} />
          </div>
        </div>

        <div className="form-buttons">
          <button type="submit" disabled={!gameName.trim()}>Update Game</button>
          <button type="button" className="delete" onClick={deleteGame}>Delete Game</button>
        </div>
      </form>
    </div>
  );
}

export default EditGameGeneral;
