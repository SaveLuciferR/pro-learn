import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    bestBlogItems: [],
    slideIndex: 0,
    touchPosition: null,
}


export const blogSlice = createSlice({
        name: "blog",
        initialState: initialState,
        reducers: {
            setBestBlogItems(state, action) {
                state.bestBlogItems = action.payload;
            },
            setSlideIndex(state, action) {
                state.slideIndex = action.payload;
            },
            setTouchPosition(state, action) {
                state.touchPosition = action.payload;
            },
        }
    })
;

export const {
    setBestBlogItems,
    setSlideIndex,
    setTouchPosition,

} = blogSlice.actions;

export default blogSlice.reducer;