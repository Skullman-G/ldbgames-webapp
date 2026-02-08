import { useEffect, useState } from "react";
import { API_BASE_URL } from "../constants";
import "./AddGameBuild.css";

function EditPlatform({ platform, platforms, onFinish }) {
  const [platformName, setPlatformName] = useState('');

  useEffect(() => {
      if (platform != null) {
        setPlatformName(platform.name);
      }
    }, [platform]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("platform_name", platformName.trim());

    try {
      const res = await fetch(`${API_BASE_URL}/api/platforms/${platform.id}/update`, {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        onFinish();
      }
      else alert('Failed to update platform');
    } catch (err) {
      console.error(err);
    }
  };

  const normalizedName = platformName.trim().toLowerCase();

  const isDuplicate = platforms.some(
    p =>
      p.id !== platform.id &&
      p.name.toLowerCase() === normalizedName
  );

  const isFormValid = normalizedName && !isDuplicate;

  return (
    <form className="add-build-form" onSubmit={handleSubmit}>
      <h2>Edit Platform</h2>

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

export default EditPlatform;
