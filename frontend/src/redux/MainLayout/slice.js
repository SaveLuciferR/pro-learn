import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    userAuth: false,
    user: [],
    sidebarProfileActive: false,
    needReloadPage: true,
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
} = mainLayout.actions;

export default mainLayout.reducer;