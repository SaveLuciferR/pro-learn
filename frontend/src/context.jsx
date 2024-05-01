import {createContext, useState} from "react";

export const Context = createContext(null);

export const ContextProvider = ({children}) => {
    const [inputCompilerFileElement, setInputCompilerFileElement] = useState('');

    return(
        <Context.Provider value={{inputCompilerFileElement, setInputCompilerFileElement}}>
            {children}
        </Context.Provider>
    );
}