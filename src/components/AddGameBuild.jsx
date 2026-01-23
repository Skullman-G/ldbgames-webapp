import { useState } from "react";
import { API_BASE_URL } from "../constants";

function AddGameBuild({ gameId }) {
  const [version, setVersion] = useState("");
  const [binaryPath, setBinaryPath] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!version || !file) {
      alert("Version and file are required");
      return;
    }

    const formData = new FormData();
    formData.append("version", version);
    formData.append("binary_path", binaryPath);
    formData.append("file", file);

    setLoading(true);

    const res = await fetch(
      `${API_BASE_URL}/api/games/${gameId}/build/add`,
      {
        method: "POST",
        body: formData,
      }
    );

    setLoading(false);

    if (!res.ok) {
      const err = await res.json();
      console.error(err);
      alert("Upload failed");
      return;
    }

    const updatedGame = await res.json();
    console.log("Build added:", updatedGame);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Version</label>
      <input
        type="text"
        value={version}
        onChange={(e) => setVersion(e.target.value)}
        placeholder="1.0.0"
      />

      <label>Binary Path</label>
      <input
        type="text"
        value={binaryPath}
        onChange={(e) => setBinaryPath(e.target.value)}
        placeholder="path/to/binary"
      />

      <label>Build archive</label>
      <input
        type="file"
        accept=".tar.gz"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />

      <button disabled={loading}>
        {loading ? "Uploading..." : "Upload Build"}
      </button>
    </form>
  );
}

export default AddGameBuild;
