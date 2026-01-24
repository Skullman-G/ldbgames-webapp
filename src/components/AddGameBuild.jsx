import { useEffect, useState } from "react";
import { API_BASE_URL } from "../constants";
import "./AddGameBuild.css";

function AddGameBuild({ gameId, setClosable, onFinish }) {
  const [version, setVersion] = useState("");
  const [binaryPath, setBinaryPath] = useState("");
  const [platforms, setPlatforms] = useState([]);
  const [platformId, setPlatformId] = useState("");
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/platforms`)
      .then((res) => res.json())
      .then((data) => {
        setPlatforms(data);
        if (data.length > 0) setPlatformId(String(data[0].id));
      })
      .catch(console.error);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isUploading || !isFormValid) return;

    if (!version || !binaryPath || !platformId || !file) {
      alert("Version, binary path, platform and file are required.");
      return;
    }

    const formData = new FormData();
    formData.append("version", version);
    formData.append("binary_path", binaryPath);
    formData.append("platform_id", platformId);
    formData.append("file", file);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${API_BASE_URL}/api/games/${gameId}/build/add`);

    setIsUploading(true);
    setClosable(false);
    setUploadProgress(0);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(percent);
      }
    };

    xhr.onload = () => {
      setIsUploading(false);
      setClosable(true);

      if (xhr.status >= 200 && xhr.status < 300) {
        setUploadProgress(100);
        alert("Build uploaded successfully!");

        try {
          const game = JSON.parse(xhr.responseText);
          onFinish?.(game.builds);
        } catch (err) {
          console.error("Failed to parse response:", err);
          alert("Upload succeeded, but failed to read server response.");
        }
      } else {
        console.error(xhr.responseText);
        alert("Upload failed");
      }
    };

    xhr.onerror = () => {
      setIsUploading(false);
      setClosable(true);
      alert("Upload failed");
    };

    xhr.send(formData);
  };

  const isFormValid =
  version.trim() &&
  binaryPath.trim() &&
  platformId &&
  file &&
  !isUploading;

  return (
    <form className="add-build-form" onSubmit={handleSubmit}>
      <h2>Add Build</h2>

      <hr className="form-separator" />

      <label>Version</label>
      <input
        type="text"
        placeholder="1.0.0"
        value={version}
        disabled={isUploading}
        onChange={(e) => setVersion(e.target.value)}
      />

      <label>Binary Path (inside archive)</label>
      <input
        type="text"
        value={binaryPath}
        disabled={isUploading}
        onChange={(e) => setBinaryPath(e.target.value)}
        placeholder="bin/game.exe or game.x86_64"
      />

      <label>Platform</label>
      <select value={platformId} disabled={isUploading} onChange={(e) => setPlatformId(e.target.value)}>
        {platforms.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>

      <label>Archive File</label>
      <input
        type="file"
        accept=".tar.gz"
        disabled={isUploading}
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />

      {isUploading && (
        <div className="upload-progress">
          <div
            className="upload-progress-bar"
            style={{ width: `${uploadProgress}%` }}
          />
          <span>{uploadProgress}%</span>
        </div>
      )}

      <button type="submit" disabled={!isFormValid}>
        {isUploading ? "Uploading..." : "Upload Build"}
      </button>
    </form>
  );
}

export default AddGameBuild;
