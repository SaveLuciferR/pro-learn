import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../../axiosClient";
import { useDispatch, useSelector } from "react-redux";
import { setNeedActivateAccount } from "../../redux/MainLayout/slice";

const Register = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userAuth = useSelector((state) => state.mainLayout.userAuth);

    if (userAuth) {
        navigate('/');
    }

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');
    const [errorText, setErrorText] = useState('');

    const [viewWords, setViewWords] = useState([]);

    const handleOnClickRegister = () => {
        if (username.length <= 0 || email.length <= 0 || password.length <= 0 || passwordAgain.length <= 0) {
            setErrorText('Заполните все поля!');
        }
        else if (password.length < 8) {
            setErrorText("Пароль должен быть хотя бы из 8 символов");
        }
        else if (password !== passwordAgain) {
            setErrorText("Пароли не совпадают!");
        }
        else {
            axiosClient.post('/user/register', {
                username, mail: email, password
            })
                .then((res) => {
                    dispatch(setNeedActivateAccount(true));
                    navigate('/user/confirm-account');
                })
                .catch(({ response }) => {
                    setErrorText(response.data.error);
                });
        }
    }

    return (
        <div className="modal_form">
            <h2 className="modal_form-h2">Регистрация</h2>
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
                    <p className={"form-hint"}>На данную почту придет потдверждение</p>
                </div>
                <div className="form_input-item">
                    <input
                        placeholder=" "
                        type="text"
                        name="username"
                        id="username"
                        required="required"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <span>Никнейм</span>
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
                </div>
                <div className="form_input-item">
                    <input
                        placeholder=" "
                        type="password"
                        name="password"
                        id="passwordAgain"
                        required="required"
                        value={passwordAgain}
                        onChange={(e) => setPasswordAgain(e.target.value)}
                    />
                    <span>Повторите пароль</span>
                </div>
                <p className="form_input-message">{errorText}</p>

                <Link to={'/user/login'} className={"modal_form-link"}>Уже есть аккаунт?</Link>

                <button onClick={() => handleOnClickRegister()} className="btn big primary" type="submit">
                    Зарегистрация
                </button>
            </div>
        </div>
    );
}

export default Register;