import { useNavigate } from 'react-router-dom';

const TaskMainCard = ({ tasks }) => {
  const navigate = useNavigate();
  return (
    <div className="tasks-card">
      <ul className="created-course-header-tags">
        {/* {data[index].tags.map((item) => {
          return <li className="created-course-header-tag">#{item.title}</li>;
        })} */}
        <li className="created-course-header-tag">#Python</li>
        <li className="created-course-header-tag">#Начинающим</li>
      </ul>
      <h2 className="tasks-card-title">_Самописный калькулятор</h2>
      <p className="tasks-card-desc clamp multiline">
        {'//'} Напишите программу, которая считывает с клавиатуры два целых числа и строку. Если эта
        строка является обозначением одной из четырёх математических операций (+, -, *, /), то
        выведите результат применения этой операции к введённым ранее числам, в противном случае
        выведите «Неверная операция». Если пользователь захочет поделить на ноль, выведите текст «На
        ноль делить нельзя!».
      </p>
      <div className="profile-difficulty">
        <p>_Сложность: </p>
        <ul className="profile-difficulty-range">
          <li className="profile-difficulty-range-item active"></li>
          <li className="profile-difficulty-range-item active"></li>
          <li className="profile-difficulty-range-item active"></li>
          <li className="profile-difficulty-range-item"></li>
          <li className="profile-difficulty-range-item"></li>
        </ul>
      </div>
      <button className="btn big primary">Решить задачу</button>
      <div className="tasks-card-bottom">
        <p className="tasks-card-bottom-info">
          {'>'} {'John Johnson'}, {'Администрация'}, {'28.06.2023'}
        </p>
        <p className="tasks-card-bottom-lang">
          {'//'} Язык: {'Putin'}
        </p>
      </div>
    </div>
  );
};

export default TaskMainCard;
