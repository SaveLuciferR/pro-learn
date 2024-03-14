import {useEffect} from "react";
import {Editor, loader} from "@monaco-editor/react";
import {useDispatch, useSelector} from "react-redux";
import {
  deleteCompilerTab,
  setCompilerCurrentFile,
  setActiveTab,
  setCompilerFiles,
  setNewBodyCompilerFiles
} from "../../redux/Compiler/slice";

const CompilerEditor = () => {

  const dispatch = useDispatch();

  const currentFile = useSelector(state => state.compiler.currentFile.file);
  const compilerFiles = useSelector(state => state.compiler.files);
  const tabs = useSelector(state => state.compiler.tabs);
  const activeTab = useSelector(state => state.compiler.activeTab);

  const onClickTab = (tabIndex) => {
    dispatch(setActiveTab(tabIndex));
    dispatch(setCompilerCurrentFile(tabs[tabIndex].file, tabs[tabIndex].name));
  };

  const onClickDeleteTab = (tabIndex) => {
    dispatch(deleteCompilerTab(tabIndex));
  }

  const onChangeBodyFile = (value, pathIndex) => {
    const object = {
      value: value,
      pathIndex: pathIndex
    }
    dispatch(setNewBodyCompilerFiles(object));
  }

  useEffect(() => {
    loader
        .init()
        .then((monaco) => {
          import("monaco-themes/themes/Blackboard.json").then((data) => {
            monaco.editor.defineTheme("Blackboard", data);
          });
        })
        .catch((error) =>
            console.error("error"));
  }, []);

  return (
      <>
        <div className="editor">
          <div className="editor-tabs">
            {Object.keys(tabs).map((value) => (
                <div
                    key={value}

                    className={`editor-tab${activeTab === value ? " active" : ""}`}
                >
                  <p onClick={() => onClickTab(value)} className="editor-title">{tabs[value].name}</p>
                  <button type="button" className="editor-tabs-close-button"
                          onClick={() => onClickDeleteTab(value)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                         fill="none">
                      <path d="M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round"
                            strokeLinejoin="round"/>
                      <path d="M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round"
                            strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
            ))}
          </div>
          <div className="editor-workspace">
            <div className="editor-container">
              <Editor
                  height={'100vh'}
                  defaultLanguage="markdown"
                  language={currentFile.language}
                  value={currentFile.body}
                  onChange={(v) => onChangeBodyFile(v, currentFile.path)}
                  options={
                    {
                      readOnly: Object.entries(currentFile).length === 0
                    }
                  }
                  theme="vs-dark"
              />
            </div>
          </div>
        </div>
      </>
  );
};
export default CompilerEditor;
