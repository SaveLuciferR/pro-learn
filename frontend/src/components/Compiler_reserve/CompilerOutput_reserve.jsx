import { useState } from "react";

const CompilerOutput = () => {
  const [activeTab, setActiveTab] = useState(0);

  const testtitles = ["README.md", "index.html", "App.jsx"];

  const onClickTab = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="output">
      <div className="output-tabs">
        {testtitles.map((value, i) => (
          <button
            type="button"
            onClick={() => onClickTab(i)}
            className={`output-tab${activeTab === i ? " active" : ""}`}
          >
            <p className="output-title">{value}</p>
          </button>
        ))}
      </div>
      <div className="output-mainspace">
        <div className="output-container">OUTPUT</div>
      </div>
    </div>
  );
};

export default CompilerOutput;
