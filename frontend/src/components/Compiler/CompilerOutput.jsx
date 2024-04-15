import {useEffect, useState} from "react";
import axiosClient from "../../axiosClient";
import {setCompilerFiles, setNeedReloadFrameCompiler, setOutputFrame} from "../../redux/Compiler/slice";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

const CompilerOutput = () => {
    const [activeTab, setActiveTab] = useState(0);

    const username = 'user1';
    const {project} = useParams();

    const dispatch = useDispatch();

    const needReloadFrameCompiler = useSelector(state => state.compiler.needReloadFrameCompiler);
    const eventPointer = useSelector(state => state.compiler.eventPointerFrame);
    const [path, setPath] = useState("");
    // const outputFrame = useSelector(state => state.compiler.outputFrame);

    const onClickTab = (index) => {
        setActiveTab(index);
    };

    useEffect(() => {
        axiosClient.post(`/compiler/@${username}/${project}`)
            .then(({data}) => {
                // console.log(data.path);
                setPath(data.path);
            });
    }, []);

    useEffect(() => {
        if (needReloadFrameCompiler) {
            // document.getElementById("reload_frame_compiler").contentWindow.location.reload();
            dispatch(setNeedReloadFrameCompiler(false));
        }
    }, [needReloadFrameCompiler]);

    const onUpdateFrame = (frame) => {
        // setTimeout(frame.target.src = frame.target.src, 3000);
    }

    return (
        <div className="output">
            <div className="output-tabs">
                {/*{testtitles.map((value, i) => (*/}
                {/*  <button*/}
                {/*    type="button"*/}
                {/*    onClick={() => onClickTab(i)}*/}
                {/*    className={`output-tab${activeTab === i ? " active" : ""}`}*/}
                {/*  >*/}
                {/*    <p className="output-title">{value}</p>*/}
                {/*  </button>*/}
                {/*))}*/}
            </div>
            <div className="output-mainspace">
                <iframe id="reload_frame_compiler" style={{pointerEvents: eventPointer ? 'auto' : 'none'}} onLoad={() => onUpdateFrame(this)} className="output-container" width="100%" height="100%" src={"http://localhost:9876"}></iframe>
            </div>
        </div>
    );
};

export default CompilerOutput;
