import {useEffect, useState} from "react";
import axiosClient from "../axiosClient";

import ProjectTable from "../components/Project/ProjectTable";
import {Link, useNavigate, useOutletContext, useParams} from "react-router-dom";
import ProjectFile from "../components/Project/ProjectFile";
import ProjectMain from "../components/Project/ProjectMain";
import ProjectReadme from "../components/Project/ProjectReadme";
import ModalWindowConfirm from "../components/Modal/ModalWindowConfirm";

const TemplatePage = ({isActiveSidebar}) => {

    const {activeSidebar} = useOutletContext();
    activeSidebar[0](isActiveSidebar);

    const navigate = useNavigate();

    const {template, username, lang} = useParams();

    const [filesProject, setFilesProject] = useState([]);
    const [projectInfo, setProjectInfo] = useState({});
    const [readmeFile, setReadmeFile] = useState("");
    const [secondaryPathProject, setSecondaryPathProject] = useState(undefined);
    const [beforeFolder, setBeforeFolder] = useState(undefined);
    const [isMainFolder, setIsMainFolder] = useState(false);

    const [isOpenModal, setIsOpenModal] = useState(false);

    useEffect(() => {
        axiosClient.post(`${lang === undefined ? '/' : '/' + lang + '/'}` + "@" + username + "/template/" + template + "/" +
            (secondaryPathProject === undefined ? '' : secondaryPathProject))
            .then(({data}) => {
                setReadmeFile(data.readmeFile);
                setProjectInfo(data.template);
                setFilesProject(data.filesInfo);
                setIsMainFolder(secondaryPathProject === undefined);
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
                // if (err.response.status === 404) {
                //     navigate('/page/not-found');
                // }
            });
    }, [secondaryPathProject, username, template]);

    const onClickNavCompiler = () => {
        navigate('/compiler/' + username + '/' + template);
        //TODO создание проекта
    }

    const handleProjectDelete = () => {
        axiosClient.post(`/@${username}/template-delete/${template}`)
            .then((res) => {
                if (res.data.success) {
                    navigate(`${lang === undefined ? '/' : '/' + lang + '/'}profile/${username}`);
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleProjectDownload = () => {
        axiosClient.get(`/@${username}/project-download/${template}`, {responseType: 'blob'})
            .then((res) => {
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `${username}-${template}.zip`);
                document.body.appendChild(link);
                link.click();
                link.remove();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <>
            {Object.keys(projectInfo).length === 0 ?
                <div>Loading....</div>
                :
                <>
                    <div className="project">
                        <div className="project__inner">

                            <ProjectMain projectInfo={projectInfo} isTemplate={true}/>

                            {"language" in filesProject ?
                                <ProjectFile beforeFolder={beforeFolder} obj={filesProject}
                                             setSecondaryPath={(path) => setSecondaryPathProject(path)}
                                             setBeforeFolder={(folder) => setBeforeFolder(folder)}/>
                                :
                                <>
                                    <ProjectTable
                                        setBeforeFolder={(folder) => setBeforeFolder(folder)}
                                        beforeFolder={beforeFolder}
                                        isMainFolder={isMainFolder}
                                        obj={filesProject}
                                        secondaryPath={secondaryPathProject}
                                        setSecondaryPath={(path) => setSecondaryPathProject(path)}
                                    />
                                    <div className="project__action">
                                        <div className="project__action-center">
                                            <button className="btn  primary  big center"
                                                    onClick={() => onClickNavCompiler()}>Открыть в компиляторе
                                            </button>
                                            <div className="project__action-links center btn btn-white">
                                                <button className="project__action-links-item"
                                                        onClick={() => handleProjectDownload()}>
                                                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M2.625 13.125C2.625 15.5999 2.625 16.8373 3.39384 17.6062C4.16269 18.375 5.40013 18.375 7.875 18.375H13.125C15.5999 18.375 16.8373 18.375 17.6062 17.6062C18.375 16.8373 18.375 15.5999 18.375 13.125"
                                                            stroke="white" strokeLinecap="round"
                                                            strokeLinejoin="round"/>
                                                        <path d="M10.5 2.625V14M10.5 14L14 10.1719M10.5 14L7 10.1719"
                                                              stroke="white" strokeLinecap="round"
                                                              strokeLinejoin="round"/>
                                                    </svg>
                                                    <span>Скачать</span>
                                                </button>
                                                <button className="project__action-links-item btn btn-red"
                                                        onClick={() => setIsOpenModal(true)}>
                                                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="10.5" cy="10.5" r="8.75" stroke="#DB5B42"/>
                                                        <path
                                                            d="M12.6875 8.31249L8.3125 12.6875M8.31248 8.31247L12.6875 12.6875"
                                                            stroke="#DB5B42" strokeLinecap="round"/>
                                                    </svg>
                                                    <p>Удалить</p>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* {console.log(readmeFile)} */}
                                    <ProjectReadme markdownFile={readmeFile}></ProjectReadme>
                                </>
                            }
                        </div>
                    </div>
                    <ModalWindowConfirm
                        isOpen={isOpenModal}
                        setIsOpen={setIsOpenModal}
                        isContentShowed={true}
                        isButtonsShowed={true}
                        titleText={"Вы действительно хотите удалить проект?"}
                        contentText={"После удаления проекта его восстановить будет невозможно"}
                        handleOk={handleProjectDelete}
                        handleCancel={() => setIsOpenModal(false)}
                    />
                </>
            }
        </>

    );
}

export default TemplatePage;
