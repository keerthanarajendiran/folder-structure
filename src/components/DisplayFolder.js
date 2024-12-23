import React from "react";
import Folder from "./Folder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { toggleExpand } from "../common/Utility";

function DisplayFolder({
  data,
  onUpdate,
  folderNameorFileName,
  onSelect,
  onSelecteEle,
  expandedFolders,
  path,
  setExpandedFolders,
  selectedPath,
  onSelectAddFileFolder,
}) {
  return (
    <div
      key={folderNameorFileName}
      className="folder-container"
      onClick={(e) => {
        e.stopPropagation();
        onSelect([...path]);
        onSelectAddFileFolder([...path]);
        toggleExpand(folderNameorFileName, setExpandedFolders);
      }}
    >
      <div
        className="folder"
        onClick={(e) => {
          onSelecteEle(e);
        }}
      >
        <span className="icon-contents">
          {expandedFolders[folderNameorFileName] ? (
            <FontAwesomeIcon icon={faChevronDown} />
          ) : (
            <FontAwesomeIcon icon={faChevronRight} />
          )}
        </span>
        {folderNameorFileName}
      </div>
      {expandedFolders[folderNameorFileName] && (
        <Folder
          data={data}
          onUpdate={onUpdate}
          path={[...path]}
          selectedPath={selectedPath}
          onSelect={onSelect}
          onSelecteEle={onSelecteEle}
          onSelectAddFileFolder={onSelectAddFileFolder}
        />
      )}
    </div>
  );
}

export default DisplayFolder;
