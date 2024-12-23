import React from "react";
import { getIcon } from "../common/Utility";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function DisplayFile({
  path,
  fileName,
  indexorKey,
  onSelect,
  onSelecteEle,
  onSelectAddFileFolder,
}) {
  return (
    <div
      key={indexorKey}
      className="folder-container"
      onClick={(e) => {
        e.stopPropagation();
        onSelect([...path]);
        onSelectAddFileFolder([...path]);
      }}
    >
      <span
        className="folder"
        onClick={(e) => {
          onSelecteEle(e);
        }}
      >
        <FontAwesomeIcon className="icon-contents" icon={getIcon(fileName)} />
        {fileName}
      </span>
    </div>
  );
}

export default DisplayFile;
