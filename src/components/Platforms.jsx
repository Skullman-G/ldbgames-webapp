import { useEffect, useState } from "react";
import { API_BASE_URL } from "../constants";
import trashIcon from "../assets/trashcan.svg";
import pencilIcon from "../assets/pencil.svg";
import Modal from "./Modal";
import "./Platforms.css";
import AddPlatform from "./AddPlatform";
import EditPlatform from "./EditPlatform";

function Platforms() {
  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModel, setShowEditModel] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState(null);

  const fetchPlatforms = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/platforms`);
      const data = await res.json();
      setPlatforms(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPlatforms();
  }, []);

  const handleDeletePlatform = async (platformId) => {
    if (!window.confirm("Delete this platform?")) return;

    try {
      const res = await fetch(
        `${API_BASE_URL}/api/platforms/${platformId}/delete`,
        { method: "POST" }
      );

      if (res.ok) {
        fetchPlatforms();
      } else {
        alert("Failed to delete platform.");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting platform.");
    }
  };

  const handleEditPlatform = (platform) => {
    setSelectedPlatform(platform);
    setShowEditModel(true);
  };

  const onAddPlatform = () => {
    setShowAddModal(false);
    fetchPlatforms();
  };

  const onEditPlatform = () => {
    setShowEditModel(false);
    fetchPlatforms();
  };

  return (
    <div className="platforms-container">
      <div className="platforms-header">
        <h2>Platforms</h2>
        <button className="add-platform-btn" onClick={() => setShowAddModal(true)}>
          +
        </button>
      </div>

      {loading ? (
        <p class="platforms-status">Loading...</p>
      ) : platforms.length === 0 ? (
        <p class="platforms-status">No platforms added yet.</p>
      ) : (
        <div class="platforms-grid">
          {platforms.map(p => (
            <div key={p.id} class="platform-card">
              <div class="button-section">
                <button
                  class="edit-platform-btn"
                  onClick={() => handleEditPlatform(p)}
                  title="Edit Platform"
                >
                  <img src={pencilIcon} alt="Edit" />
                </button>
                <button
                  class="delete-platform-btn"
                  onClick={() => handleDeletePlatform(p.id)}
                  title="Delete Platform"
                  disabled={p.used}
                >
                  <img src={trashIcon} alt="Delete" />
                </button>
              </div>
              <p class="platform-name">{p.name}</p>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        closable={true}
      >
        <AddPlatform platforms={platforms} onFinish={onAddPlatform} />
      </Modal>

      <Modal
        isOpen={showEditModel}
        onClose={() => setShowEditModel(false)}
        closable={true}
      >
        <EditPlatform platform={selectedPlatform} platforms={platforms} onFinish={onEditPlatform} />
      </Modal>
    </div>
  );
}

export default Platforms;
