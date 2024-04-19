import {useOutletContext, useParams} from "react-router-dom"
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import axiosClient from '../axiosClient';

import CompilerEditor from "../components/Compiler/CompilerEditor";
import CompilerOutput from "../components/Compiler/CompilerOutput";
import CompilerConsole from "../components/Compiler/CompilerConsole";
import CompilerSidebar from "../components/Compiler/CompilerSidebar";

import {
    addTerminalContent,
    setCompilerFiles,
    setEventPointerFrame,
    setNeedReloadFrameCompiler,
    setUpdateFiles
} from "../redux/Compiler/slice";
import Splitter, {SplitDirection} from '@devbookhq/splitter';

const CompilerPage = ({isSolve, isActiveSidebar, isCompiler}) => {

    const {activeSidebar, activeCompiler} = useOutletContext();
    activeSidebar[0](isActiveSidebar);
    activeCompiler[0](isCompiler);

    // const username = 'user1';
    const {project, username, task} = useParams();
    const dispatch = useDispatch();
    const updateFiles = useSelector(state => state.compiler.updateFiles);

    const [widthSidebar, setWidthSidebar] = useState(200);
    const [widthContainer, setWidthContainer] = useState(window.innerWidth - widthSidebar);
    const [widthEditor, setWidthEditor] = useState(widthContainer / 2 - 1);
    const [widthOutput, setWidthOutput] = useState(widthContainer / 2);
    const [minWidthOutputEditor, setMinWidthOutputEditor] = useState(300);
    const [heightEditorOutput, setHeightEditorOutput] = useState(window.innerHeight / 6);
    const [heightConsole, setHeightConsole] = useState(window.innerHeight / 4);

    const [dockerIsStart, setDockerIsStart] = useState(false);

    const sendRequestTerminal = (req) => {
        setDockerIsStart(false);
        startDockerContainer(`http://api.pro-learn.my/compiler/@${username}/${project}/request-terminal?req=${req}`);
        setDockerIsStart(true);
    }

    function startDockerContainer(url) {
        if (dockerIsStart) return;

        let lastResponseLength = false;

        const xhr = new XMLHttpRequest();

        //TODO: константа на домен сервера
        xhr.open("GET", url, true);

        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Accept", "application/json");
        // xhr.setRequestHeader('X-CSRF-Token', document.querySelector('meta[name="csrf-token"]').content);
        xhr.onprogress = function (e) {
            let progressResponse;
            let response = e.currentTarget.response;

            progressResponse = lastResponseLength ?
                response.substring(lastResponseLength)
                : response;

            lastResponseLength = response.length;
            let parsedResponse = JSON.parse(progressResponse);

            dispatch(addTerminalContent(parsedResponse.data));

            if (Object.prototype.hasOwnProperty.call(parsedResponse, 'success')) {
                // handle process success
            }
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && this.status === 200) {
                // console.log("Complete = " + xhr.responseText);
            }
        }

        xhr.send();
    }

    useEffect(() => {
        if (updateFiles) {
            axiosClient.post(`/compiler/@${username}/${project}`)
                .then(({data}) => {
                    console.log(data);
                    dispatch(setCompilerFiles(data.fileStructure));
                    dispatch(setUpdateFiles(false));
                    dispatch(setNeedReloadFrameCompiler(true));
                })
                .catch((data) => {
                    console.log(data);
                });

            startDockerContainer(`http://api.pro-learn.my/compiler/@${username}/${project}/start-docker-session`);
            setDockerIsStart(true);
        }
    }, [updateFiles]);

    return (
        <div className="compiler-main">
            <Splitter
                direction={SplitDirection.Horizontal}
                initialSizes={[widthSidebar, widthContainer]}
                minWidths={[widthSidebar, widthContainer - widthSidebar]}
                onResizeFinished={() => {
                    dispatch(setEventPointerFrame(true))
                }}
                onResizeStarted={() => {
                    dispatch(setEventPointerFrame(false))
                }}
            >
                <CompilerSidebar/>
                <div className="compiler">
                    <div className="compiler-container">
                        <div className="compiler-blocks">
                            <Splitter
                                direction={SplitDirection.Horizontal}
                                initialSizes={[widthEditor, widthOutput]}
                                minWidths={[minWidthOutputEditor, minWidthOutputEditor]}
                                onResizeFinished={() => {
                                    dispatch(setEventPointerFrame(true))
                                }}
                                onResizeStarted={() => {
                                    dispatch(setEventPointerFrame(false))
                                }}
                            >
                                <div className="compiler-part">
                                    <Splitter
                                        direction={SplitDirection.Vertical}
                                        initialSizes={[heightEditorOutput, heightConsole]}
                                        minHeights={[100, 100]}
                                        onResizeFinished={(pairIdx, newSizes) => {
                                            dispatch(setEventPointerFrame(true))
                                        }}
                                        onResizeStarted={() => {
                                            dispatch(setEventPointerFrame(false))
                                        }}
                                    >
                                        <CompilerEditor/>
                                        <CompilerConsole sendRequestTerminal={sendRequestTerminal}/>
                                    </Splitter>
                                </div>
                                <CompilerOutput/>
                            </Splitter>
                        </div>
                    </div>
                </div>
            </Splitter>
        </div>
    );
};

export default CompilerPage;
