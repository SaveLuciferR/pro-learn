import {Collapse} from 'react-collapse';
import {useCallback, useContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

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
    setUpdateFiles,
    setCurrentFolder,
    setNewFileInActionContext,
    setCurrentInputContent,
    setCanBeExistElementProject,
    setFileDeletingInActionContext,
    setNewFolderInActionContext,
    setPathCopyFileInAction,
    setTypeCopyFileInAction,
    setToCopyFileInAction,
} from '../../redux/Compiler/slice';
import CompilerSidebarList from './CompilerSidebarList';
import ProjectSvg from '../Project/ProjectSvg';
import CompilerContextMenu from './CompilerContextMenu';
import axiosClient from '../../axiosClient';
import {useParams} from 'react-router-dom';
import {VscCloudDownload, VscCollapseAll, VscNewFile, VscNewFolder, VscRefresh} from "react-icons/vsc";
import {FaFile} from "react-icons/fa";
import CompilerSidebarInput from "./CompilerSidebarInput";
import ReactDOM, {createRoot} from "react-dom/client";
import {createPortal} from "react-dom";
import {Context, ContextProvider} from "../../context";
import useKeypress from "../../hooks/useKeypress";
import LoadingElement from "../LoadingElement";
import {string} from "react-table/src/sortTypes";

