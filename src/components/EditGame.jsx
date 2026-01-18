import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './AddGame.css';
import { API_BASE_URL } from '../constants';
import ImagePicker from './ImagePicker';

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

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Edit Game</h1>
      <form className="add-new-game-div" onSubmit={handleSubmit}>
        <label htmlFor="gameName">Game Name:</label>
        <input id="gameName" type="text" placeholder="Game Name" value={gameName} onChange={(e) => setGameName(e.target.value)} />
        
        <label>Logo:</label>
        <ImagePicker defaultImagePath={game.logo} setImageName={setGameLogo} imageType="logo" gameId={id} />

        <label>Hero Image:</label>
        <ImagePicker defaultImagePath={game.hero} setImageName={setGameHeroImage} imageType="hero" gameId={id} />

        <label>Icon:</label>
        <ImagePicker defaultImagePath={game.icon} setImageName={setGameIcon} imageType="icon" gameId={id} />

        <label>Grid Image:</label>
        <ImagePicker defaultImagePath={game.grid} setImageName={setGameGridImage} imageType="grid" gameId={id} />

        <label>Header Image:</label>
        <ImagePicker defaultImagePath={game.header} setImageName={setGameHeaderImage} imageType="header" gameId={id} />
        
        <button type="submit">Update Game</button>
      </form>
    </div>
  );
}

export default EditGame;