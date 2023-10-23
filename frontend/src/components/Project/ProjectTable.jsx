import ProjectSvg from "./ProjectSvg";

const ProjectTable = ({ setBeforeFolder, beforeFolder, isMainFolder, obj, secondaryPath, setSecondaryPath }) => {

    const returnInBeforeFolder = () => {
        setSecondaryPath(beforeFolder);
        let path = new String(beforeFolder);
        console.log(path);
        path = path.split('/');
        setBeforeFolder(path.length - 2 < 0 ? undefined : path[path.length - 2]);
    }

    const setPath = (secondaryPathClicked) => {
        setBeforeFolder(secondaryPath);
        let newPath = secondaryPath === undefined ? "" + secondaryPathClicked : secondaryPath + "/" + secondaryPathClicked;
        setSecondaryPath(newPath);
    }

    return (
        <>
            <div className="project_files">
                <div className="project_files-head">
                    <span>Name</span>
                    <span>Last commit date</span>
                </div>
                <div className="project_files-body">
                    {isMainFolder ?
                        <div className="project_files-body_item" onClick={() => returnInBeforeFolder()}>
                            <div className="project_files-body_item-name">
                                <span>...</span>
                            </div>
                        </div>
                        :
                        <></>
                    }
                    {obj.map((item, i) =>
                        <div key={i} className="project_files-body_item" onClick={() => setPath(item.fileName)}>
                            <div className="project_files-body_item-name">
                                <ProjectSvg type={item.type} />
                                <span>{item.fileName}</span>
                            </div>
                            <span>{item.lastCommit}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* <Route path=":secondaryPath" element={ProjectPage}/> */}
            {/* <Navigate to=":secondaryPath"/> */}
        </>
    );
}

export default ProjectTable;