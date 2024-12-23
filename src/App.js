import React, { useState } from "react";
import Folder from "./components/Folder";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileCirclePlus,
  faFolderPlus,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import {
  addFile,
  addFolder,
  editName,
  deleteFileOrFolder,
  updateSelectedEle,
} from "./common/Utility";
import { initialData } from "./sampleData/InputData";
import "./styles.css";

const App = () => {
  const [data, setData] = useState(initialData);
  const [selectedPathEditDelete, setSelectedPathEditDelete] = useState([]);
  const [selectedPathAddFileFolder, setSelectedPathAddFileFolder] = useState(
    []
  );
  const [selectedEle, setSelectedEle] = useState(null);

  return (
    <div id="app-container">
      <div id="top-container">
        <div id="toolbar">
          <h1 className="title">Evaluation</h1>
          <div>
            <FontAwesomeIcon
              onClick={() =>
                addFile(
                  null,
                  selectedPathAddFileFolder,
                  setData,
                  setSelectedPathAddFileFolder
                )
              }
              title="Add File"
              icon={faFileCirclePlus}
              className="icon-contents"
            />
            <FontAwesomeIcon
              onClick={() =>
                addFolder(
                  null,
                  selectedPathAddFileFolder,
                  setData,
                  setSelectedPathAddFileFolder
                )
              }
              title="Add Folder"
              icon={faFolderPlus}
              className="icon-contents"
            />
            {selectedEle && (
              <>
                <FontAwesomeIcon
                  onClick={() =>
                    editName(selectedPathEditDelete, data, setData)
                  }
                  title="Add File/Folder Name"
                  icon={faPenToSquare}
                  className="icon-contents"
                />
                <FontAwesomeIcon
                  onClick={() =>
                    deleteFileOrFolder(selectedPathEditDelete, setData)
                  }
                  title="Delete File/Folder"
                  icon={faTrash}
                  className="icon-contents"
                />
              </>
            )}
          </div>
        </div>

        {/* Folder Component */}
        <div className="folder-top-container">
          <Folder
            data={data}
            onUpdate={setData}
            path={[]}
            selectedPath={selectedPathEditDelete}
            onSelect={setSelectedPathEditDelete}
            onSelectAddFileFolder={setSelectedPathAddFileFolder}
            onSelecteEle={(e) =>
              updateSelectedEle(
                e,
                selectedEle,
                setSelectedEle
                // selectedPathEditDelete,
                // setSelectedPathAddFileFolder
              )
            }
          />
        </div>
      </div>
    </div>
  );
};

export default App;
