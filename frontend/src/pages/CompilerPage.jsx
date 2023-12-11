import {useOutletContext, useParams} from "react-router-dom"
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import axiosClient from '../axiosClient';

import CompilerEditor from "../components/Compiler/CompilerEditor";
import CompilerOutput from "../components/Compiler/CompilerOutput";
import CompilerConsole from "../components/Compiler/CompilerConsole";
import CompilerSidebar from "../components/Compiler/CompilerSidebar";

import {setCompilerFiles, setNeedReloadFrameCompiler, setUpdateFiles} from "../redux/Compiler/slice";

const Compiler = ({isActiveSidebar, isCompiler}) => {

    const {activeSidebar, activeCompiler} = useOutletContext();
    activeSidebar[0](isActiveSidebar);
    activeCompiler[0](isCompiler);

    // const username = 'user1';
    const {project, username} = useParams();
    const dispatch = useDispatch();
    const updateFiles = useSelector(state => state.compiler.updateFiles);

    useEffect(() => {
        if (updateFiles) {
            axiosClient.post(`/compiler/@${username}/${project}`)
                .then(({data}) => {
                    dispatch(setCompilerFiles(data.fileStructure));
                    dispatch(setUpdateFiles(false));
                    dispatch(setNeedReloadFrameCompiler(true));
                });
        }
    }, [updateFiles]);

    return (
        <div className="compiler-main">
            <CompilerSidebar/>
            <div className="compiler">
                <div className="compiler-container">
                    <div className="compiler-blocks">
                        <CompilerEditor/>
                        <div className="compiler-part">
                            <CompilerOutput/>
                            <CompilerConsole/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Compiler;
