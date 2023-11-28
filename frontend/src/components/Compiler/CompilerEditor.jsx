import { useState, useEffect } from "react";
import { Editor, loader } from "@monaco-editor/react";

const CompilerEditor = () => {
  const [activeTab, setActiveTab] = useState(0);

  const testtitles = ["README.md", "index.html", "App.jsx"];

  const onClickTab = (index) => {
    setActiveTab(index);
  };

  useEffect(() => {
    loader
      .init()
      .then((monaco) => {
        import("monaco-themes/themes/Blackboard.json").then((data) => {
          monaco.editor.defineTheme("Blackboard", data);
        });
      })
      .catch((error) => console.error("error"));
  }, []);

  return (
    <>
      <div className="editor">
        <div className="editor-tabs">
          {/* Будущий map по названиям файлов */}
          {testtitles.map((value, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onClickTab(i)}
              className={`editor-tab${activeTab === i ? " active" : ""}`}
            >
              <p className="editor-title">{value}</p>
            </button>
          ))}
        </div>
        <div className="editor-workspace">
          <div className="editor-container">
            <Editor height="100%" defaultLanguage="html" theme="Blackboard" />
          </div>
        </div>
      </div>
    </>
  );
};
export default CompilerEditor;
