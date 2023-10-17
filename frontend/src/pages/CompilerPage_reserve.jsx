import CompilerConsole from "../components/Compiler_reserve/CompilerConsole_reserve";
import CompilerEditor from "../components/Compiler_reserve/CompilerEditor_reserve";
import CompilerOutput from "../components/Compiler_reserve/CompilerOutput_reserve";

const Compiler = () => {
  return (
    <div className="compiler">
      <div className="compiler-container">
        <div className="compiler-blocks">
          <CompilerEditor />
          <div className="compiler-part">
            {/* Временный костыль тк пока не используется нормальное изменение размеров */}
            <CompilerOutput />
            <CompilerConsole />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compiler;
