import {useNavigate, useParams} from 'react-router-dom';
import ModalCreateProject from "../../Modal/ModalCreateProject";
import {useState} from "react";
import ModalWindowInput from "../../Modal/ModalWindowInput";
import axiosClient from "../../../axiosClient";
import {useSelector} from "react-redux";

const ProfileProjectsButton = ({viewWords}) => {
    const {lang, username} = useParams();
    const navigate = useNavigate();

    const user = useSelector(state => state.mainLayout.user);

    const [isOpenCreateProject, setIsOpenCreateProject] = useState(false);
    const [isOpenNameProject, setIsOpenNameProject] = useState(false);
    const [currentTemplateID, setCurrentTemplateID] = useState(-1);
    const [errorText, setErrorText] = useState('');
    const [nameProject, setNameProject] = useState('');

    const gotoCompiler = () => {
        if (currentTemplateID === -1) return;
        setIsOpenNameProject(true)
        setIsOpenCreateProject(false);
    }

    console.log(viewWords)

    const templateToProject = (isCreate) => {
        axiosClient.post(`/@${username}/template-to-project`, {
            template: currentTemplateID,
            titleProject: nameProject,
            isCreate: isCreate
        })
            .then((res) => {
                if (res.data.slug !== '') {
                    setIsOpenNameProject(false);
                    navigate(`${lang === undefined ? '/' : '/' + lang + '/'}compiler/${username}/${res.data.slug}`);
                }
                else {
                    navigate(`${lang === undefined ? '/' : '/' + lang + '/'}profile/${username}/project-creation`);
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const createCompiler = () => {
        if (nameProject.length === 0) {
            setErrorText(viewWords['tpl_profile_project_modal-title_error_have-not-text']);
            return;
        }

        templateToProject(true);
    }

    const gotoCreate = () => {
        templateToProject(false);
    }

    return (
        <>
            <button
                style={{pointerEvents: user.username === username ? 'auto' : 'none'}}
                className="profile-projects-card-button"
                // onClick={() =>
                //     navigate(`${lang === undefined ? '/' : '/' + lang + '/'}profile/${username}/project-creation`)
                // }
                onClick={() => setIsOpenCreateProject(true)}
            >
                <div className="profile-projects-card-button-items">
                    <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M18.5928 0V13.641H32V18.4615H18.5928V32H13.2367V18.4615H0V13.641H13.2367V0H18.5928Z"
                            fill="white"
                            fillOpacity="0.6"
                        />
                    </svg>
                    <p className="profile-question-ask-text-title">{viewWords['tpl_profile_project_create-title']}</p>
                </div>
            </button>
            <ModalCreateProject
                isOpen={isOpenCreateProject}
                setIsOpen={setIsOpenCreateProject}
                currentTemplate={currentTemplateID}
                setCurrentTemplate={setCurrentTemplateID}
                handleGotoCompiler={gotoCompiler}
                handleGotoCreate={gotoCreate}
            />
            <ModalWindowInput
                isOpen={isOpenNameProject}
                setIsOpen={setIsOpenNameProject}
                onClickButton={createCompiler}
                placeholderText={viewWords['tpl_profile_project_modal-title_placeholder']}
                errorText={errorText}
                titleText={viewWords['tpl_profile_project_modal-title_title']}
                buttonText={viewWords['tpl_profile_project_modal-title_button']}
                content={nameProject}
                setContent={setNameProject}
            />
        </>
    );
};
export default ProfileProjectsButton;
