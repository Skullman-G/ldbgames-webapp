import { useEffect, useState } from "react";
import { API_BASE_URL } from "../constants";
import AddGameBuild from "./AddGameBuild";
import trashIcon from "../assets/trashcan.svg";
import './GameBuilds.css';
import Modal from "./Modal";

function GameBuilds({ gameId }) {
  const [builds, setBuilds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchBuilds = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/games/${gameId}`);
      const game = await res.json();
      setBuilds(game.builds);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBuilds();
  }, [gameId]);

  const handleDeleteBuild = async (buildId) => {
    if (!window.confirm("Are you sure you want to delete this build?")) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/games/${gameId}/build/${buildId}/delete`, {
        method: "POST"
      });

      if (res.ok) {
        setBuilds(builds.filter(b => b.id !== buildId));
      } else {
        alert("Failed to delete build.");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting build.");
    }
  };

  return (
    <div class="game-builds-container">
      <div class="builds-header">
        <h2>Game Builds</h2>
        <button class="add-build-btn" onClick={() => setShowAddModal(true)}>+</button>
      </div>

      {loading ? (
        <p style={{ color: '#fff', textAlign: 'center' }}>Loading...</p>
      ) : builds.length === 0 ? (
        <p style={{ color: '#888', textAlign: 'center' }}>No builds uploaded yet.</p>
      ) : (
        <div class="builds-grid">
          {builds.map((b) => (
            <div key={b.id} class="build-card">
              <button
                class="delete-build-btn"
                onClick={() => handleDeleteBuild(b.id)}
                title="Delete Build"
              >
                <img src={trashIcon} alt="Delete" />
              </button>
              <p><strong>Version:</strong> {b.version}</p>
              <p><strong>Platform:</strong> {b.platform.name}</p>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      >
        <AddGameBuild gameId={gameId} />
      </Modal>
    </div>
  );
}

export default GameBuilds;
