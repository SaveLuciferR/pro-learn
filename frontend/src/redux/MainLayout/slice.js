import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    userAuth: false,
    user: [],
    sidebarProfileActive: false,
    needReloadPage: true,
    activeSidebar: true,
    activeContainer: true,
    feedbackCategories: [],
    languages: {}
    // userTokenSession: localStorage.getItem('userTokenSession'),
}


export const mainLayout = createSlice({
        name: "mainLayout",
        initialState: initialState,
        reducers: {
            setUserAuth(state, action) {
                state.userAuth = action.payload;
            },
            setUser(state, action) {
                state.user = action.payload;
            },
            setSidebarProfileActive(state, action) {
                state.sidebarProfileActive = action.payload;
            },
            setNeedReloadPage (state, action) {
                state.needReloadPage = action.payload;
            },
            setActiveSidebar (state, action) {
                state.activeSidebar = action.payload;
            },
            setFeedbackCategory (state, action) {
                state.feedbackCategories = action.payload;
            },
            setLanguages(state, action) {
              state.languages = action.payload;
            }
            // setUserSession(state, action) {
            //     state.userAuth = action.payload;
            // }
        }
    })
;

export const {
    setUserAuth,
    setUser,
    setSidebarProfileActive,
    setNeedReloadPage,
    setActiveSidebar,
    setFeedbackCategory,
    setLanguages
} = mainLayout.actions;

export default mainLayout.reducer;