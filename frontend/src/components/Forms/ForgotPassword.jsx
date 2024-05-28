import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import ConfirmAccount from "./ConfirmAccount";
import axiosClient from "../../axiosClient";
import {useDispatch, useSelector} from "react-redux";
import {setNeedActivateAccount} from "../../redux/MainLayout/slice";

const ForgotPassword = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userAuth = useSelector(state => state.mainLayout.userAuth)

    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');
    const [code, setCode] = useState('');
    const [errorText, setErrorText] = useState('');

    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isSendCode, setIsSendCode] = useState(false);

    useEffect(() => {
        if (userAuth) {
            navigate('../')
        }
    }, [userAuth])

    const handleOnClickSendCode = () => {
        if (mail.length === 0) {
            return;
        }

        axiosClient.post(`/user/send-code-restore`, {mail})
            .then((res) => {
                console.log(res);
                if (res.data.result) {
                    setIsSendCode(true);
                    setIsConfirmed(false);
                    setErrorText('');
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleOnClickVerifyCode = () => {
        axiosClient.post('/user/restore-verify-code', {code})
            .then((res) => {
                console.log(res);
                setIsSendCode(false);
                setIsConfirmed(true);
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    setErrorText(err.response.data.error);
                }
                console.log(err);
            })
    }

    const handleOnClickNewPassword = () => {
        if (password !== passwordAgain) {
            setErrorText("Пароли не совпадают")
            return;
        }

        axiosClient.post('/user/restore-password', {password})
            .then((res) => {
                if (res.status === 200) {
                    navigate('../user/login');
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        if (isSendCode) {
            dispatch(setNeedActivateAccount(true));
        }
        if (isConfirmed) {
            dispatch(setNeedActivateAccount(false));
        }
    }, [isSendCode, isConfirmed])

    if (isSendCode) {
        return (
            <ConfirmAccount
                codeRestore={code}
                setCodeRestore={setCode}
                handleOnClickRestore={handleOnClickVerifyCode}
                type={'restore'}
                errorTextRestore={errorText}
                setErrorTextRestore={setErrorText}
            />
        );
    }

    if (isConfirmed) {
        return (
            <>
                {/*{Object.keys(viewWords).length === 0 ? (*/}
                {/*    <div>Loading...</div>*/}
                {/*) : (*/}
                <div className="modal_form">
                    <h2 className="modal_form-h2">Восстановление пароля</h2>
                    <div className="form_input">
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
                            <span>Новый пароль</span>
                        </div>
                        <div className="form_input-item">
                            <input
                                placeholder=" "
                                type="password"
                                name="passwordAgain"
                                id="passwordAgait"
                                required="required"
                                value={passwordAgain}
                                onChange={(e) => setPasswordAgain(e.target.value)}
                            />
                            <span>Повторите пароль</span>
                            {/*<p className="form_input-message">{errorText}</p>*/}
                        </div>
                    </div>
                    <button onClick={() => handleOnClickNewPassword()} className="btn big primary" type="submit">
                        {/*{viewWords.tpl_user_login_login}*/}
                        Изменить пароль
                    </button>
                </div>
                {/*)}*/}
            </>
        );
    }

    return (
        <>
            {/*{Object.keys(viewWords).length === 0 ? (*/}
            {/*    <div>Loading...</div>*/}
            {/*) : (*/}
            <div className="modal_form">
                <h2 className="modal_form-h2">Восстановление аккаунта</h2>
                <div className="form_input">
                    <div className="form_input-item">
                        <input
                            placeholder=" "
                            type="text"
                            name="mail"
                            id="mail"
                            required="required"
                            value={mail}
                            onChange={(e) => setMail(e.target.value)}
                        />
                        <span>Почта</span>
                    </div>
                </div>
                <button onClick={() => handleOnClickSendCode()} className="btn big primary" type="submit">
                    {/*{viewWords.tpl_user_login_login}*/}
                    Отправить код
                </button>
            </div>
            {/*)}*/}
        </>
    );
}

export default ForgotPassword;