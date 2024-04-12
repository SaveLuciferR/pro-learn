import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showWindow: true,
  titleText: '',
  contentText: '',
  iconType: '',
  showButtons: true,
  showContent: true,
  showIcon: false,
  buttonAnswer: false,
};

export const modalElement = createSlice({
  name: 'modalElement',
  initialState: initialState,
  reducers: {
    setShowWindow(state, action) {
      state.showWindow = action.payload;
    },
    setTitleText(state, action) {
      state.titleText = action.payload;
    },
    setContentText(state, action) {
      state.contentText = action.payload;
    },
    setIconType(state, action) {
      state.iconType = action.payload;
    },
    setShowButtons(state, action) {
      state.showButtons = action.payload;
    },
    setShowContent(state, action) {
      state.showContent = action.payload;
    },
    setShowIcon(state, action) {
      state.showIcon = action.payload;
    },
    setButtonAnswer(state, action) {
      state.buttonAnswer = action.payload;
    },
  },
});

export const {
  setShowWindow,
  setTitleText,
  setContentText,
  setIconType,
  setShowButtons,
  setShowContent,
  setShowIcon,
  setButtonAnswer,
} = modalElement.actions;

export default modalElement.reducer;
