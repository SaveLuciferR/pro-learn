import { useEffect, useState } from 'react';
import axiosClient from '../../axiosClient';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { setFeedbackCategory, setCurrentFeedbackCategory } from '../../redux/MainLayout/slice';
import { useDispatch, useSelector } from 'react-redux';

const Feedback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let url = useLocation().pathname;

  const feedbackCategories = useSelector((state) => state.mainLayout.feedbackCategories);
  const { lang } = useParams();

  const [dropdownMenuActive, setDropdownMenuActive] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [currentFeedbackCategory, setCurrentFeedbackCategory] = useState({});

  const setNewPrivate = (e) => {
    e.persist();
  };
  const dropdownClick = () =>
    dropdownMenuActive ? setDropdownMenuActive(false) : setDropdownMenuActive(true);

  async function OnClickFeedback() {
    if (name.length !== 0 && email.length !== 0 && message.length !== 0) {
      await axiosClient
        .post('/user/save-feedback', { name, email, currentFeedbackCategory, message })
        .then(({ data }) => {
          url = url.replace(`/user/feedback`, '');
          navigate(url);
          console.log('Сообщение успешно отправлено');
        });
    } else {
      console.log('Не все поля были заполнены');
    }
  }

  useEffect(() => {
    axiosClient
      .get(`${lang === undefined ? '/' : '/' + lang + '/'}user/feedback-category`)
      .then(({ data }) => {
        dispatch(setFeedbackCategory(data.categories));
        setCurrentFeedbackCategory(data.categories[0]);
      });
  }, [lang]);

  return (
    <>
      {feedbackCategories === undefined || feedbackCategories.length === 0 ? (
        <div>Loading..."</div>
      ) : (
        <form className="modal_form">
          <h2 className="modal_form-h2">Форма обратной связи</h2>
          <div className="form_input">
            <div className="form_input-item">
              <input
                placeholder=" "
                type="text"
                name="name"
                id="name"
                required="required"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <span>Имя</span>
            </div>
            <div className="form_input-item">
              <input
                placeholder=" "
                type="email"
                name="email"
                id="email"
                required="required"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span>Почта</span>
            </div>
            <div
              className={`dropdown ${dropdownMenuActive ? 'active' : ''}`}
              onClick={() => dropdownClick()}
            >
              <div className="select big">
                <span className="big clamp">{currentFeedbackCategory.title}</span>
                <svg
                  className="arrow"
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                >
                  <path
                    d="M16.625 7.875L10.5 13.125L4.375 7.875"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <input type="hidden" name="language_code" />
              <ul className={`dropdown-menu  ${dropdownMenuActive ? 'active' : ''}`}>
                {feedbackCategories.map((item) =>
                  item.code === currentFeedbackCategory.code ? (
                    <></>
                  ) : (
                    <li
                      key={item.id}
                      id={item.id}
                      data-id={item.id}
                      onClick={() => setCurrentFeedbackCategory(item)}
                    >
                      {item.title}
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div className="form_input-item">
              <textarea
                className="input textarea scroll"
                placeholder="Сообщение"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>
          <button className="btn big primary" type="button" onClick={() => OnClickFeedback()}>
            Отправить
          </button>
        </form>
      )}
    </>
  );
};

export default Feedback;
