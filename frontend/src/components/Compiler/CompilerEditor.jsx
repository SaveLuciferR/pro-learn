import {useEffect} from 'react';
import {Editor, loader} from '@monaco-editor/react';
import monacoThemes from 'monaco-themes/themes/themelist.json'
// import monacoThemeData from 'monaco-themes/themes/Tomorrow-Night-Bright.json';
import myThemeData from './Tomorrow-Night-Bright.json'
import {useDispatch, useSelector} from 'react-redux';
import {
    deleteCompilerTab,
    setCompilerCurrentFile,
    setActiveTab,
    setCompilerFiles,
    setNewBodyCompilerFiles,
} from '../../redux/Compiler/slice';
import {TfiLayoutTabWindow} from "react-icons/tfi";
import CompilerEmptyWindow from "./CompilerEmptyWindow";
import {VscDebugStart} from "react-icons/vsc";

const CompilerEditor = ({canBeEdit, isWebProject, handleOpenOutput, handleStartDocker}) => {
    const dispatch = useDispatch();

    const currentFile = useSelector((state) => state.compiler.currentFile.file);
    const compilerFiles = useSelector((state) => state.compiler.files);
    const tabs = useSelector((state) => state.compiler.tabs);
    const activeTab = useSelector((state) => state.compiler.activeTab);

    const onClickTab = (tabIndex) => {
        dispatch(setActiveTab(tabIndex));
        dispatch(setCompilerCurrentFile(tabs[tabIndex].file, tabs[tabIndex].name));
    };

    const onClickDeleteTab = (tabIndex) => {
        dispatch(deleteCompilerTab(tabIndex));
    };

    const onChangeBodyFile = (value, pathIndex) => {
        const object = {
            value: value,
            pathIndex: pathIndex,
        };
        dispatch(setNewBodyCompilerFiles(object));
    };

    useEffect(() => {
        loader.init()
            .then((monaco) => {
                monaco.editor.defineTheme('tomorrow-night-bright', myThemeData);
                monaco.editor.setTheme('tomorrow-night-bright');
            })
    }, [tabs]);

    useEffect(() => {
        let activeTabClosed = true;
        console.log(tabs)
        Object.keys(tabs).map(item => {
            if (item === activeTab) {
                activeTabClosed = false;
            }
        })

        if (activeTabClosed) {
            if (Object.keys(tabs).length === 0) {
                dispatch(setActiveTab(''));
                dispatch(setCompilerCurrentFile('', ''));
            } else {
                dispatch(setActiveTab(Object.keys(tabs)[0]));
                dispatch(setCompilerCurrentFile(tabs[Object.keys(tabs)[0]].file, tabs[Object.keys(tabs)[0]].name));
            }
        }
    }, [tabs])

    return (
        <>
            <div className="editor">
                <div className={`editor-tabs`}>
                    <div className={`editor-tabs-file scroll`}>
                        {Object.keys(tabs).map((value) => (
                            <div key={value} className={`editor-tab${activeTab === value ? ' active' : ''}`}>
                                <p onClick={() => onClickTab(value)} className="editor-title">
                                    {tabs[value].name}
                                </p>
                                <button
                                    type="button"
                                    className="editor-tabs-close-button"
                                    onClick={() => onClickDeleteTab(value)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                    >
                                        <path
                                            d="M12 4L4 12"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M4 4L12 12"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className={`editor-tabs-button`}>
                        {isWebProject ?
                            <button onClick={() => handleOpenOutput()} className={'btn btn-without_text'}>
                                <TfiLayoutTabWindow/>
                            </button>
                            :
                            <button onClick={() => handleStartDocker()} className={'btn btn-without_text'}><VscDebugStart className={"icon-24"}/></button>
                        }
                    </div>
                </div>
                <div className="editor-workspace">
                    <div className="editor-container">
                        {activeTab.length === 0 ?
                            <CompilerEmptyWindow/>
                            :
                            <Editor
                                defaultLanguage="markdown"
                                defaultValue={"Your code..."}
                                language={currentFile.language}
                                value={currentFile.body}
                                onChange={(v) => onChangeBodyFile(v, currentFile.path)}
                                options={
                                    {
                                        readOnly: Object.entries(currentFile).length === 0 || !canBeEdit,
                                        automaticLayout: true,
                                        minimap: true,
                                        fontSize: '14px',
                                    }
                                }
                                height={'100%'}
                                theme="vs-dark"
                                // theme={monacoThemes["tomorrow-night-bright"]}
                            />
                        }
                    </div>
                </div>
            </div>
        </>
    );
};
export default CompilerEditor;
