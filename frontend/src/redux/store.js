import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import compiler from './Compiler/slice'
import blog from './Blog/slice';
import mainLayout from "./MainLayout/slice";
import project from "./Project/slice";
import course from "./Course/slice";

export const store = configureStore({
    reducer:{
        // compiler pages
        compiler,
        blog,
        mainLayout,
        project,
        course
    },
})

// export const useAppDispatch = () => useDispatch();