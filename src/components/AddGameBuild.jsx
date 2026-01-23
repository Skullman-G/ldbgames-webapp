import { useEffect, useState } from "react";
import { API_BASE_URL } from "../constants";

function AddGameBuild({ gameId }) {
  const [version, setVersion] = useState("");
  const [binaryPath, setBinaryPath] = useState("");
  const [platforms, setPlatforms] = useState([]);
  const [platformId, setPlatformId] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/platforms`)
      .then((res) => res.json())
      .then((data) => {
        setPlatforms(data);
        if (data.length > 0) setPlatformId(String(data[0].id));
      })
      .catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!version || !binaryPath || !platformId || !file) {
      alert("Version, binary path, platform and file are required.");
      return;
    }

    const formData = new FormData();
    formData.append("version", version);
    formData.append("binary_path", binaryPath);
    formData.append("platform", platformId);
    formData.append("file", file);

    const res = await fetch(`${API_BASE_URL}/api/games/${gameId}/build/add`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      console.error(await res.json());
      alert("Upload failed");
      return;
    }

    alert("Build uploaded successfully!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Build</h3>

      <label>Version</label>
      <input
        type="text"
        value={version}
        onChange={(e) => setVersion(e.target.value)}
        placeholder="1.0.0"
      />

      <label>Binary Path (inside archive)</label>
      <input
        type="text"
        value={binaryPath}
        onChange={(e) => setBinaryPath(e.target.value)}
        placeholder="bin/game.exe or game.x86_64"
      />

      <label>Platform</label>
      <select value={platformId} onChange={(e) => setPlatformId(e.target.value)}>
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
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />

      <button type="submit">Upload Build</button>
    </form>
  );
}

export default AddGameBuild;
