import axiosClient from '../../axiosClient';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setNeedReloadPage, setUserAuth } from '../../redux/MainLayout/slice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userAuth = useSelector((state) => state.mainLayout.userAuth);

  if (userAuth) navigate('/');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuth, setIsAuth] = useState('0');

  const handleOnClickLogin = () => {
    if (email <= 0 || password <= 0) {
      console.log('Введите значение');
      setIsAuth('1');
      return;
    }

    setIsAuth('0');

    axiosClient
      .post(`/user/login`, { email, password })
      .then(({ data }) => {
        dispatch(setUserAuth(data.auth));
        dispatch(setNeedReloadPage(true));
        if (data.auth) {
          navigate(-1);
        }

        data.auth === true ? console.log('Успешный вход!') : console.log('Вход не был произведен');
      })
      .catch(({ response }) => {
        console.log(response);
        response.status === 401 ? setIsAuth('2') : console.log(response);
      });
  };

  return (
    <div className="modal_form">
      <h2 className="modal_form-h2">Вход</h2>
      <div className="form_input">
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
        <div className="form_input-item">
          <input
            placeholder=" "
            type="password"
            name="password"
            id="password"
            required="required"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span>Пароль</span>
          {isAuth === '1' ? (
            <p className="form_input-message">Заполните поля</p>
          ) : isAuth === '2' ? (
            <p className="form_input-message">Неправильно введен логин и/или пароль</p>
          ) : (
            <p className="form_input-message"></p>
          )}
        </div>
      </div>
      <Link to="" className="modal_form-link">
        Забыл пароль
      </Link>
      <label>
        <input className="real_checkbox" type="checkbox" />
        <span className="custom_checkbox"></span>
        <p>Запомнить меня</p>
      </label>
      <button onClick={() => handleOnClickLogin()} className="btn big primary" type="submit">
        Войти
      </button>
    </div>
  );
};

export default Login;
