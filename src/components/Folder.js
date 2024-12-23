import React, { useState } from "react";
import DisplayFolder from "./DisplayFolder";
import DisplayFile from "./DisplayFile";
// Utility to determine file type based on extension

const Folder = ({
  data,
  onUpdate,
  path,
  selectedPath,
  onSelect,
  onSelecteEle,
  onSelectAddFileFolder,
}) => {
  const [expandedFolders, setExpandedFolders] = useState({});

  // Get the current data at the given path
  const currentData = path.reduce((acc, key) => acc[key], data);

  // Render the content based on whether it's an array or object
  const renderContent = () => {
    if (Array.isArray(currentData)) {
      return currentData.map((item, index) => {
        if (typeof item === "object" && !Array.isArray(item)) {
          // If item is an object, it's a folder

          return Object.keys(item).map((foldername) => {
            const folderName = foldername;
            return (
              <DisplayFolder
                folderNameorFileName={folderName}
                data={data}
                onUpdate={onUpdate}
                path={[...path, index, folderName]}
                selectedPath={selectedPath}
                onSelect={onSelect}
                onSelectAddFileFolder={onSelectAddFileFolder}
                onSelecteEle={onSelecteEle}
                setExpandedFolders={setExpandedFolders}
                expandedFolders={expandedFolders}
              />
            );
          });
        } else {
          // If item is a file (string)
          return (
            <DisplayFile
              path={[...path, index]}
              fileName={item}
              indexorKey={index}
              onSelect={onSelect}
              onSelectAddFileFolder={onSelectAddFileFolder}
              onSelecteEle={onSelecteEle}
            />
          );
        }
      });
    }

    return Object.keys(currentData).map((key) => {
      const value = currentData[key];
      const isFolder = typeof value === "object";

      if (isFolder) {
        // Render folder
        return (
          <DisplayFolder
            folderNameorFileName={key}
            data={data}
            onUpdate={onUpdate}
            path={[...path, key]}
            selectedPath={selectedPath}
            onSelect={onSelect}
            onSelectAddFileFolder={onSelectAddFileFolder}
            onSelecteEle={onSelecteEle}
            setExpandedFolders={setExpandedFolders}
            expandedFolders={expandedFolders}
          />
        );
      } else {
        // Render file
        return (
          <DisplayFile
            path={[...path, key]}
            fileName={item}
            indexorKey={index}
            onSelectAddFileFolder={onSelectAddFileFolder}
            onSelect={onSelect}
            onSelecteEle={onSelecteEle}
          />
        );
      }
    });
  };

  return <div>{renderContent()}</div>;
};

export default Folder;
