import {useEffect, useRef, useState} from "react";
import axiosClient from "../../axiosClient";
import {setCompilerFiles, setNeedReloadFrameCompiler} from "../../redux/Compiler/slice";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {VscChevronLeft, VscChevronRight, VscDebugStart} from "react-icons/vsc";
import {GrRefresh} from "react-icons/gr";
import {IoIosArrowForward} from "react-icons/io";

const CompilerOutput = ({ports}) => {
    const [activeTab, setActiveTab] = useState(0);

    const {username, project} = useParams();

    const dispatch = useDispatch();

    const frameRef = useRef(null);

    const needReloadFrameCompiler = useSelector(state => state.compiler.needReloadFrameCompiler);
    const eventPointer = useSelector(state => state.compiler.eventPointerFrame);
    const [path, setPath] = useState(`http://localhost:80`);
    // const outputFrame = useSelector(state => state.compiler.outputFrame);

    // const onClickTab = (index) => {
    //     setActiveTab(index);
    // };

    // useEffect(() => {
    //
    // }, []);

    useEffect(() => {
        if (ports.length !== 0) {
            setPath(`http://localhost:${ports[0]}`)
        }
    }, [ports])

    useEffect(() => {
        if (needReloadFrameCompiler) {
            if (frameRef) {
                frameRef.current.src += '';
            }
            dispatch(setNeedReloadFrameCompiler(false));
        }
    }, [needReloadFrameCompiler]);

    const onUpdateFrame = () => {
        if (frameRef) {
            // setInterval(() => setPath(frameRef.current.src += ''), 1000);
        }
    }

    return (
        <div className="output">
            <div className="output-tabs">
                <div className={"output-buttons"}>
                    <button className={'btn btn-without_text'}><VscChevronLeft className={"icon-24"}/></button>
                    <button className={'btn btn-without_text'}><VscChevronRight className={"icon-24"}/></button>
                    <button onClick={() => dispatch(setNeedReloadFrameCompiler(true))}
                            className={'btn btn-without_text'}><GrRefresh className={"icon-24"}/></button>
                </div>
                <input type={'text'} className={"input width100 output-search"} value={path}
                       onChange={(e) => setPath(e.target.value)}/>
                <div className={'output-buttons'}>
                    <button className={'btn btn-without_text'}><IoIosArrowForward className={"icon-24"}/></button>
                </div>

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
                <iframe ref={frameRef}
                        style={{pointerEvents: eventPointer ? 'auto' : 'none'}}
                        onLoad={() => onUpdateFrame(this)} className="output-container" width="100%" height="100%"
                        src={path}></iframe>
            </div>
        </div>
    );
};

export default CompilerOutput;
