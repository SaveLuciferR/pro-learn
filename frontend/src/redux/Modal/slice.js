import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showWindow: false, //Показать/скрыть модальное окно
  titleText: '', //Текст заголовка
  contentText: '', //Текст контентной части (чаще для пояс)
  iconType: '', //Тип иконки (изменяется условием)
  showButtons: true, //Показать/скрыть кнопки (да/нет)
  showContent: true, //Показать/скрыть контент
  showIcon: false, //Показать/скрыть иконку
  buttonAnswer: false, //Переменная, которая хранит ответ модального окна
};

export const modalElement = createSlice({
  name: 'modalElement',
  initialState: initialState,
  reducers: {
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
    setShowWindow(state, action) {
      state.showWindow = action.payload;
      setButtonAnswer(false);
      setShowIcon(false);
      setShowContent(true);
      setShowButtons(true);
      setIconType('');
      setContentText('');
      setTitleText('');
      // я не разобралась как это оптимизировать, положите тапок, пожалуйста...
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
