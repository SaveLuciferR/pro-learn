import CompilerEditor from "../components/Compiler/CompilerEditor";
import CompilerOutput from "../components/Compiler/CompilerOutput";
import CompilerConsole from "../components/Compiler/CompilerConsole";
import CompilerSidebar from "../components/Compiler/CompilerSidebar";

const Compiler = () => {
  return (
    <>
      <CompilerSidebar />
      <div className="compiler">
        <div className="compiler-container">
          <div className="compiler-blocks">
            <CompilerEditor />
            <div className="compiler-part">
              <CompilerOutput />
              <CompilerConsole />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Compiler;
