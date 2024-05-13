import {useOutletContext, useParams, useSearchParams} from "react-router-dom"
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
    setNeedReloadFrameCompiler, setShouldBeRunAtStart, setTasksProject,
    setUpdateFiles
} from "../redux/Compiler/slice";
import Splitter, {SplitDirection} from '@devbookhq/splitter';
import CompilerTaskDescription from "../components/Compiler/CompilerTaskDescription";
import CompilerEmptyWindow from "../components/Compiler/CompilerEmptyWindow";
import CompilerCreateDocker from "../components/Compiler/CompilerCreateDocker";
import ModalCreateProject from "../components/Modal/ModalCreateProject";

const CompilerPage = ({isSolve, isActiveSidebar, isCompiler}) => {

    const {activeSidebar, activeCompiler} = useOutletContext();
    activeSidebar[0](isActiveSidebar);
    activeCompiler[0](isCompiler);

    // const username = 'user1';
    const {project, username, task, lang} = useParams();
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const updateFiles = useSelector(state => state.compiler.updateFiles);
    const shouldBeRunAtStart = useSelector(state => state.compiler.shouldBeRunAtStart);

    const [widthSidebar, setWidthSidebar] = useState(200);
    const [widthContainer, setWidthContainer] = useState(window.innerWidth - widthSidebar - 400);
    const [widthEditor, setWidthEditor] = useState(widthContainer / 2 - 1);
    const [widthOutput, setWidthOutput] = useState(widthContainer / 2);
    const [minWidthOutputEditor, setMinWidthOutputEditor] = useState(300);
    const [heightEditorOutput, setHeightEditorOutput] = useState(window.innerHeight / 6);
    const [heightConsole, setHeightConsole] = useState(window.innerHeight / 4);

    const [isWebProject, setIsWebProject] = useState(false);
    const [isOpenOutput, setIsOpenOutput] = useState(true);
    const [dockerIsStart, setDockerIsStart] = useState(false);
    const [solveTask, setSolveTask] = useState({});
    const [successSolutionTask, setSuccessSolutionTask] = useState(null);
    const [createDockerContainer, setCreateDockerContainer] = useState(false);
    const [runDocker, setRunDocker] = useState(false);

    const [outputDocker, setOutputDocker] = useState('');
    const [errorDocker, setErrorDocker] = useState('');
    const [portsDocker, setPortsDocker] = useState([]);
    const [dockerIsLoading, setDockerIsLoading] = useState(false);
    const [taskIsLoading, setTaskIsLoading] = useState(false);

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

    const solvedTask = () => {
        setSuccessSolutionTask(null);
        axiosClient.post(`/compiler/@${username}/${project}/${task}/check-solution-task`, [])
            .then(({data}) => {
                setSuccessSolutionTask(data.success);
                setOutputDocker(data.output);
                setErrorDocker(data.error);
                // if (data.success && )
            })
            .catch((res) => {
                console.log(res);
            });
    }

    useEffect(() => {
        if (updateFiles) {
            axiosClient.post(`/compiler/@${username}/${project}`)
                .then(({data}) => {
                    console.log(data);
                    dispatch(setCompilerFiles(data.fileStructure));
                    dispatch(setShouldBeRunAtStart(data.shouldBeRunAtStart));
                    console.log(data);
                    dispatch(setTasksProject(data.tasks));
                    dispatch(setUpdateFiles(false));
                    dispatch(setNeedReloadFrameCompiler(true));
                    setIsWebProject(data.isWebProject);
                })
                .catch((data) => {
                    console.log(data);
                });
        }
    }, [updateFiles]);

    useEffect(() => {
        if (task !== undefined) {
            axiosClient.get(`${lang === undefined ? "/" : '/' + lang + '/'}compiler/solve-task?task=${task}`)
                .then(({data}) => {
                    console.log(data.task);
                    setSolveTask(data.task);
                })
                .catch((res) => {
                    console.log(res);
                });
        }
    }, [task, lang])

    useEffect(() => {
        if (createDockerContainer) {

        }
    }, [createDockerContainer])

    useEffect(() => {
        if (shouldBeRunAtStart || runDocker) {
            setDockerIsLoading(true)
            // startDockerContainer(`http://api.pro-learn.my/compiler/@${username}/${project}/start-docker-session`);
            axiosClient.get(`${lang === undefined ? "/" : '/' + lang + '/'}compiler/@${username}/${project}/start-docker-session`)
                .then((res) => {
                    console.log(res);
                    if (res.status === 204) {
                        setCreateDockerContainer(true);
                    }
                    setOutputDocker(res.data.output);
                    setErrorDocker(res.data.error);
                    setPortsDocker(res.data.ports);
                    // setSolveTask(data.task);
                })
                .catch((res) => {
                    console.log(res);
                })
                .finally(() => {
                    setRunDocker(false);
                    dispatch(setShouldBeRunAtStart(false));
                    setDockerIsLoading(false);
                })
            setDockerIsStart(true);
        }
    }, [shouldBeRunAtStart, runDocker])

    return (
        <>
            <div className={`compiler-main`}>
                <Splitter
                    direction={SplitDirection.Vertical}
                    initialSizes={[100, 900]}
                    minHeights={[10, 600]}
                    onResizeFinished={() => {
                        dispatch(setEventPointerFrame(true))
                    }}
                    onResizeStarted={() => {
                        dispatch(setEventPointerFrame(false))
                    }}

                >
                    {task === undefined || Object.keys(solveTask).length === 0 ?
                        <></>
                        :
                        <CompilerTaskDescription courseSlug={searchParams.get('course')} obj={solveTask}
                                                 solvedTask={() => solvedTask()} success={successSolutionTask}/>}
                    <Splitter
                        direction={SplitDirection.Horizontal}
                        initialSizes={[widthSidebar, widthContainer]}
                        minWidths={[widthSidebar, widthContainer]}
                        onResizeFinished={() => {
                            dispatch(setEventPointerFrame(true))
                        }}
                        onResizeStarted={() => {
                            dispatch(setEventPointerFrame(false))
                        }}
                    >
                        <CompilerSidebar dockerIsLoading={dockerIsLoading} taskIsLoading={taskIsLoading}/>
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
                                                {/*{createDockerContainer ?*/}
                                                {/*    <CompilerCreateDocker/>*/}
                                                {/*    :*/}
                                                <>
                                                    <CompilerEditor
                                                        isWebProject={isWebProject}
                                                        handleOpenOutput={() => setIsOpenOutput(!isOpenOutput)}
                                                        handleStartDocker={() => setRunDocker(true)}
                                                    />

                                                    <CompilerConsole sendRequestTerminal={sendRequestTerminal}
                                                                     taskIsLoading={taskIsLoading}
                                                                     setTaskIsLoading={setTaskIsLoading}
                                                                     output={outputDocker}
                                                                     setOutput={setOutputDocker}
                                                                     error={errorDocker}
                                                                     setError={setErrorDocker}
                                                    />
                                                </>
                                                {/*}*/}
                                            </Splitter>
                                        </div>
                                        {
                                            isWebProject && isOpenOutput ?
                                                <CompilerOutput ports={portsDocker}/>
                                                :
                                                <></>
                                        }
                                    </Splitter>
                                </div>
                            </div>
                        </div>
                    </Splitter>
                </Splitter>
            </div>
            <ModalCreateProject/>
        </>
    )
        ;
};

export default CompilerPage;
