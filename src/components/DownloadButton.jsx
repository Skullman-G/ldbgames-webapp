import { useState } from "react";
import { API_BASE_URL } from "../constants";
import Dropdown from "./Dropdown";
import "./DownloadButton.css";

function DownloadButton({ builds }) {
  const platforms = [
    ...new Map(builds.map(b => [b.platform.id, b.platform])).values()
  ];

  const availableBuild = builds.find(b => b.platform.id === platforms[0].id);

  const [selectedPlatform, setSelectedPlatform] = useState(platforms[0]);
  const [selectedVersion, setSelectedVersion] = useState(
    availableBuild ? availableBuild.version : null
  );

  const platformBuilds = builds.filter(
    b => b.platform.id === selectedPlatform.id
  );

  const selectedBuild = platformBuilds.find(
    b => b.version === selectedVersion
  );

  return (
    <div className="download-pill">
      <Dropdown
        label={selectedPlatform ? selectedPlatform.name : null}
        items={platforms}
        getKey={p => p.id}
        renderItem={p => p.name}
        onSelect={platform => {
          setSelectedPlatform(platform);
          setSelectedVersion(
            builds.find(b => b.platform.id === platform.id).version
          );
        }}
      />

      <Dropdown
        label={selectedVersion}
        items={platformBuilds}
        getKey={b => b.version}
        renderItem={b => b.version}
        onSelect={build => setSelectedVersion(build.version)}
      />

      {selectedBuild ? (
        <a
          className="download-btn primary"
          href={`${API_BASE_URL}${selectedBuild.archive_path}`}
          download
        >
          Download
        </a>
      ) : (
        <button className="download-btn" disabled>
          Download
        </button>
      )}
    </div>
  );
}

export default DownloadButton;
