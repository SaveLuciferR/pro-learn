import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    terminalContent: [
        "     __   __   __           ___       __       \n" +
        "    |__) |__) /  \\ __ |    |__   /\\  |__) |\\ | \n" +
        "___ |    |  \\ \\__/    |___ |___ /~~\\ |  \\ | \\| \n" +
        "                                               ",
        "Welcome to the Online Editor from the pro-learn team!"
    ],
    shouldBeRunAtStart: false,
    tasks: {},
    workspaceUser: 'workspace $user1:',
    files: {},
    currentFile: {
        file: {
            body: '',
            language: '',
            path: '',
            type: ''
        },
        name: '',
        tabIndex: ""
    },
    tabs: {},
    activeTab: "",
    actionContext: {
        action: "",
        file: {
            save: {
                path: "",
            },
            delete: {},
            rename: {
                path: "",
                newName: "",
            }
        }
    },
    needReloadFrameCompiler: true,
    // outputFrame: '',
    typeContextMenu: 'file',
    canRenameFile: false,
    saveRenameFile: false,
    updateFiles: true,
    eventPointerFrame: true,
}


export const compilerSlice = createSlice({
        name: "compiler",
        initialState: initialState,
        reducers: {
            addTerminalContent(state, action) {
                state.terminalContent.push(action.payload);
            },
            setWorkspaceUser(state, action) {
                state.workspaceUser = action.payload;
            },
            setShouldBeRunAtStart(state, action) {
                state.shouldBeRunAtStart = action.payload;
            },
            setTasksProject(state, action) {
              state.tasks = action.payload;
            },
            setCompilerFiles(state, action) {
                state.files = action.payload;
            },
            setNewBodyCompilerFiles(state, action) {
                const onChangeBodyFile = (files = state.files) => {
                    let tempFiles = files
                    // console.log(files);
                    Object.keys(tempFiles).forEach(key => {
                        if (tempFiles[key].type === 'directory') {
                            tempFiles[key].children = onChangeBodyFile(tempFiles[key].children);
                        }
                        if (tempFiles[key].path === action.payload.pathIndex) {
                            // console.log(tempFiles[key])
                            tempFiles[key].body = action.payload.value;
                            console.log(tempFiles[key].body);
                        }
                    })

                    return tempFiles;
                }

                state.files = onChangeBodyFile();
            },
            setCompilerCurrentFileName(state, action) {
                state.currentFile.name = action.payload;
            }
            ,
            setCompilerCurrentFile(state, action) {
                state.currentFile.file = action.payload;
            }
            ,
            setCompilerTabIndex(state, action) {
                state.currentFile.tabIndex = action.payload;
            }
            ,
            addCompilerTab(state, action) {
                state.tabs[action.payload.tabIndex] = action.payload.content;
            }
            ,
            deleteCompilerTab(state, action) {
                delete state.tabs[action.payload];
            }
            ,
            setActiveTab(state, action) {
                state.activeTab = action.payload;
            }
            ,
            setActionInActionContext(state, action) {
                state.actionContext.action = action.payload;
            }
            ,
            setFileSavingInActionContext(state, action) {
                state.actionContext.file.save = action.payload;
            },
            setFileDeletingInActionContext(state, action) {
                state.actionContext.file.delete = action.payload;
            },
            setFileRenamingPathInActionContext(state, action) {
                state.actionContext.file.rename.path = action.payload;
            },
            setFileRenamingNameInActionContext(state, action) {
                state.actionContext.file.rename.newName = action.payload;
            },
            setTypeContextMenu(state, action) {
                state.typeContextMenu = action.payload;
            },
            setCanRenameFile(state, action) {
                state.canRenameFile = action.payload;
            },
            setSaveRenameFile(state, action) {
                state.saveRenameFile = action.payload;
            },
            setUpdateFiles(state, action) {
                state.updateFiles = action.payload;
            },
            setNeedReloadFrameCompiler(state, action) {
                state.needReloadFrameCompiler = action.payload;
            },
            setEventPointerFrame(state, action) {
                state.eventPointerFrame = action.payload;
            },
        }
    })
;

export const {
    addTerminalContent,
    setWorkspaceUser,
    setCompilerFiles,
    setShouldBeRunAtStart,
    setTasksProject,
    setNewBodyCompilerFiles,
    setCompilerCurrentFileName,
    setCompilerCurrentFile,
    setCompilerTabIndex,
    addCompilerTab,
    deleteCompilerTab,
    setActiveTab,
    setActionInActionContext,
    setFileSavingInActionContext,
    setFileDeletingInActionContext,
    setFileRenamingPathInActionContext,
    setFileRenamingNameInActionContext,
    setTypeContextMenu,
    setCanRenameFile,
    setSaveRenameFile,
    setUpdateFiles,
    setNeedReloadFrameCompiler,
    setEventPointerFrame,
} = compilerSlice.actions;

export default compilerSlice.reducer;