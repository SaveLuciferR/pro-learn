const CourseLessonFewOption = () => {
  return (
    <div className="lessons-option">
      <div className="lessons-option-info">
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
      <div className="lessons-option-answer">
        <p className="markdown-h3">Выберите правильный ответ</p>
        <div className="lessons-checkbox">
          <label>
            <input className="real_checkbox" type="checkbox" name="a" />
            <span className="custom_checkbox"></span>
            <p>Ответ</p>
          </label>
          <label>
            <input className="real_checkbox" type="checkbox" name="a" />
            <span className="custom_checkbox"></span>
            <p>Ответ</p>
          </label>
          <label>
            <input className="real_checkbox" type="checkbox" name="a" />
            <span className="custom_checkbox"></span>
            <p>Ответ</p>
          </label>
          <label>
            <input className="real_checkbox" type="checkbox" name="a" />
            <span className="custom_checkbox"></span>
            <p>Ответ</p>
          </label>
          <label>
            <input className="real_checkbox" type="checkbox" name="a" />
            <span className="custom_checkbox"></span>
            <p>Ответ</p>
          </label>
        </div>
      </div>
    </div>
  );
};
export default CourseLessonFewOption;
