import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    userAuth: false,
    // userTokenSession: localStorage.getItem('userTokenSession'),
}


export const mainLayout = createSlice({
        name: "mainLayout",
        initialState: initialState,
        reducers: {
            setUserAuth(state, action) {
                state.userAuth = action.payload;
            },
            // setUserSession(state, action) {
            //     state.userAuth = action.payload;
            // }
        }
    })
;

export const {
    setUserAuth,

} = mainLayout.actions;

export default mainLayout.reducer;