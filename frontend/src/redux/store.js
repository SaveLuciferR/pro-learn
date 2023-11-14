import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import compiler from './Compiler/slice'
import blog from './Blog/slice';
import mainLayout from "./MainLayout/slice";

export const store = configureStore({
    reducer:{
        // compiler pages
        compiler,
        blog,
        mainLayout,
    },
})

// export const useAppDispatch = () => useDispatch();