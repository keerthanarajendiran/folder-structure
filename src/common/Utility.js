import _ from "lodash";
import {
  faImage,
  faVideo,
  faBarsStaggered,
} from "@fortawesome/free-solid-svg-icons";

export const findNode = (currentPath, dataTree) => {
  return currentPath.reduce((acc, key) => {
    if (!acc) return null;
    return Array.isArray(acc) ? acc[parseInt(key, 10)] : acc[key];
  }, dataTree);
};

export const addFile = (fileName, selectedPath, setData, setSelectedPath) => {
  if (!selectedPath.length || !document.querySelector(".selected-ele")) {
    alert("Please select a folder to add the file.");
    return;
  }
  if (typeof fileName !== "string") {
    fileName = prompt("Enter new file name:");
  }
  if (!fileName) return;
  setData((prevData) => {
    const updatedData = [...prevData];
    const folder = findNode(selectedPath, updatedData);
    if (Array.isArray(folder)) {
      if (!folder.includes(fileName)) {
        folder.push(fileName);
      }
    } else {
      let selectedPathRef = selectedPath;
      selectedPathRef.pop();
      setSelectedPath(selectedPathRef);
      addFile(fileName, selectedPathRef, setData, setSelectedPath);
    }
    return updatedData;
  });
};

export const addFolder = (
  folderName,
  selectedPath,
  setData,
  setSelectedPath
) => {
  if (!selectedPath.length || !document.querySelector(".selected-ele")) {
    alert("Please select a folder to add the folder.");
    return;
  }
  if (typeof folderName !== "string") {
    folderName = prompt("Enter new folder name:");
  }
  if (!folderName) return;
  setData((prevData) => {
    const updatedData = _.cloneDeep(prevData);
    const folder = findNode(selectedPath, updatedData);
    if (Array.isArray(folder)) {
      const existingFolder = folder.find(
        (item) => typeof item === "object" && item[folderName]
      );
      if (existingFolder) {
        alert("Folder with this name already exists!");
        return updatedData;
      }
      folder.push({ [folderName]: [] });
    } else if (typeof folder === "object" && !Array.isArray(folder)) {
      if (folder[folderName]) {
        alert("Folder with this name already exists!");
        return updatedData;
      }
      folder[folderName] = [];
    } else {
      let selectedPathRef = selectedPath;
      selectedPathRef.pop();
      setSelectedPath(selectedPathRef);
      addFolder(folderName, selectedPathRef, setData, setSelectedPath);
    }
    return updatedData;
  });
};

export const editName = (selectedPath, data, setData) => {
  if (!selectedPath.length || !document.querySelector(".selected-ele")) {
    alert("Please select a folder or file to edit.");
    return;
  }
  let targetText = document.querySelector(".selected-ele").textContent;
  const newName = prompt("Enter new name: ", targetText);
  if (!newName) return;
  setData((prevData) => {
    let updatedData = _.cloneDeep(prevData);
    let target = updatedData;
    let lastKey = selectedPath[selectedPath.length - 1];
    for (let i = 0; i < selectedPath.length - 1; i++) {
      target = target[selectedPath[i]];
    }
    if (typeof target[lastKey] === "object") {
      const item = target[lastKey];
      delete target[lastKey];
      target[newName] = item;
    } else if (typeof target[lastKey] === "string") {
      target[lastKey] = newName;
    }
    return updatedData;
  });
};

export const deleteFileOrFolder = (selectedPath, setData) => {
  if (!selectedPath.length || !document.querySelector(".selected-ele")) {
    alert("Please select a folder or file to delete.");
    return;
  }
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this item?"
  );
  if (!confirmDelete) return;
  setData((prevData) => {
    let updatedData = _.cloneDeep(prevData);
    let target = updatedData;
    let lastKey = selectedPath[selectedPath.length - 1];
    for (let i = 0; i < selectedPath.length - 1; i++) {
      target = target[selectedPath[i]];
    }
    if (Array.isArray(target)) {
      target.splice(lastKey, 1);
    } else if (typeof target === "object" && target !== null) {
      delete target[lastKey];
    }
    return updatedData;
  });
};

export const updateSelectedEle = (e, selectedEle, setSelectedEle) => {
  if (selectedEle) {
    selectedEle.classList.toggle("selected-ele");
  }

  if (e.target.className == "folder") {
    e.target.classList.toggle("selected-ele");
  } else {
    e.target.closest(".folder").classList.toggle("selected-ele");
  }

  setSelectedEle(e.target.closest(".folder"));
};

export const getIcon = (name) => {
  const ext = name.split(".").pop().toLowerCase();
  if (["jpg", "png", "gif"].includes(ext)) return faImage;
  if (["mp4", "mkv", "avi"].includes(ext)) return faVideo;

  return faBarsStaggered;
};

// Toggle folder expansion
export const toggleExpand = (folderName, setExpandedFolders) => {
  setExpandedFolders((prev) => ({
    ...prev,
    [folderName]: !prev[folderName],
  }));
};
