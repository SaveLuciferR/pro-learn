import {Collapse} from "react-collapse";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {
    setCompilerCurrentFileName,
    setCompilerCurrentFile,
    addCompilerTab,
    setActiveTab,
    setActionInActionContext,
    setTypeContextMenu,
    setFileSavingInActionContext,
    setFileRenamingNameInActionContext,
    setFileRenamingPathInActionContext,
    setSaveRenameFile,
    setCanRenameFile,
    setUpdateFiles
} from "../../redux/Compiler/slice";
import CompilerSidebarList from "./CompilerSidebarList";
import ProjectSvg from "../Project/ProjectSvg";
import CompilerContextMenu from "./CompilerContextMenu";
import axiosClient from "../../axiosClient";
import {useParams} from "react-router-dom";

const CompilerSidebar = () => {

    const dispatch = useDispatch();

    const {project} = useParams();
    const username = "user1";

    const compilerFiles = useSelector(state => state.compiler.files);
    const tabs = useSelector(state => state.compiler.tabs);
    const actionContext = useSelector(state => state.compiler.actionContext);
    const typeContextMenu = useSelector(state => state.compiler.typeContextMenu);
    const canRenameFile = useSelector(state => state.compiler.canRenameFile);
    const saveRenameFile = useSelector(state => state.compiler.saveRenameFile);

    const [isOpenedInfo, setIsOpenedInfo] = useState(true);
    const [isClosedInfoArrow, setIsClosedInfoArrow] = useState(false);

    const [isOpenedFiles, setIsOpenedFiles] = useState(true);
    const [isClosedFilesArrow, setIsClosedFilesArrow] = useState(false);

    const [isOpenedDependicies, setIsOpenedDependicies] = useState(true);
    const [isClosedDependiciesArrow, setIsClosedDependiciesArrow] = useState(false);

    const [context, setContext] = useState(false);
    const [xyPosition, setXYPosition] = useState({x: 0, y: 0});

    const showNav = (event, pathIndex, type, name) => {
        event.preventDefault();
        setContext(false);
        const positionChange = {
            x: event.pageX,
            y: event.pageY,
        };
        let tempSavingFile = {
            path: pathIndex,
            body: findSavingFile(pathIndex),
        };
        dispatch(setFileRenamingPathInActionContext(pathIndex));
        dispatch(setFileRenamingNameInActionContext(name));
        console.log(actionContext.file.rename);
        dispatch(setFileSavingInActionContext(tempSavingFile));
        // dispatch(setFileRenamingInActionContext(tempRenamingFile));
        setXYPosition(positionChange);
        setContext(true);
        dispatch(setTypeContextMenu(type));
    }

    const onSaveRenamingFile = (success) => {
        console.log(success);
        dispatch(setSaveRenameFile(success));
        dispatch(setCanRenameFile(false));
    }

    const findSavingFile = (pathIndex, files = compilerFiles) => {
        let body = "";
        Object.keys(files).map(key => {
            if (files[key].type === 'directory') {
                body = findSavingFile(pathIndex, files[key].children);
            }
            if (files[key].path === pathIndex) {
                body = files[key].body;
            }
        })

        return body;
    }

    useEffect(() => {
        console.log(`canRenameFile: ${canRenameFile}\nsaveRenameFile: ${saveRenameFile}`)
        if (actionContext.action !== 'rename' || (!canRenameFile && saveRenameFile)) {
            console.log(actionContext);
            axiosClient.post("compiler/@" + username + "/" + project + "/" + actionContext.action, {
                file: actionContext.file,
                typeContextMenu
            })
                .then(({data}) => {
                    console.log(data);
                    dispatch(setFileSavingInActionContext({body: "", path: ""}));
                    dispatch(setActionInActionContext(""));
                    dispatch(setFileRenamingNameInActionContext(""));
                    dispatch(setFileRenamingPathInActionContext(""));
                    dispatch(setUpdateFiles(true));
                    // setContext(false);
                })
                .catch((res) => {
                    dispatch(setFileSavingInActionContext({body: "", path: ""}));
                    dispatch(setActionInActionContext(""));
                    // setContext(false);
                    console.log(res);
                })
        }
    }, [actionContext.action, saveRenameFile, canRenameFile]);

    const getFilesStructure = Object.keys(compilerFiles).map((key) =>
        compilerFiles[key].type === "directory" ?
            <CompilerSidebarList key={compilerFiles[key].path}
                                 folder={key}
                                 compilerFiles={compilerFiles[key].children}
                                 tab={0}
                                 localPath={''}
                                 showNav={(e, path, type, key) => showNav(e, path, type, key)}/>
            :
            <div key={compilerFiles[key].path}
                 onContextMenu={(e) => showNav(e, compilerFiles[key].path, 'file', key)}
                 onClick={() => handleOnClickFile(key, compilerFiles[key])}>
                <ProjectSvg type={"file"}/>
                {key}
            </div>
    );

    const handleOnClickFile = (name, file) => {
        dispatch(setCompilerCurrentFileName(name));
        dispatch(setCompilerCurrentFile(file));

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
        <div className="compiler-sidebar scroll">
            <div className="compiler-sidebar-container">
                <div className="compiler-sidebar-info">
                    <button
                        type="button"
                        className="compiler-sidebar-tab-button"
                        onClick={() => {
                            setIsOpenedInfo(!isOpenedInfo);
                            setIsClosedInfoArrow(!isClosedInfoArrow);
                        }}
                    >
                        <svg
                            className={`compiler-sidebar-arrow${isClosedInfoArrow ? " active" : ""
                            }`}
                            width="21"
                            height="21"
                            viewBox="0 0 21 21"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M16.625 7.875L10.5 13.125L4.375 7.875"
                                stroke="white"
                                strokeOpacity="0.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        Info
                    </button>
                    <Collapse isOpened={isOpenedInfo}>
                        <div className="compiler-sidebar-info-main">aboba</div>
                    </Collapse>
                </div>
                <div className="compiler-sidebar-files">
                    <button
                        type="button"
                        className="compiler-sidebar-tab-button"
                        onClick={() => {
                            setIsOpenedFiles(!isOpenedFiles);
                            setIsClosedFilesArrow(!isClosedFilesArrow);
                        }}
                    >
                        <svg
                            className={`compiler-sidebar-arrow${isClosedFilesArrow ? " active" : ""
                            }`}
                            width="21"
                            height="21"
                            viewBox="0 0 21 21"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M16.625 7.875L10.5 13.125L4.375 7.875"
                                stroke="white"
                                strokeOpacity="0.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        Files
                    </button>
                    <Collapse isOpened={isOpenedFiles}>
                        <div className="compiler-sidebar-files-main">
                            {Object.keys(compilerFiles).length !== 0 ?
                                getFilesStructure
                                :
                                <div>Loading...</div>
                            }
                        </div>
                    </Collapse>
                </div>
                <div className="compiler-sidebar-dependicies">
                    <button
                        type="button"
                        className="compiler-sidebar-tab-button"
                        onClick={() => {
                            setIsOpenedDependicies(!isOpenedDependicies);
                            setIsClosedDependiciesArrow(!isClosedDependiciesArrow);
                        }}
                    >
                        <svg
                            className={`compiler-sidebar-arrow${isClosedDependiciesArrow ? " active" : ""
                            }`}
                            width="21"
                            height="21"
                            viewBox="0 0 21 21"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M16.625 7.875L10.5 13.125L4.375 7.875"
                                stroke="white"
                                strokeOpacity="0.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        Dependices
                    </button>
                    <Collapse isOpened={isOpenedDependicies}>
                        <div className="compiler-sidebar-dependcies-main">aboba2</div>
                    </Collapse>
                    <CompilerContextMenu context={context} setContext={(v) => setContext(v)} xyPos={xyPosition}/>
                    <div>
                        <input
                            value={actionContext.file.rename.newName}
                            onChange={(e) => dispatch(setFileRenamingNameInActionContext(e.target.value))}
                            type="text"
                            disabled={!canRenameFile}/>
                        <svg
                            onClick={() => onSaveRenamingFile(true)}
                            xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <circle cx="9" cy="9" r="7.5" stroke="#2EA043"/>
                            <path d="M6.375 9.375L7.875 10.875L11.625 7.125" stroke="#2EA043" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <svg
                            onClick={() => onSaveRenamingFile(false)}
                            xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <circle cx="9" cy="9" r="7.5" stroke="#DB5B42"/>
                            <path d="M10.875 7.12502L7.125 10.875M7.12498 7.125L10.875 10.875" stroke="#DB5B42" stroke-linecap="round"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompilerSidebar;
