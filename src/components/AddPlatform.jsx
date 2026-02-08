import { useState } from "react";
import { API_BASE_URL } from "../constants";
import "./AddGameBuild.css";

function AddPlatform({ platforms, onFinish }) {
  const [platformName, setPlatformName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("platform_name", platformName.trim());

    try {
      const res = await fetch(`${API_BASE_URL}/api/platforms/add`, {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        onFinish();
      }
      else alert('Failed to add platform');
    } catch (err) {
      console.error(err);
    }
  };

  const normalizedName = platformName.trim().toLowerCase();

  const isDuplicate = platforms.some(
    p => p.name.toLowerCase() === normalizedName
  );

  const isFormValid = normalizedName && !isDuplicate;

  return (
    <form className="add-build-form" onSubmit={handleSubmit}>
      <h2>Add Platform</h2>

      <hr className="form-separator" />

      <label>Platform Name</label>
      <input
        type="text"
        value={platformName}
        onChange={(e) => setPlatformName(e.target.value)}
      />

      <button type="submit" disabled={!isFormValid}>
        Submit
      </button>
    </form>
  );
}

export default AddPlatform;
