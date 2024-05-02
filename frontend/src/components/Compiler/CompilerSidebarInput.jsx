import useKeypress from "../../hooks/useKeypress";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import {useCallback, useContext, useEffect, useRef} from "react";
import {Context} from "../../context";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentInputContent} from "../../redux/Compiler/slice";


const CompilerSidebarInput = ({saveData, removeData}) => {

    const dispatch = useDispatch();
    const ref = useRef(null);

    const enter = useKeypress('Enter');
    const esc = useKeypress('esc');

    const content = useSelector(state => state.compiler.currentInputContent);
    const error = useSelector(state => state.compiler.canBeExistElementProject);

    useOnClickOutside(ref, () => {
        removeData();
    });

    const onEnter = useCallback(() => {
        if (enter && error) {
            saveData(content);
        }
    }, [enter, saveData]);

    const onEsc = useCallback(() => {
        if (esc) {
            removeData();
        }
    }, [esc, removeData]);

    useEffect(() => {
        ref.current.focus();
        onEnter();
        onEsc();
    }, [onEnter, onEsc]);

    return (
        <>
            <input
                ref={ref}
                data-project-element={'input'}
                className={`input input-compiler ${!error ? 'input-compiler-error' : ''}`}
                value={content}
                onChange={(e) => dispatch(setCurrentInputContent(e.target.value))}
            />
        </>
    );
}

export default CompilerSidebarInput;