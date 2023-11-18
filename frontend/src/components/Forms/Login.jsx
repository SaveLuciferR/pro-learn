import axiosClient from "../../axiosClient";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    const handleOnClickLogin = () => {
        axiosClient.post(`/project/add`, { mail, password },)
            .then(({ data }) => {
                console.log(data);
            });
    }

    return (
        <form className="modal_form" onSubmit={handleOnClickLogin}>
            <h2 className="modal_form-h2">Вход</h2>
            <div className="form_input">
                <div className="form_input-item">
                    <input type="email" name="email" id="email" required="required" value={mail} onChange={(e) => setMail(e.target.value)} />
                    <span>Почта</span>
                </div>
                <div className="form_input-item">
                    <input type="password" name="password" id="password" required="required" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <span>Пароль</span>
                </div>
            </div>
            <Link to="" className="modal_form-link">Забыл пароль</Link>
            <label>
                <input className="real_checkbox" type="checkbox" />
                <span className="custom_checkbox"></span>
                <p>Запомнить меня</p>
            </label>
            <button onClick={() => handleOnClickLogin()} className="btn big primary" type="submit">Войти</button>
        </form>
    );
}

export default Login;