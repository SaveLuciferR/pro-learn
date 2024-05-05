import {useNavigate, useParams} from "react-router-dom";
import {useState, useEffect} from "react";

import axiosClient from "../axiosClient";
import {useDispatch, useSelector} from "react-redux";
import ProjectTable from "../components/Project/ProjectTable";
import {
    setFilesAddProject,
    setNewTableAddProject,
    setSecondaryPathProjectAddProject,
    setMainFolderAddProject, setAddNewFiles
} from "../redux/Project/slice";
import ProjectFile from "../components/Project/ProjectFile";
import {setTitleText} from "../redux/Modal/slice";

const ProjectAddPage = ({type = 'create', isTemplate = false}) => {
    // const [setActiveSidebar] = useOutletContext(activeSidebar);
    // setActiveSidebar(activeSidebar);


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userAuth = useSelector(state => state.mainLayout.userAuth);

    if (!userAuth) navigate('/');

    let baseURL = axiosClient.defaults.baseURL;
    const {username, slug, lang} = useParams();

    const readmeFileInAddProject = useSelector(state => state.project.readmeFileInAddProject);
    const newTableAddProject = useSelector(state => state.project.newTableAddProject);
    const filesAddProject = useSelector(state => state.project.filesAddProject);
    const secondaryPathProject = useSelector(state => state.project.secondaryPathProjectAddProject);
    // const mainFolderProject = useSelector(state => state.project.mainFolderAddProject);
    const newFilesAddProject = useSelector(state => state.project.newFilesAddProject);
    const mainFolderNewFileAddProject = useSelector(state => state.project.mainFolderNewFileAddProject);
    const addNewFiles = useSelector(state => state.project.addNewFiles);

    const [nameProject, setNameProject] = useState('');
    const [descProject, setDescProject] = useState('');
    const [privacyProject, setPrivacyProject] = useState(1);
    const [dropdownMenuActive, setDropdownMenuActive] = useState(false);
    const [filesAdded, setFilesAdded] = useState(false);
    const [haveFiles, setHaveFiles] = useState(false);
    const [uploadInfoFiles, setUploadInfoFiles] = useState({});
    const [isMainFolder, setIsMainFolder] = useState(false);
    const [beforeFolder, setBeforeFolder] = useState("");
    const [needUpdateTable, setNeedUpdateTable] = useState(false);
    // const [secondaryPathProject, setSecondaryPathProject] = useState("");
    // const [mainFolderProject, setMainFolderProject] = useState("");
    const [newProject, setNewProject] = useState(true);
    const [newFilesInfo, setNewFilesInfo] = useState([]); //{'fileName': 'text.txt', 'content': "new-file", 'path': undefined}

    const privacySettings = {
        0: "Публичный",
        1: "Приватный"
    };

    const dropdownClick = () => dropdownMenuActive ? setDropdownMenuActive(false) : setDropdownMenuActive(true);

    const setNewPrivate = (e) => {
        e.persist();
    }

    const axiosAddProject = async () => {
        await axiosClient.post(
            `/@${username}/project-add`,
            {
                uploadInfoFiles,
                // mainFolderProject,
                newProject,
                username,
            },
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        )
            .then(({data}) => {
                console.log(data);
                setHaveFiles(true);

                dispatch(setNewTableAddProject(true));
            })
            .catch((err) => {
                console.log(err)
                setHaveFiles(false);
            })
            .finally(() => {
                setUploadInfoFiles({});
            });
        setFilesAdded(false);
    }

    const handleFileDelete = (e, path, fileName) => {
        e.stopPropagation();
        path = path === undefined ? '/' : '/' + path + '/';
        path += fileName;
        axiosClient.post(`/@${username}/project-add/delete-file`, {path, type, slug})
            .then((data) => {

            })
            .catch((err) => {

            })
            .finally(() => {
                setNeedUpdateTable(true);
            })
        console.log(path, fileName);
        //TODO Modal confirm
    }

    useEffect(() => {
        if (Object.keys(uploadInfoFiles).length !== 0) {
            axiosAddProject();
        }
    }, [uploadInfoFiles])

    const axiosNewFiles = async () => {
        await axiosClient.post(`/@${username}/project-add/new-files`,
            {
                type,
                slug,
                newFilesInfo,
                secondaryPathProject: secondaryPathProject === undefined ? '/' : '/' + secondaryPathProject + '/',
                // mainFolderProject,
                username
            },
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        )
            .then(({data}) => {
                console.log(data);
                setHaveFiles(true);

                dispatch(setAddNewFiles(false));
            })
            .catch((err) => {
                console.log(err);

                dispatch(setAddNewFiles(false));
            })
            .finally(() => {
                setNeedUpdateTable(true);
                setNewFilesInfo([]);
            })
    }

    // useEffect(() => {
    //     if (filesAdded) {
    //         // console.log(uploadInfoFiles);
    //         // axiosAddProject();
    //     }
    // }, [filesAdded]);

    useEffect(() => {
        console.log(newFilesInfo);
        if (newFilesInfo.length !== 0) {
            axiosNewFiles();
        }
    }, [newFilesInfo]);

    useEffect(() => {
        if (type === 'edit') {
            axiosClient.get(`/@${username}/project-edit/${slug}`)
                .then((res) => {
                    console.log(res.data.project)
                    setNeedUpdateTable(true);
                    setNameProject(res.data.project.title)
                    setDescProject(res.data.project.description)
                    setPrivacyProject(res.data.project.private);

                })
                .catch((error) => {
                    console.log(error);
                })
        } else {
            axiosClient.post(`/@${username}/project-add/get-project-in-cache` + "/", {
                type: 'create',
                username,
                // mainFolderProject,
                secondaryPathProject: secondaryPathProject === undefined ? '' : secondaryPathProject
            })
                .then(({data}) => {
                    // dispatch(setReadmeFileInAddProject(data.readmeFile));
                    setHaveFiles(data.filesInfo.length !== 0);
                    // setHaveFiles(true);
                    dispatch(setFilesAddProject(data.filesInfo));
                    setIsMainFolder(secondaryPathProject === undefined);
                    dispatch(setNewTableAddProject(false));
                    // console.log(data.filesInfo);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [])

    useEffect(() => {
        if (newTableAddProject || needUpdateTable) {
            axiosClient.post(`/@${username}/project-add/get-project-in-cache` + "/", {
                type: type,
                slug: slug,
                username,
                // mainFolderProject,
                secondaryPathProject: secondaryPathProject === undefined ? '' : secondaryPathProject
            })
                .then(({data}) => {
                    // console.log(data);
                    // dispatch(setReadmeFileInAddProject(data.readmeFile));
                    setHaveFiles(data.filesInfo.length !== 0);
                    dispatch(setFilesAddProject(data.filesInfo));
                    setIsMainFolder(secondaryPathProject === undefined);
                    dispatch(setNewTableAddProject(false));
                })
                .catch((err) => {
                    console.log(err);
                });
            setNewTableAddProject(false);
            setNeedUpdateTable(false);
        }
    }, [secondaryPathProject, username, newTableAddProject, needUpdateTable]);

    const handleFileSelected = (e) => {
        // const currentFiles = Array.from(e.target.files);
        //
        // dispatch(setMainFolderAddProject(currentFiles[0].webkitRelativePath.split('/')[0]));
        // setUploadInfoFiles(getStructureUploadFiles(currentFiles));
        console.log(e);
        setUploadInfoFiles(Array.from(e));
    }

    const getStructureUploadFiles = (files, newFile = false) => {
        let successFiles = [];
        // Object.freeze(successFiles);
        files.map((item) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(item);
            fileReader.onload = () => {
                if (newFile) {
                    let path = secondaryPathProject === undefined ? 'undefined' : secondaryPathProject.split('/');
                    successFiles.push({'fileName': item.name, 'content': fileReader.result, 'path': path});
                    // successFiles = [...successFiles, {'fileName': item.name, 'content': fileReader.result, 'path': path}];
                    // dispatch(setNewFilesAddProject([{
                    //     'fileName': item.name,
                    //     'content': fileReader.result,
                    //     'path': path
                    // }]));
                } else {
                    let path = item.webkitRelativePath;
                    path = path.split('/');
                    path.splice(path.length - 1, 1);
                    successFiles.push({'fileName': item.name, 'content': fileReader.result, 'path': path});
                }

                setFilesAdded(true);
                dispatch(setAddNewFiles(true));
            }
        });

        console.log(successFiles);
        return successFiles;
    }

    const onClickSaveNewProject = () => {
        if (nameProject.length === 0) {
            console.log("Все поля должны быть заполнены");
            return;
        }

        if (type === 'edit') {
            axiosClient.post(`/@${username}/project-save-edit/${slug}`, {
                username,
                nameProject,
                descProject,
                privacyProject,
            })
                .then((res) => {
                    console.log(res);
                    navigate(`${lang === undefined ? '/' : '/' + lang + '/'}profile/${username}/project/${slug}`)
                })
                .catch((error) => {
                    console.log(error);
                })
        } else {
            axiosClient.post(`/@${username}/project-save-new`, {
                // mainFolderProject,
                username,
                nameProject,
                descProject,
                privacyProject
            })
                .then(({data}) => {
                    // console.log(data);
                    navigate('/profile/' + username + '/project/' + data.slug);
                });
        }
    }

    return (
        <div className="project">
            <div className="project__container">
                <div className="project__inner">
                    <h1 className="markdown-h1 project__add-title">{type === 'edit' ? 'Изменить проект' : 'Создать проект'}</h1>

                    <div className="project__add-body">

                        <div className="project__add-body_name">
                            <input className="input width100" type="text" name="projectName" id="projectName"
                                   placeholder="Название проекта" value={nameProject}
                                   onChange={(e) => setNameProject(e.target.value)}/>
                            <div className={`dropdown ${dropdownMenuActive ? 'active' : ""}`}
                                 onClick={() => dropdownClick()}>
                                <div className="select big">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="none">
                                        <path
                                            d="M17 20C17 18.3431 14.7614 17 12 17C9.23858 17 7 18.3431 7 20M21 17.0004C21 15.7702 19.7659 14.7129 18 14.25M3 17.0004C3 15.7702 4.2341 14.7129 6 14.25M18 10.2361C18.6137 9.68679 19 8.8885 19 8C19 6.34315 17.6569 5 16 5C15.2316 5 14.5308 5.28885 14 5.76389M6 10.2361C5.38625 9.68679 5 8.8885 5 8C5 6.34315 6.34315 5 8 5C8.76835 5 9.46924 5.28885 10 5.76389M12 14C10.3431 14 9 12.6569 9 11C9 9.34315 10.3431 8 12 8C13.6569 8 15 9.34315 15 11C15 12.6569 13.6569 14 12 14Z"
                                            stroke="white" strokeWidth="1.5" strokeLinecap="round"
                                            strokeLinejoin="round"/>
                                    </svg>
                                    <span className="big">{privacySettings[privacyProject]}</span>
                                    <svg className="arrow" xmlns="http://www.w3.org/2000/svg" width="21" height="21"
                                         viewBox="0 0 21 21" fill="none">
                                        <path d="M16.625 7.875L10.5 13.125L4.375 7.875" stroke="white"
                                              strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <ul className={`dropdown-menu  ${dropdownMenuActive ? 'active' : ''}`}>
                                    {Object.keys(privacySettings).map((item) =>
                                        item != privacyProject ?
                                            <li key={item} className="private" onClick={() => setPrivacyProject(item)}
                                                id={item}
                                                data-id={item}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                     viewBox="0 0 24 24" fill="none">
                                                    <path
                                                        d="M19 21C19 17.134 15.866 14 12 14C8.13401 14 5 17.134 5 21M12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7C16 9.20914 14.2091 11 12 11Z"
                                                        stroke="white" strokeWidth="2" strokeLinecap="round"
                                                        strokeLinejoin="round"/>
                                                </svg>
                                                <span>{privacySettings[item]}</span>
                                            </li>
                                            : <></>
                                    )}
                                </ul>
                            </div>
                        </div>

                        <textarea className="project__add-body_desc  input textarea scroll"
                                  placeholder="Описание проекта" value={descProject}
                                  onChange={(e) => setDescProject(e.target.value)}/>

                        {haveFiles ?
                            ("language" in filesAddProject ?
                                    <ProjectFile beforeFolder={beforeFolder} obj={filesAddProject}
                                                 setSecondaryPath={(path) => dispatch(setSecondaryPathProjectAddProject(path))}
                                                 setBeforeFolder={(folder) => setBeforeFolder(folder)}/>
                                    :
                                    <ProjectTable
                                        setBeforeFolder={(folder) => setBeforeFolder(folder)}
                                        beforeFolder={beforeFolder}
                                        isMainFolder={isMainFolder}
                                        obj={filesAddProject}
                                        secondaryPath={secondaryPathProject}
                                        setSecondaryPath={(path) => dispatch(setSecondaryPathProjectAddProject(path))}
                                        isAddProject={true}
                                        getStructureUploadFiles={(files, newFile) => getStructureUploadFiles(files, newFile)}
                                        setNewFilesInfo={(files) => setNewFilesInfo(files)}
                                        handleFileDelete={handleFileDelete}
                                    />
                            ) :
                            <></>
                        }

                        <div className="project__add-body_files">
                            {/*<div className="project__add-body_files-item">*/}
                            {/*    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"*/}
                            {/*         fill="none">*/}
                            {/*        <path*/}
                            {/*            d="M11.5447 3.04024L11.2102 3.41188V3.41188L11.5447 3.04024ZM14.5138 5.71241L14.1793 6.08406L14.5138 5.71241ZM16.2405 7.61557L15.7837 7.81899V7.81899L16.2405 7.61557ZM2.37868 15.6213L2.73223 15.2678L2.73223 15.2678L2.37868 15.6213ZM15.6213 15.6213L15.2678 15.2678L15.2678 15.2678L15.6213 15.6213ZM10.5 16H7.5V17H10.5V16ZM2 10.5V7.5H1V10.5H2ZM16 10.1722V10.5H17V10.1722H16ZM11.2102 3.41188L14.1793 6.08406L14.8483 5.34076L11.8792 2.66859L11.2102 3.41188ZM17 10.1722C17 8.90039 17.0101 8.1146 16.6972 7.41215L15.7837 7.81899C15.9899 8.28189 16 8.81206 16 10.1722H17ZM14.1793 6.08406C15.1903 6.99393 15.5776 7.35609 15.7837 7.81899L16.6972 7.41215C16.3844 6.70971 15.7936 6.19154 14.8483 5.34076L14.1793 6.08406ZM7.52234 2C8.70396 2 9.16544 2.00772 9.57779 2.16595L9.93605 1.23233C9.31049 0.992281 8.62823 1 7.52234 1V2ZM11.8792 2.66859C11.0612 1.9324 10.5615 1.47235 9.93605 1.23233L9.57779 2.16595C9.9902 2.32421 10.3364 2.62546 11.2102 3.41188L11.8792 2.66859ZM7.5 16C6.07165 16 5.05069 15.9989 4.27481 15.8946C3.51331 15.7922 3.06319 15.5987 2.73223 15.2678L2.02513 15.9749C2.57285 16.5226 3.26917 16.7684 4.14156 16.8857C4.99956 17.0011 6.09992 17 7.5 17V16ZM1 10.5C1 11.9001 0.998938 13.0004 1.11429 13.8584C1.23158 14.7308 1.4774 15.4271 2.02513 15.9749L2.73223 15.2678C2.40128 14.9368 2.20776 14.4867 2.10538 13.7252C2.00106 12.9493 2 11.9283 2 10.5H1ZM10.5 17C11.9001 17 13.0004 17.0011 13.8584 16.8857C14.7308 16.7684 15.4271 16.5226 15.9749 15.9749L15.2678 15.2678C14.9368 15.5987 14.4867 15.7922 13.7252 15.8946C12.9493 15.9989 11.9283 16 10.5 16V17ZM16 10.5C16 11.9283 15.9989 12.9493 15.8946 13.7252C15.7922 14.4867 15.5987 14.9368 15.2678 15.2678L15.9749 15.9749C16.5226 15.4271 16.7684 14.7308 16.8857 13.8584C17.0011 13.0004 17 11.9001 17 10.5H16ZM2 7.5C2 6.07165 2.00106 5.05069 2.10538 4.27481C2.20776 3.51331 2.40128 3.06319 2.73223 2.73223L2.02513 2.02513C1.4774 2.57285 1.23158 3.26917 1.11429 4.14156C0.998938 4.99956 1 6.09992 1 7.5H2ZM7.52234 1C6.11477 1 5.00899 0.998947 4.14744 1.11425C3.27189 1.23143 2.57324 1.47701 2.02513 2.02513L2.73223 2.73223C3.0628 2.40167 3.51432 2.20791 4.2801 2.10542C5.05988 2.00105 6.08659 2 7.52234 2V1Z"*/}
                            {/*            fill="white"/>*/}
                            {/*        <path*/}
                            {/*            d="M9.75 1.875V3.75C9.75 5.51777 9.75 6.40165 10.2992 6.95083C10.8483 7.5 11.7322 7.5 13.5 7.5H16.5"*/}
                            {/*            stroke="white"/>*/}
                            {/*    </svg>*/}
                            {/*    <form method="post">*/}
                            {/*        <button className="btn file" type="submit" name="" id="">Добавить README.md</button>*/}
                            {/*    </form>*/}
                            {/*</div>*/}
                            {/*<div className="project__add-body_files-item">*/}
                            {/*    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"*/}
                            {/*         fill="none">*/}
                            {/*        <path*/}
                            {/*            d="M11.5447 3.04024L11.2102 3.41188V3.41188L11.5447 3.04024ZM14.5138 5.71241L14.1793 6.08406L14.5138 5.71241ZM16.2405 7.61557L15.7837 7.81899V7.81899L16.2405 7.61557ZM2.37868 15.6213L2.73223 15.2678L2.73223 15.2678L2.37868 15.6213ZM15.6213 15.6213L15.2678 15.2678L15.2678 15.2678L15.6213 15.6213ZM10.5 16H7.5V17H10.5V16ZM2 10.5V7.5H1V10.5H2ZM16 10.1722V10.5H17V10.1722H16ZM11.2102 3.41188L14.1793 6.08406L14.8483 5.34076L11.8792 2.66859L11.2102 3.41188ZM17 10.1722C17 8.90039 17.0101 8.1146 16.6972 7.41215L15.7837 7.81899C15.9899 8.28189 16 8.81206 16 10.1722H17ZM14.1793 6.08406C15.1903 6.99393 15.5776 7.35609 15.7837 7.81899L16.6972 7.41215C16.3844 6.70971 15.7936 6.19154 14.8483 5.34076L14.1793 6.08406ZM7.52234 2C8.70396 2 9.16544 2.00772 9.57779 2.16595L9.93605 1.23233C9.31049 0.992281 8.62823 1 7.52234 1V2ZM11.8792 2.66859C11.0612 1.9324 10.5615 1.47235 9.93605 1.23233L9.57779 2.16595C9.9902 2.32421 10.3364 2.62546 11.2102 3.41188L11.8792 2.66859ZM7.5 16C6.07165 16 5.05069 15.9989 4.27481 15.8946C3.51331 15.7922 3.06319 15.5987 2.73223 15.2678L2.02513 15.9749C2.57285 16.5226 3.26917 16.7684 4.14156 16.8857C4.99956 17.0011 6.09992 17 7.5 17V16ZM1 10.5C1 11.9001 0.998938 13.0004 1.11429 13.8584C1.23158 14.7308 1.4774 15.4271 2.02513 15.9749L2.73223 15.2678C2.40128 14.9368 2.20776 14.4867 2.10538 13.7252C2.00106 12.9493 2 11.9283 2 10.5H1ZM10.5 17C11.9001 17 13.0004 17.0011 13.8584 16.8857C14.7308 16.7684 15.4271 16.5226 15.9749 15.9749L15.2678 15.2678C14.9368 15.5987 14.4867 15.7922 13.7252 15.8946C12.9493 15.9989 11.9283 16 10.5 16V17ZM16 10.5C16 11.9283 15.9989 12.9493 15.8946 13.7252C15.7922 14.4867 15.5987 14.9368 15.2678 15.2678L15.9749 15.9749C16.5226 15.4271 16.7684 14.7308 16.8857 13.8584C17.0011 13.0004 17 11.9001 17 10.5H16ZM2 7.5C2 6.07165 2.00106 5.05069 2.10538 4.27481C2.20776 3.51331 2.40128 3.06319 2.73223 2.73223L2.02513 2.02513C1.4774 2.57285 1.23158 3.26917 1.11429 4.14156C0.998938 4.99956 1 6.09992 1 7.5H2ZM7.52234 1C6.11477 1 5.00899 0.998947 4.14744 1.11425C3.27189 1.23143 2.57324 1.47701 2.02513 2.02513L2.73223 2.73223C3.0628 2.40167 3.51432 2.20791 4.2801 2.10542C5.05988 2.00105 6.08659 2 7.52234 2V1Z"*/}
                            {/*            fill="white"/>*/}
                            {/*        <path*/}
                            {/*            d="M9.75 1.875V3.75C9.75 5.51777 9.75 6.40165 10.2992 6.95083C10.8483 7.5 11.7322 7.5 13.5 7.5H16.5"*/}
                            {/*            stroke="white"/>*/}
                            {/*    </svg>*/}
                            {/*    <form method="post">*/}
                            {/*        <button className="btn file" type="sumbit" name="" id="">Добавить .ignore</button>*/}
                            {/*    </form>*/}
                            {/*</div>*/}
                        </div>

                        <div className="project__add-buttons">
                            <form method="post">
                                <label className="input-file  btn primary big width300px">
                                    <input onChange={(e) => handleFileSelected(e.target.files)}
                                           type="file"
                                           name="project"
                                           multiple={true} directory={""} webkitdirectory={""}/>
                                    <div className="input-file-text">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21"
                                             viewBox="0 0 21 21"
                                             fill="none">
                                            <path d="M15.75 8.75L11.375 8.75" stroke="white" strokeWidth="1.5"
                                                  strokeLinecap="round"/>
                                            <path
                                                d="M1.75 6.08103C1.75 5.30881 1.75 4.92271 1.81068 4.60109C2.07781 3.18527 3.18527 2.07781 4.60109 1.81068C4.92271 1.75 5.30881 1.75 6.08103 1.75C6.41937 1.75 6.58854 1.75 6.75112 1.7652C7.45207 1.83075 8.11696 2.10616 8.65895 2.55545C8.78466 2.65966 8.90428 2.77928 9.14353 3.01853L9.625 3.5C10.3388 4.21381 10.6957 4.57071 11.1231 4.8085C11.3579 4.93912 11.6069 5.04228 11.8653 5.11593C12.3357 5.25 12.8404 5.25 13.8499 5.25H14.1768C16.4802 5.25 17.6318 5.25 18.3804 5.92328C18.4493 5.98521 18.5148 6.05074 18.5767 6.1196C19.25 6.86818 19.25 8.01984 19.25 10.3232V12.25C19.25 15.5498 19.25 17.1997 18.2249 18.2249C17.1997 19.25 15.5498 19.25 12.25 19.25H8.75C5.45017 19.25 3.80025 19.25 2.77513 18.2249C1.75 17.1997 1.75 15.5498 1.75 12.25V6.08103Z"
                                                stroke="white" strokeWidth="1.5"/>
                                        </svg>
                                        <span>Выберите папку или файл</span>
                                    </div>
                                </label>
                            </form>
                            <button className="btn primary big" type="button"
                                    onClick={() => onClickSaveNewProject()}>Сохранить проект
                            </button>
                        </div>

                        <div className="project__add-body_desc-files">
                            Выберите папку с проектом
                            <br/>
                            (Вы можете загружать несколько папок последователь)
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
        ;
}

export default ProjectAddPage;