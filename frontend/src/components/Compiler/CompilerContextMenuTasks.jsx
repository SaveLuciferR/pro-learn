import useOnClickOutside from "../../hooks/useOnClickOutside";
import {useEffect, useRef} from "react";

const CompilerContextMenuTasks = ({context, setContext, xyPos, handleClickTask, tasks}) => {

    const ref = useRef(null);
    useOnClickOutside(ref, () => {
        if (context) {
            setContext(false);
        }
    })

    useEffect(() => {
        // console.log(tasks.tasks)
    }, [tasks])

    return (
        <>
            {context && tasks !== undefined && tasks !== null && Object.keys(tasks.tasks).length !== 0 && (
                <div ref={ref} className="compiler-context-menu" style={{top: xyPos.x, left: xyPos.y}}>
                    {Object.keys(tasks.tasks).map((item) => {
                        return (
                            <div key={item} className="compiler-context-menu_item" onClick={() => handleClickTask(item)}>
                                {tasks.tasks[item].name}
                            </div>
                        );
                    })}
                </div>
            )}
        </>
    );
}

export default CompilerContextMenuTasks;