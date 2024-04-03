import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sliderItems: [],
  slideIndex: 0,
  touchPosition: null,
};

export const sliderSlice = createSlice({
  name: 'slider',
  initialState: initialState,
  reducers: {
    setSliderItems(state, action) {
      state.sliderItems = action.payload;
    },
    setSlideIndex(state, action) {
      state.slideIndex = action.payload;
    },
    setTouchPosition(state, action) {
      state.touchPosition = action.payload;
    },
  },
});

export const { setSliderItems, setSlideIndex, setTouchPosition } = sliderSlice.actions;

export default sliderSlice.reducer;
