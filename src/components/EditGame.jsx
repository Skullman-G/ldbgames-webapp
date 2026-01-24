import { useState } from 'react';
import { useParams } from 'react-router-dom';
import './EditGame.css';
import GameBuilds from './GameBuilds';
import EditGameGeneral from './EditGameGeneral';

function EditGame() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('metadata');

  return (
    <div className="edit-game-page">
      <div className="edit-game-card">
        <div className="edit-game-sidebar">
          <h3>Edit Game</h3>
          <button
            type="button"
            onClick={() => setActiveTab('metadata')}
            className={activeTab === 'metadata' ? 'active' : ''}
          >
            Metadata
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('builds')}
            className={activeTab === 'builds' ? 'active' : ''}
          >
            Builds
          </button>
        </div>

        <div className="edit-game-content">
          {activeTab === 'metadata' && (
            <EditGameGeneral gameId={id} />
          )}

          {activeTab === 'builds' && (
            <GameBuilds gameId={id} />
          )}
        </div>
      </div>
    </div>
  );
}

export default EditGame;
