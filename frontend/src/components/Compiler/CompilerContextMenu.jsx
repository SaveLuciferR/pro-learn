import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {setActionInActionContext, setCanRenameFile, setNewFileNameInActionContext} from '../../redux/Compiler/slice';
const CompilerContextMenu = ({ context, xyPos }) => {
  const dispatch = useDispatch();

  const typeContextMenu = useSelector((state) => state.compiler.typeContextMenu);

  const initMenu = (chosen) => {
    dispatch(setActionInActionContext(chosen));

    if (chosen === 'rename') dispatch(setCanRenameFile(true));
  };

  return (
    <>
      {context && (
        <div className="compiler-context-menu" style={{ top: xyPos.x, left: xyPos.y }}>
          {typeContextMenu === 'file' ? (
            <div className="compiler-context-menu_item" onClick={() => initMenu('save')}>
              Сохранить
            </div>
          ) : (
            <></>
          )}
          <div className="compiler-context-menu_item" onClick={() => initMenu('rename')}>
            Переименовать
          </div>
          <div className="compiler-context-menu_item" onClick={() => initMenu('delete')}>
            Удалить
          </div>
        </div>
      )}
    </>
  );
};

export default CompilerContextMenu;
