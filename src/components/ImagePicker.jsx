import { useRef, useState, useEffect } from 'react';
import './ImagePicker.css';
import { API_BASE_URL } from '../constants';

function ImagePicker({ imagePath, setImagePath, imageType, gameId }) {
  const inputRef = useRef();
  const containerRef = useRef();
  const [showMenu, setShowMenu] = useState(false);
  const [menuAbove, setMenuAbove] = useState(false);
  const [serverImages, setServerImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [closing, setClosing] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!showMenu) return;

    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target) && !closing) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  useEffect(() => {
    if (showMenu) {
      adjustMenuPosition();
      if (gameId && imageType) fetchServerImages();
    }
  }, [showMenu]);

  const closeMenu = () => {
    setShowMenu(false);
    setClosing(true);
    setTimeout(() => {
      setVisible(false);
      setClosing(false);
    }, 250);
  };

  const openMenu = () => {
    setVisible(true);
    requestAnimationFrame(() => {
      setShowMenu(true);
    });
  };

  const adjustMenuPosition = () => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    setMenuAbove(rect.bottom + 500 > viewportHeight);
  };

  const fetchServerImages = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/games/${gameId}/img/${imageType}/list`);
      if (response.ok) {
        const images = await response.json();
        setServerImages(images);
      }
    } catch (err) {
      console.error('Error fetching server images:', err);
    }
    setLoading(false);
  };

  const handleSelectServerImage = (imgPath) => {
    setImagePath(imgPath);
    closeMenu();
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !gameId || !imageType) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${API_BASE_URL}/api/games/${gameId}/img/${imageType}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        await fetchServerImages();
      } else {
        alert('Failed to upload image');
      }
    } catch (err) {
      console.error('Error uploading image:', err);
      alert('Error uploading image');
    }

    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="image-picker-container" ref={containerRef}>
      <div className="image-upload" onClick={() => {
        if (showMenu) closeMenu();
        else openMenu();
      }}>
        {imagePath ? <img src={`${API_BASE_URL}${imagePath}`} alt="Uploaded" /> : <span className="plus">+</span>}
      </div>

      {visible && (
        <div className={`image-menu ${menuAbove ? 'above' : 'below'} ${showMenu ? 'open' : ''}`}>
          <div className="image-menu-header">
            <h3>Select Image</h3>
            <div className="close-btn" onClick={closeMenu}>×</div>
          </div>
          <div className="image-menu-content">
            <div className="upload-section">
              <label htmlFor="file-upload" className="upload-button">Upload New Image</label>
              <input id="file-upload" ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleUploadImage} />
            </div>

            <div className="server-images-section">
              <h4>Available Images</h4>
              {loading ? (
                <p>Loading images...</p>
              ) : serverImages.length > 0 ? (
                <div className="image-grid">
                  {serverImages.map((image, idx) => (
                    <div key={idx} className="image-thumbnail" onClick={() => handleSelectServerImage(image)}>
                      <img src={`${API_BASE_URL}${image}`} alt={image} />
                    </div>
                  ))}
                </div>
              ) : (
                <p>No images available. Upload one to get started.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImagePicker;
