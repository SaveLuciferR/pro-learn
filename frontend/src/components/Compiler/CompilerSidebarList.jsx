import { useState } from 'react';
import { Collapse } from 'react-collapse';

import ProjectSvg from '../Project/ProjectSvg';
import {
  addCompilerTab,
  setCompilerCurrentFile,
  setCompilerCurrentFileName,
  setCurrentFolder,
} from '../../redux/Compiler/slice';
import { useDispatch } from 'react-redux';
import { FaFile, FaFolder, FaFolderOpen } from 'react-icons/fa';

const CompilerSidebarList = ({ folder, compilerFiles, tab, localPath, showNav }) => {
  const dispatch = useDispatch();

  const [isOpenedFolder, setIsOpenedFolder] = useState(false);

  const getFilesStructure = Object.keys(compilerFiles).map((key) =>
    compilerFiles[key].type === 'directory' ? (
      <CompilerSidebarList
        key={compilerFiles[key].path}
        folder={key}
        compilerFiles={compilerFiles[key].children}
        tab={tab + 8}
        localPath={localPath + '/' + folder}
        showNav={(e, path, type, key) => showNav(e, path, type, key)}
      />
    ) : (
      <div
        draggable={true}
        className={'compiler-sidebar-element_file'}
        data-project-element={localPath + '/' + folder}
        key={compilerFiles[key].path}
        onContextMenu={(e) => showNav(e, compilerFiles[key].path, 'file', key)}
        onClick={() => handleOnClickFile(key, compilerFiles[key], localPath + '/' + folder)}
        style={{
          paddingLeft: `${tab + 8}px`,
          display: 'flex',
          columnGap: '4px',
          alignItems: 'center',
          margin: '2px 0',
        }}
      >
        <FaFile className={'icon-24'} />
        {key}
      </div>
    ),
  );

  const handleOnClickFolder = (path) => {
    setIsOpenedFolder(!isOpenedFolder);
    dispatch(setCurrentFolder(path));
  };

  const handleOnClickFile = (name, file, path) => {
    dispatch(setCompilerCurrentFile(file));
    dispatch(setCompilerCurrentFileName(name));
    dispatch(setCurrentFolder(path));

    const tab = {
      content: {
        file: file,
        name: name,
      },
      tabIndex: file.path,
    };

    dispatch(addCompilerTab(tab));
  };

  return (
    <>
      <div
        draggable={true}
        onContextMenu={(e) => showNav(e, localPath + '/' + folder, 'dir', folder)}
        onClick={() => handleOnClickFolder(localPath + '/' + folder)}
        className="compiler__folder-main has-file compiler-sidebar-element_file"
        style={{
          paddingLeft: `${tab}px`,
          display: 'flex',
          columnGap: '4px',
          alignItems: 'center',
          margin: '2px 0',
        }}
      >
        {isOpenedFolder ? (
          <FaFolderOpen className={'icon-24'} />
        ) : (
          <FaFolder className={'icon-24'} />
        )}
        {folder}
      </div>
      <Collapse isOpened={isOpenedFolder}>
        <div
          className="compiler__file"
          style={{ paddingLeft: `${tab}px` }}
          data-project-element={localPath + '/' + folder}
        >
          {getFilesStructure}
        </div>
      </Collapse>
    </>
  );
};

export default CompilerSidebarList;
