import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    userAuth: false,
    user: [],
    needActivateAccount: false,
    sidebarProfileActive: false,
    needReloadPage: true,
    activeSidebar: true,
    activeContainer: true,
    feedbackCategories: [],
    languages: {},
    currentLang: '',
    // userTokenSession: localStorage.getItem('userTokenSession'),
}


export const mainLayout = createSlice({
        name: "mainLayout",
        initialState: initialState,
        reducers: {
            setUserAuth(state, action) {
                state.userAuth = action.payload;
            },
            setNeedActivateAccount(state, action) {
                state.needActivateAccount = action.payload;
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
            },
            setCurrentLanguage(state, action) {
                state.currentLang = action.payload === undefined ? "" : action.payload;
            },
            // setUserSession(state, action) {
            //     state.userAuth = action.payload;
            // }
        }
    })
;

export const {
    setUserAuth,
    setNeedActivateAccount,
    setUser,
    setSidebarProfileActive,
    setNeedReloadPage,
    setActiveSidebar,
    setFeedbackCategory,
    setLanguages,
    setCurrentLanguage
} = mainLayout.actions;

export default mainLayout.reducer;