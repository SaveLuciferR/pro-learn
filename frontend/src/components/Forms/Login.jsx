import axiosClient from "../../axiosClient";
import {useEffect, useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setUserAuth} from "../../redux/MainLayout/slice";

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleOnClickLogin = () => {

        if (email <= 0 || password <= 0) {
            console.log("Введите значение");
            return;
        }

        console.log(localStorage.getItem('userTokenSession'));
        axiosClient.post(`/user/login`, {email, password, client: localStorage.getItem('userTokenSession')})
            .then(({data}) => {
                localStorage.setItem('client', data.client);
                localStorage.getItem('client')
                dispatch(setUserAuth(data.auth));
                console.log(data);
                // navigate();
            })
            .catch((res) => {
                console.log(res);
            });
    }

    return (
        <div className="modal_form">
            <h2 className="modal_form-h2">Вход</h2>
            <div className="form_input">
                <div className="form_input-item">
                    <input placeholder=" " type="email" name="email" id="email" value={email}
                           onChange={(e) => setEmail(e.target.value)}/>
                    <span>Почта</span>
                </div>
                <div className="form_input-item">
                    <input placeholder=" " type="password" name="password" id="password" value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                    <span>Пароль</span>
                </div>
            </div>
            <Link to="" className="modal_form-link">Забыл пароль</Link>
            <label>
                <input className="real_checkbox" type="checkbox"/>
                <span className="custom_checkbox"></span>
                <p>Запомнить меня</p>
            </label>
            <button onClick={() => handleOnClickLogin()} className="btn big primary" type="submit">Войти</button>
        </div>
    );
}

export default Login;