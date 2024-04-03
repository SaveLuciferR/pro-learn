import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import compiler from './Compiler/slice';
import blog from './Blog/slice';
import mainLayout from './MainLayout/slice';
import project from './Project/slice';
import slider from './Slider/slice';

export const store = configureStore({
  reducer: {
    // compiler pages
    compiler,
    blog,
    mainLayout,
    project,
    slider,
  },
});

// export const useAppDispatch = () => useDispatch();
