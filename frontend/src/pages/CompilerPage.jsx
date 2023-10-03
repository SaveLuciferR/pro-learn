import CompilerConsole from "../components/Compiler/CompilerConsole";
import CompilerEditor from "../components/Compiler/CompilerEditor";
import CompilerOutput from "../components/Compiler/CompilerOutput";

const Compiler = () => {
  return (
    <div className="compiler">
      <div className="compiler-container">
        <div className="compiler-blocks">
          <div className="compiler-part">
            {/* Временный костыль тк пока не используется нормальное изменение размеров */}
            <CompilerEditor />
            <CompilerConsole />
          </div>
          <CompilerOutput />
        </div>
      </div>
    </div>
  );
};

export default Compiler;
