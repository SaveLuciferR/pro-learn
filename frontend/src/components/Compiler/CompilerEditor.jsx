import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {ControlledEditor, monaco} from "@monaco-editor/react";

const CompilerEditor = () => {
  const [activeTab, setActiveTab] = useState(0);

  const testtitles = ["README.md", "index.html", "App.jsx"];

  const onClickTab = (index) => {
    setActiveTab(index);
  };

  // useEffect(() => {
  //   monaco
  //     .init()
  //     .then((monaco) => {
  //       import("monaco-themes/themes/Blackboard.json").then((data) => {
  //         monaco.editor.defineTheme("Blackboard", data);
  //       });
  //     })
  //     .catch((error) =>
  //       console.error("error"));
  // }, []);

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
            <ControlledEditor
              height="300px"
              defaultLanguage="html"
              // theme = "Blackboard"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default CompilerEditor;
