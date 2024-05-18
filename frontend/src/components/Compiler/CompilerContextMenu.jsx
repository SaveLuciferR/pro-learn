import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    setActionInActionContext,
    setCanRenameFile,
    setCopyFileInAction,
    setNewFileNameInActionContext, setPathCopyFileInAction, setTypeCopyFileInAction
} from '../../redux/Compiler/slice';

const CompilerContextMenu = ({canBeEdit, context, xyPos}) => {
    const dispatch = useDispatch();

    const typeContextMenu = useSelector((state) => state.compiler.typeContextMenu);
    const pathIndex = useSelector(state => state.compiler.actionContext.file.delete);

    const initMenu = (chosen) => {
        dispatch(setActionInActionContext(chosen));

        if (chosen === 'copy' || chosen === 'cut') {
            dispatch(setTypeCopyFileInAction({type: chosen}));
            dispatch(setPathCopyFileInAction({path: pathIndex}))
        } else if (chosen === 'rename') {
            dispatch(setCanRenameFile(true));
        }
    };

    return (
        <>
            {canBeEdit && context && (
                <div className="compiler-context-menu" style={{top: xyPos.x, left: xyPos.y}}>
                    {typeContextMenu === 'file' ? (
                        <div className="compiler-context-menu_item" onClick={() => initMenu('save')}>
                            Сохранить
                        </div>
                    ) : (
                        <></>
                    )}
                    <hr className={"markdown-hr"}/>
                    <div className="compiler-context-menu_item" onClick={() => initMenu('cut')}>
                        Вырезать
                    </div>

                    <div className="compiler-context-menu_item" onClick={() => initMenu('copy')}>
                        Копировать
                    </div>
                    <div className="compiler-context-menu_item" onClick={() => initMenu('past')}>
                        Вставить
                    </div>
                    <hr className={"markdown-hr"}/>
                    <div className="compiler-context-menu_item" onClick={() => initMenu('delete')}>
                        Удалить
                    </div>
                    <div className="compiler-context-menu_item" onClick={() => initMenu('rename')}>
                        Переименовать
                    </div>
                </div>
            )}
        </>
    );
};

export default CompilerContextMenu;
