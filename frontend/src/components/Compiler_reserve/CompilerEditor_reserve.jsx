import { useState } from "react";

const CompilerEditor = () => {
  const [activeTab, setActiveTab] = useState(0);

  const testtitles = ["README.md", "index.html", "App.jsx"];

  const onClickTab = (index) => {
    setActiveTab(index);
  };

  return (
    <>
      <div className="editor">
        <div className="editor-tabs">{/* Будущий map по названиям файлов */}
          {testtitles.map((value, i) => (
            <button
              type="button"
              onClick={() => onClickTab(i)}
              className={`editor-tab${activeTab === i ? ' active' : ''}`}
            >
              <p className="editor-title">{value}</p>
            </button>
          ))}
        </div>
        <div className="editor-workspace">
          <div className="editor-container">EDITOR</div>
        </div>
      </div>
    </>
  );
};
export default CompilerEditor;
