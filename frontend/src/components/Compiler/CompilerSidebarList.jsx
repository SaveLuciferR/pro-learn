import { useState } from "react";
import { Collapse } from "react-collapse";

import ProjectSvg from "../Project/ProjectSvg";
import {
    addCompilerTab,
    setCompilerCurrentFile,
    setCompilerCurrentFileName
} from "../../redux/Compiler/slice";
import {useDispatch} from "react-redux";


const CompilerSidebarList = ({ folder, compilerFiles, tab, localPath, showNav }) => {

    const dispatch = useDispatch();

    const [isOpenedFolder, setIsOpenedFolder] = useState(false);

    const getFilesStructure = Object.keys(compilerFiles).map((key) =>
        compilerFiles[key].type === "directory" ?
            <CompilerSidebarList
                key={compilerFiles[key].path}
                folder={key}
                compilerFiles={compilerFiles[key].children}
                tab={tab + 8}
                localPath={localPath + '/' + folder}
                showNav={(e, path, type, key) => showNav(e, path, type, key)}
            />
            :
            <div key={compilerFiles[key].path} onContextMenu={(e) => showNav(e, compilerFiles[key].path, 'file', key)} onClick={() => handleOnClickFile(key, compilerFiles[key])} style={{ paddingLeft: `${tab + 8}px` }}>
                <ProjectSvg type={"file"} />
                {key}
            </div>
    );

    const handleOnClickFolder = () => {
        setIsOpenedFolder(!isOpenedFolder);
    }

    const handleOnClickFile = (name, file) => {
        dispatch(setCompilerCurrentFile(file));
        dispatch(setCompilerCurrentFileName(name));

        const tab = {
            content: {
                file: file,
                name: name
            },
            tabIndex: file.path
        }

        dispatch(addCompilerTab(tab))
    }

    return (
        <>
            <div
                onContextMenu={(e) => showNav(e, localPath + '/' + folder, 'dir', folder)}
                onClick={() => handleOnClickFolder()} className="compiler__folder-main has-file" style={{ paddingLeft: `${tab}px` }}>
                <ProjectSvg type={"dir"} />
                {folder}
            </div>
            <Collapse isOpened={isOpenedFolder}>
                <div className="compiler__file" style={{ paddingLeft: `${tab}px` }}>
                    {getFilesStructure}
                </div>
            </Collapse>
        </>
    );
}

export default CompilerSidebarList;