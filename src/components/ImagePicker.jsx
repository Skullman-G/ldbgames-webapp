import { useRef, useState, useEffect } from 'react';
import './ImagePicker.css';
import { API_BASE_URL } from '../constants';

function ImagePicker({defaultImagePath, setImageName, imageType, gameId}) {
  const inputRef = useRef();
  const [showMenu, setShowMenu] = useState(false);
  const [serverImages, setServerImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imagePath, setImagePath] = useState(defaultImagePath);

  useEffect(() => {
    if (showMenu && gameId && imageType) {
      fetchServerImages();
    }
  }, [showMenu, gameId, imageType]);

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
    const filename = imgPath.split('/').pop();
    setImagePath(imgPath);
    setImageName(filename);
    setShowMenu(false);
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !gameId || !imageType) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${API_BASE_URL}/api/games/${gameId}/img/${imageType}/upload`, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        setValue(file);
        await fetchServerImages();
      } else {
        console.error('Upload failed');
        alert('Failed to upload image');
      }
    } catch (err) {
      console.error('Error uploading image:', err);
      alert('Error uploading image');
    }

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="image-picker-container">
      <div className="image-upload" onClick={() => setShowMenu(!showMenu)}>
        {imagePath ? <img src={`${API_BASE_URL}${imagePath}`} alt="Uploaded Image" /> : <span className="plus">+</span>}
      </div>

      {showMenu && (
        <div className="image-menu">
          <div className="image-menu-header">
            <h3>Select Image</h3>
            <button className="close-btn" onClick={() => setShowMenu(false)}>×</button>
          </div>

          <div className="image-menu-content">
            <div className="upload-section">
              <label htmlFor="file-upload" className="upload-button">
                📤 Upload New Image
              </label>
              <input
                id="file-upload"
                ref={inputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleUploadImage}
              />
            </div>

            <div className="server-images-section">
              <h4>Available Images</h4>
              {loading ? (
                <p>Loading images...</p>
              ) : serverImages.length > 0 ? (
                <div className="image-grid">
                  {serverImages.map((image, idx) => (
                    <div
                      key={idx}
                      className="image-thumbnail"
                      onClick={() => handleSelectServerImage(image)}
                      title={image}
                    >
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