import {useNavigate} from 'react-router-dom';

const TaskMainCard = ({data}) => {
    const navigate = useNavigate();
    return (
        <div className="tasks-card">
            <ul className="created-course-header-tags">
                {data.tags.map((item) => {
                    return <li className="created-course-header-tag">#{item.title}</li>;
                })}
            </ul>
            <h2 className="tasks-card-title">_{data.title}</h2>
            <div className={"tasks-card-desc clamp multiline"} dangerouslySetInnerHTML={{__html: data.content}}></div>
            {/*<p className="tasks-card-desc clamp multiline">*/}
            {/*{'//'} {data.description}*/}
            {/*</p>*/}
            <div className="profile-difficulty">
                <p>_Сложность: </p>
                <ul className="profile-difficulty-range">
                    {Array(5).fill('').map((item, i) =>
                        <li key={i}
                            className={`profile-difficulty-range-item ${i < data.difficulty ? 'active' : ''}`}></li>
                    )}
                </ul>
            </div>
            <button onClick={() => navigate(`${data.slug}`)} className="btn big primary">Решить задачу</button>
            <div className="tasks-card-bottom">
                <p className="tasks-card-bottom-info">
                    {'>'} {data.username}, {data.role === 'admin' ? 'Администратор' : 'Пользователь'}, {data.date_of_publication}
                </p>
                <p className="tasks-card-bottom-lang">
                    {'//'} Язык: {'C++'}
                </p>
            </div>
        </div>
    );
};

export default TaskMainCard;
