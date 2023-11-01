import {createSlice} from '@reduxjs/toolkit';

const initialState = {
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
        file: {}
    },
    typeContextMenu: 'file'
}


export const compilerSlice = createSlice({
        name: "compiler",
        initialState: initialState,
        reducers: {
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

                state.files = onChangeBodyFile()
                // console.log(state.files)
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
            setFileInActionContext(state, action) {
                state.actionContext.file = action.payload;
            },
            setTypeContextMenu(state, action) {
                state.typeContextMenu = action.payload;
            }
        }
    })
;

export const {
    setCompilerFiles,
    setNewBodyCompilerFiles,
    setCompilerCurrentFileName,
    setCompilerCurrentFile,
    setCompilerTabIndex,
    addCompilerTab,
    deleteCompilerTab,
    setActiveTab,
    setActionInActionContext,
    setFileInActionContext,
    setTypeContextMenu,
} = compilerSlice.actions;

export default compilerSlice.reducer;