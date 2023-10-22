import { useOutletContext } from "react-router-dom";

const ProjectAddPage = ({ activeSidebar }) => {
    const [setActiveSidebar] = useOutletContext(activeSidebar);
    setActiveSidebar(activeSidebar);

    return (
        <div className="project">
            <div className="project__container">
                <div className="project__inner">
                    <h1 className="markdown-h1 project__add-title">Создать проект</h1>

                    <div className="project__add-body">

                        <div className="project__add-body_name">
                            <input className="input width100" type="text" name="projectName" id="projectName" placeholder="Название проекта" />

                            <div className="select-arrow">
                                <select className="select big" name="" id="">
                                    <option value="">Публичный</option>
                                    <option value="">Приватный</option>
                                </select>
                            </div>
                        </div>

                        <textarea className="roject__add-body_desc" placeholder="Описание проекта"></textarea>

                        <div className="project__add-body_files">
                            <input className="roject__add-body_file" type="file" name="" id="" />
                            <input className="roject__add-body_file" type="file" name="" id="" />
                        </div>

                        <button type="file" className="btn primary big"><span>Выберите папку</span></button>
                        <div>
                            Перетащите сюда или выберите папку с проектом
                            <br />
                            (Вы можете загружать несколько папок)
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ProjectAddPage;