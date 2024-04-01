const LessonOneOption = () => {
  return (
    <div className="lessons-oneoption">
      <div className="lessons-oneoption-info">
        <p className="markdown-h2">Основные свойства</p>
        <p className="markdown-h3">Синтаксис</p>
        <p className="markdown-p">
          Во первых стоит отметить интересную особенность Python. Он не содержит операторных скобок
          (begin..end в pascal или в Си), вместо этого блоки выделяются отступами: пробелами или
          табуляцией, а вход в блок из операторов осуществляется двоеточием. Однострочные
          комментарии начинаются со знака фунта «#», многострочные — начинаются и заканчиваются
          тремя двойными кавычками «"""».Чтобы присвоить значение пременной используется знак «=», а
          для сравнения —«==». Для увеличения значения переменной, или добавления к строке
          используется оператор «+=», а для уменьшения — «-=». Все эти операции могут
          взаимодействовать с большинством типов, в том числе со строками. Например
        </p>
      </div>
      <div className="lesson-oneoption-answer">
        <p className="markdown-h3">Выберите правильный ответ</p>
        <form className="radio-list">
          <label className="radio-list-label">
            <input type="radio" name="a" />
            Ответ
          </label>
          <label className="radio-list-label">
            <input type="radio" name="a" />
            Ответ
          </label>
          <label className="radio-list-label">
            <input type="radio" name="a" />
            Ответ
          </label>
        </form>
      </div>
    </div>
  );
};

export default LessonOneOption;