const CompilerSidebar = ({titleProject, dockerIsLoading, taskIsLoading, canBeEdit}) => {
    const dispatch = useDispatch();
    // const {inputCompilerFileElement} = useContext(Context);

    const {username, project} = useParams();

    const compilerFiles = useSelector((state) => state.compiler.files);
    const tabs = useSelector((state) => state.compiler.tabs);
    const actionContext = useSelector((state) => state.compiler.actionContext);
    const typeContextMenu = useSelector((state) => state.compiler.typeContextMenu);
    const canRenameFile = useSelector((state) => state.compiler.canRenameFile);
    const saveRenameFile = useSelector((state) => state.compiler.saveRenameFile);
    const currentFolder = useSelector(state => state.compiler.currentFolder);
    const inputContent = useSelector(state => state.compiler.currentInputContent);
    const canBeExistElementProject = useSelector(state => state.compiler.canBeExistElementProject);

    const [portal, setPortal] = useState(null);


    const [isOpenedInfo, setIsOpenedInfo] = useState(true);
    const [isClosedInfoArrow, setIsClosedInfoArrow] = useState(false);

    const [isOpenedFiles, setIsOpenedFiles] = useState(true);
    const [isClosedFilesArrow, setIsClosedFilesArrow] = useState(false);

    const [isOpenedDependicies, setIsOpenedDependicies] = useState(true);
    const [isClosedDependiciesArrow, setIsClosedDependiciesArrow] = useState(false);

    const [context, setContext] = useState(false);
    const [xyPosition, setXYPosition] = useState({x: 0, y: 0});

    const deleteKey = useKeypress('delete');
    const saveKey = useKeypress()
    const renameKey = useKeypress();

    const onDel = useCallback(() => {
        if (deleteKey) {
            console.log('delete key')
        }
    }, [])

    const showNav = (event, pathIndex, type, name) => {
        event.preventDefault();
        setContext(false);
        const positionChange = {
            x: event.pageY,
            y: event.pageX,
        };
        let tempSavingFile = {
            path: pathIndex,
            body: findSavingFile(pathIndex),
        };
        // console.log(tempSavingFile)
        dispatch(setFileRenamingPathInActionContext(pathIndex));
        dispatch(setFileRenamingNameInActionContext(name));
        dispatch(setFileDeletingInActionContext(pathIndex));
        // console.log(actionContext.file.rename);
        dispatch(setFileSavingInActionContext(tempSavingFile));
        dispatch(setToCopyFileInAction({to: pathIndex}));
        // dispatch(setFileRenamingInActionContext(tempRenamingFile));
        setXYPosition(positionChange);
        setContext(true);
        dispatch(setTypeContextMenu(type));
    };

    const onSaveRenamingFile = (success) => {
        console.log(success);
        dispatch(setSaveRenameFile(success));
        dispatch(setCanRenameFile(false));
    };

    const findSavingFile = (pathIndex, files = compilerFiles) => {
        let body = '';
        let temp = '';
        Object.keys(files).map((key) => {
            // console.log(files[key].path, pathIndex)
            if (files[key].path === pathIndex) {
                console.log(files);
                temp = files[key].body;
            } else if (files[key].type === 'directory') {
                console.log(files[key].path, pathIndex)
                temp = findSavingFile(pathIndex, files[key].children);
            }
            if (temp !== '') {
                body = temp;
            }
            return '';
        });

        // console.log(temp)
        // console.log(body)

        return body;
    };

    useEffect(() => {
        // console.log(`canRenameFile: ${canRenameFile}\nsaveRenameFile: ${saveRenameFile}`);
        if (actionContext.action === 'copy' || actionContext.action === 'cut') return;
        if (actionContext.action !== 'rename' || (!canRenameFile && saveRenameFile)) {
            console.log(actionContext, inputContent);
            // console.log(actionContext);
            axiosClient
                .post('compiler/@' + username + '/' + project + '/' + actionContext.action, {
                    file: actionContext.file,
                    typeContextMenu,
                })
                .then(({data}) => {
                    console.log(data);
                    dispatch(setFileSavingInActionContext({body: '', path: ''}));
                    dispatch(setActionInActionContext(''));
                    dispatch(setFileRenamingNameInActionContext(''));
                    dispatch(setFileRenamingPathInActionContext(''));
                    dispatch(setNewFileInActionContext({name: '', path: '/'}))
                    dispatch(setUpdateFiles(true));
                    dispatch(setPathCopyFileInAction({path: ''}));
                    dispatch(setTypeCopyFileInAction({type: ''}));
                    dispatch(setToCopyFileInAction({to: ''}));
                    // setContext(false);
                })
                .catch((res) => {
                    dispatch(setFileSavingInActionContext({body: '', path: ''}));
                    dispatch(setActionInActionContext(''));
                    // setContext(false);
                    // console.log(res);
                });
        }
    }, [actionContext.action, saveRenameFile, canRenameFile]);

    const handleDragOver = (e) => {
        e.preventDefault();
        console.log(e.target)
        if (e.target.className === 'compiler__folder-main') {
            e.target.style.backgroundColor = '#fffff';
        }
    }

    const handleDragLeave = (e) => {

    }

    const handleDragEnd = (e) => {

    }

    const handleDragStart = (e) => {

    }

    const handleDrag = (e) => {
        e.preventDefault();
    }

    const getFilesStructure = Object.keys(compilerFiles).map((key) =>
        compilerFiles[key].type === 'directory' ? (
            <CompilerSidebarList
                key={compilerFiles[key].path}
                folder={key}
                compilerFiles={compilerFiles[key].children}
                tab={0}
                localPath={''}
                showNav={(e, path, type, key) => showNav(e, path, type, key)}
            />
        ) : (
            <div
                className={"compiler-sidebar-element_file"}
                key={compilerFiles[key].path}
                onContextMenu={(e) => showNav(e, compilerFiles[key].path, 'file', key)}
                onClick={() => handleOnClickFile(key, compilerFiles[key], '/')}
                style={{display: 'flex', alignItems: 'center', columnGap: '4px', margin: '2px 0'}}
                draggable={true}
                onDragOver={(e) => handleDragOver(e)}
                onDragLeave={(e) => handleDragLeave(e)}
                onDragEnd={(e) => handleDragEnd(e)}
                onDragStart={(e) => handleDragStart(e)}
                onDrop={(e) => handleDrag(e)}
            >
                <FaFile className={"icon-24"}/>
                {key}
            </div>
        ),
    );

    const handleOnClickFile = (name, file, path) => {
        dispatch(setCompilerCurrentFileName(name));
        dispatch(setCompilerCurrentFile(file));
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

    const checkUniqueElementName = (path, content) => {
        const splitPath = path.split('/')
        let canBeExist = true;
        splitPath.shift();
        if (splitPath[0] === '') {
            Object.keys(compilerFiles).map(item => {
                if (item.toLowerCase() === content.toLowerCase()) {
                    canBeExist = false;
                }
            });
            return canBeExist;
        } else {
            let folder = compilerFiles;
            splitPath.map(item => {
                if (folder) {
                    folder = folder[item].children;
                }
            })

            console.log(folder)

            Object.keys(folder).map(item => {
                // console.log(item, content)
                if (item.toLowerCase() === content.toLowerCase()) {
                    canBeExist = false;
                }
            });
            return canBeExist;
        }
    }

    const saveNewFile = (content) => {
        if (content !== '' && canBeExistElementProject && checkUniqueElementName(currentFolder, content)) {
            dispatch(setNewFileInActionContext({name: content, path: currentFolder}));
            dispatch(setActionInActionContext('new-file'));
        }

        removeNewElement();
    }

    const saveNewFolder = (content) => {
        if (content !== '' && canBeExistElementProject && checkUniqueElementName(currentFolder, content)) {
            dispatch(setNewFolderInActionContext({name: content, path: currentFolder}));
            dispatch(setActionInActionContext('new-folder'));
        }

        removeNewElement();
    }

    const removeNewElement = () => {
        setPortal(null);
        dispatch(setCurrentInputContent(''));
    }

    const handleAddNewFile = () => {
        const folder = document.querySelector(`[data-project-element="${currentFolder}"]`);

        if (folder) {
            const input = <CompilerSidebarInput
                key={Date.now()}
                saveData={saveNewFile}
                removeData={removeNewElement}
            />

            const temp = createPortal(input, folder);
            setPortal(temp);
        }
    }

    const handleAddNewFolder = () => {
        const folder = document.querySelector(`[data-project-element="${currentFolder}"]`);

        if (folder) {
            const input = <CompilerSidebarInput
                key={Date.now()}
                saveData={saveNewFolder}
                removeData={removeNewElement}
            />

            const temp = createPortal(input, folder);
            setPortal(temp);
        }
    }

    useEffect(() => {
        if (inputContent !== '') {
            dispatch(setCanBeExistElementProject(checkUniqueElementName(currentFolder, inputContent)));
            console.log(canBeExistElementProject);
        }
    }, [inputContent])

    useEffect(() => {
        const handleClick = () => setContext(false);
        window.addEventListener('click', handleClick);
        return () => {
            window.removeEventListener('click', handleClick);
        };
    });

    return (
        <div className="compiler-sidebar">
            <div className="compiler-sidebar-container scroll">
                <div className={"compiler-sidebar-container-absolute"}>
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
                                className={`compiler-sidebar-arrow${isClosedInfoArrow ? ' active' : ''}`}
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
                            <div className="compiler-sidebar-info-main">
                                {/*{console.log(titleProject)}*/}
                                {titleProject}
                            </div>
                        </Collapse>
                    </div>
                    <hr className={'markdown-hr'}/>
                    <div className="compiler-sidebar-files">
                        <ContextProvider>
                            <div className={"collapse-header"}>
                                <button
                                    type="button"
                                    className="compiler-sidebar-tab-button"
                                    onClick={() => {
                                        setIsOpenedFiles(!isOpenedFiles);
                                        setIsClosedFilesArrow(!isClosedFilesArrow);
                                    }}>
                                    <svg
                                        className={`compiler-sidebar-arrow${isClosedFilesArrow ? ' active' : ''}`}
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
                                    <p>Files</p>
                                </button>
                                {canBeEdit &&
                                    <div className={"collapse-header-buttons"}>
                                        {/*<button onClick={() => {*/}
                                        {/*}} className={"btn btn-without_text"}>*/}
                                        {/*    <VscCloudDownload/></button>*/}
                                        <button onClick={() => handleAddNewFile()} className={"btn btn-without_text"}>
                                            <VscNewFile/>
                                        </button>
                                        <button onClick={() => handleAddNewFolder()} className={"btn btn-without_text"}>
                                            <VscNewFolder/></button>
                                        {/*<button onClick={() => {*/}
                                        {/*}} className={"btn btn-without_text"}>*/}
                                        {/*    <VscRefresh/>*/}
                                        {/*</button>*/}
                                        {/*<button onClick={() => {*/}
                                        {/*}} className={"btn btn-without_text"}>*/}
                                        {/*    <VscCollapseAll/></button>*/}
                                    </div>
                                }
                            </div>
                            <Collapse isOpened={isOpenedFiles}>
                                <div className="compiler-sidebar-files-main scroll" data-project-element={'/'}>
                                    {Object.keys(compilerFiles).length !== 0 ? getFilesStructure :
                                        <div>Файлов нет...</div>}
                                </div>
                            </Collapse>
                            {portal}
                        </ContextProvider>
                    </div>
                    <hr className={'markdown-hr'}/>
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
                                className={`compiler-sidebar-arrow${isClosedDependiciesArrow ? ' active' : ''}`}
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
                            {/*<div className="compiler-sidebar-dependcies-main">aboba2</div>*/}
                        </Collapse>
                    </div>
                    {/* //TODO Удалить input для переименования */}
                    <div className="compiler-sidebar-rename">
                        <input
                            className="compiler-sidebar-rename-input"
                            value={actionContext.file.rename.newName}
                            onChange={(e) => dispatch(setFileRenamingNameInActionContext(e.target.value))}
                            type="text"
                            disabled={!canRenameFile}
                        />
                        <svg
                            className="compiler-sidebar-rename-button"
                            onClick={() => onSaveRenamingFile(true)}
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                        >
                            <circle cx="9" cy="9" r="7.5" stroke="#2EA043"/>
                            <path
                                d="M6.375 9.375L7.875 10.875L11.625 7.125"
                                stroke="#2EA043"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <svg
                            className="compiler-sidebar-rename-button"
                            onClick={() => onSaveRenamingFile(false)}
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                        >
                            <circle cx="9" cy="9" r="7.5" stroke="#DB5B42"/>
                            <path
                                d="M10.875 7.12502L7.125 10.875M7.12498 7.125L10.875 10.875"
                                stroke="#DB5B42"
                                stroke-linecap="round"
                            />
                        </svg>
                    </div>
                    {dockerIsLoading ?
                        <div>
                            <p>Контейнер запускается</p>
                            <LoadingElement/>
                        </div>
                        :
                        <></>
                    }
                    {taskIsLoading ?
                        <div>
                            <p>Запуск задачи</p>
                            <LoadingElement/>
                        </div>
                        :
                        <></>
                    }
                </div>
            </div>
            <CompilerContextMenu canBeEdit={canBeEdit} context={context} setContext={(v) => setContext(v)}
                                 xyPos={xyPosition}/>
        </div>
    );
};

export default CompilerSidebar;
