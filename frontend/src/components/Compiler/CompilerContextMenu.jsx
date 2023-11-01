import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setActionInActionContext} from "../../redux/Compiler/slice";

const CompilerContextMenu = ({context, xyPos}) => {

    const dispatch = useDispatch();

    const typeContextMenu = useSelector(state => state.compiler.typeContextMenu);

    const initMenu = (chosen) => {
        dispatch(setActionInActionContext(chosen));
    };


    return (
        <>
            {context && (
                <div style={{top: xyPos.x, left: xyPos.y}}>
                    {typeContextMenu === 'file' ?
                        <div onClick={() => initMenu("save")}>
                            save
                        </div>
                        :
                        <></>
                    }
                    <div onClick={() => initMenu("rename")}>
                        rename
                    </div>
                    <div onClick={() => initMenu("delete")}>
                        delete
                    </div>
                </div>
            )}
        </>
    );
}

export default CompilerContextMenu;