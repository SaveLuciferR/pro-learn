import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import compiler from './Compiler/slice'

export const store = configureStore({
    reducer:{
        // compiler pages
        compiler,
    },
})

// export const useAppDispatch = () => useDispatch();