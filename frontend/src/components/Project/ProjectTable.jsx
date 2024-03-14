import ProjectSvg from "./ProjectSvg";
import {
    setAddNewFiles,
    setMainFolderNewFileAddProject,
    setNewFilesAddProject,
    setNewTableAddProject
} from "../../redux/Project/slice";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {get} from "axios";

const ProjectTable = ({
                          setBeforeFolder,
                          beforeFolder,
                          isMainFolder,
                          obj,
                          secondaryPath,
                          setSecondaryPath,
                          isAddProject = false,
                          getStructureUploadFiles,
                            setNewFilesInfo,
                      }) => {

    const dispatch = useDispatch();
    const newFilesAddProject = useSelector(state => state.project.newFilesAddProject);

    const returnInBeforeFolder = () => {
        setSecondaryPath(beforeFolder);
        let path = new String(beforeFolder);
        console.log(path);
        path = path.split('/');
        setBeforeFolder(path.length - 2 < 0 ? undefined : path[path.length - 2]);
        dispatch(setNewTableAddProject(true));
    }

    const setPath = (secondaryPathClicked) => {
        setBeforeFolder(secondaryPath);
        let newPath = secondaryPath === undefined ? "" + secondaryPathClicked : secondaryPath + "/" + secondaryPathClicked;
        setSecondaryPath(newPath);
        dispatch(setNewTableAddProject(true));
    }

    const handleFileSelected = (e) => {
        const currentFiles = Array.from(e.target.files);

        dispatch(setMainFolderNewFileAddProject(secondaryPath));
        // getStructureUploadFiles(currentFiles, true);
        setNewFilesInfo(getStructureUploadFiles(currentFiles, true));
        // console.log(files);
        // dispatch(setNewFilesAddProject(getStructureUploadFiles(currentFiles, true)));
        // const files = getStructureUploadFiles(currentFiles, true);
        // dispatch(setNewFilesAddProject(files));
        // getStructureUploadFiles(currentFiles, true);
        // dispatch(setAddNewFiles(true));
        // console.log(newFilesAddProject);
    }

    return (
        <>
            <div className="project_files">
                <div className="project_files-head">
                    <span>Name</span>
                    <span>Last commit date</span>
                </div>
                <div className="project_files-body">
                    {!isMainFolder ?
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
                                <ProjectSvg type={item.type}/>
                                <span>{item.fileName}</span>
                            </div>
                            <span>{item.lastCommit}</span>
                        </div>
                    )}
                    {isAddProject ?
                        <div className="project_files-body_addfile">
                            <label className="input-file btn project_files-body_addfile-inner">
                                <input onChange={(e) => handleFileSelected(e)} type="file" name="newFile"
                                       multiple={true}/> {/* directory={""} webkitdirectory={""} */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21"
                                     fill="none">
                                    <path
                                        d="M12.2015 0V8.95192H21V12.1154H12.2015V21H8.68657V12.1154H0V8.95192H8.68657V0H12.2015Z"
                                        fill="white"/>
                                </svg>
                                <div className="project_files-body_addfile-text">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"
                                         fill="none">
                                        <path
                                            d="M11.5447 3.04024L11.2102 3.41188V3.41188L11.5447 3.04024ZM14.5138 5.71241L14.1793 6.08406L14.5138 5.71241ZM16.2405 7.61557L15.7837 7.81899V7.81899L16.2405 7.61557ZM2.37868 15.6213L2.73223 15.2678L2.73223 15.2678L2.37868 15.6213ZM15.6213 15.6213L15.2678 15.2678L15.2678 15.2678L15.6213 15.6213ZM10.5 16H7.5V17H10.5V16ZM2 10.5V7.5H1V10.5H2ZM16 10.1722V10.5H17V10.1722H16ZM11.2102 3.41188L14.1793 6.08406L14.8483 5.34076L11.8792 2.66859L11.2102 3.41188ZM17 10.1722C17 8.90039 17.0101 8.1146 16.6972 7.41215L15.7837 7.81899C15.9899 8.28189 16 8.81206 16 10.1722H17ZM14.1793 6.08406C15.1903 6.99393 15.5776 7.35609 15.7837 7.81899L16.6972 7.41215C16.3844 6.70971 15.7936 6.19154 14.8483 5.34076L14.1793 6.08406ZM7.52234 2C8.70396 2 9.16544 2.00772 9.57779 2.16595L9.93605 1.23233C9.31049 0.992281 8.62823 1 7.52234 1V2ZM11.8792 2.66859C11.0612 1.9324 10.5615 1.47235 9.93605 1.23233L9.57779 2.16595C9.9902 2.32421 10.3364 2.62546 11.2102 3.41188L11.8792 2.66859ZM7.5 16C6.07165 16 5.05069 15.9989 4.27481 15.8946C3.51331 15.7922 3.06319 15.5987 2.73223 15.2678L2.02513 15.9749C2.57285 16.5226 3.26917 16.7684 4.14156 16.8857C4.99956 17.0011 6.09992 17 7.5 17V16ZM1 10.5C1 11.9001 0.998938 13.0004 1.11429 13.8584C1.23158 14.7308 1.4774 15.4271 2.02513 15.9749L2.73223 15.2678C2.40128 14.9368 2.20776 14.4867 2.10538 13.7252C2.00106 12.9493 2 11.9283 2 10.5H1ZM10.5 17C11.9001 17 13.0004 17.0011 13.8584 16.8857C14.7308 16.7684 15.4271 16.5226 15.9749 15.9749L15.2678 15.2678C14.9368 15.5987 14.4867 15.7922 13.7252 15.8946C12.9493 15.9989 11.9283 16 10.5 16V17ZM16 10.5C16 11.9283 15.9989 12.9493 15.8946 13.7252C15.7922 14.4867 15.5987 14.9368 15.2678 15.2678L15.9749 15.9749C16.5226 15.4271 16.7684 14.7308 16.8857 13.8584C17.0011 13.0004 17 11.9001 17 10.5H16ZM2 7.5C2 6.07165 2.00106 5.05069 2.10538 4.27481C2.20776 3.51331 2.40128 3.06319 2.73223 2.73223L2.02513 2.02513C1.4774 2.57285 1.23158 3.26917 1.11429 4.14156C0.998938 4.99956 1 6.09992 1 7.5H2ZM7.52234 1C6.11477 1 5.00899 0.998947 4.14744 1.11425C3.27189 1.23143 2.57324 1.47701 2.02513 2.02513L2.73223 2.73223C3.0628 2.40167 3.51432 2.20791 4.2801 2.10542C5.05988 2.00105 6.08659 2 7.52234 2V1Z"
                                            fill="white"/>
                                        <path
                                            d="M9.75 1.875V3.75C9.75 5.51777 9.75 6.40165 10.2992 6.95083C10.8483 7.5 11.7322 7.5 13.5 7.5H16.5"
                                            stroke="white"/>
                                    </svg>
                                    <span className="btn file">Добавить файл или папку</span>
                                </div>
                                <div></div>
                            </label>
                        </div>
                        :
                        <></>
                    }
                </div>
            </div>
        </>
    );
}

export default ProjectTable;