import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    readmeFileInAddProject: "",
    filesAddProject: [],
    newTableAddProject: false,
    secondaryPathProjectAddProject: undefined,
    mainFolderAddProject: "",
    mainFolderNewFileAddProject: "",
    newFilesAddProject: [],
    addNewFiles: false,

}


export const project = createSlice({
        name: "project",
        initialState: initialState,
        reducers: {
            setReadmeFileInAddProject(state, action) {
                state.readmeFileInAddProject = action.payload;
            },
            setFilesAddProject(state, action) {
                state.filesAddProject = action.payload;
            },
            setNewTableAddProject (state, action) {
                state.newTableAddProject = action.payload;
            },
            setSecondaryPathProjectAddProject(state, action) {
                state.secondaryPathProjectAddProject = action.payload;
            },
            setMainFolderAddProject(state, action) {
                state.mainFolderAddProject = action.payload;
            },
            setNewFilesAddProject(state, action) {
                state.newFilesAddProject = action.payload;
            },
            setMainFolderNewFileAddProject (state, action) {
                state.mainFolderNewFileAddProject = action.payload;
            },
            setAddNewFiles (state, action) {
                state.addNewFiles = action.payload;
            }
        }
    })
;

export const {
    setReadmeFileInAddProject,
    setFilesAddProject,
    setNewTableAddProject,
    setSecondaryPathProjectAddProject,
    setMainFolderAddProject,
    setNewFilesAddProject,
    setMainFolderNewFileAddProject,
    setAddNewFiles,
} = project.actions;

export default project.reducer;