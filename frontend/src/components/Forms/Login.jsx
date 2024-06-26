import axiosClient from '../../axiosClient';
import {useEffect, useRef, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {setNeedReloadPage, setUserAuth} from '../../redux/MainLayout/slice';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {lang} = useParams();

    const userAuth = useSelector((state) => state.mainLayout.userAuth);

    if (userAuth) navigate('/');

    const [viewWords, setViewWords] = useState({});

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [errorText, setErrorText] = useState('');

    useEffect(() => {
        console.log(`${lang === undefined ? '/' : '/' + lang + '/'}user/login`);
        axiosClient.get(`${lang === undefined ? '/' : '/' + lang + '/'}user/login`).then(({data}) => {
            console.log(data);
            setViewWords(data.viewWords);
        });
    }, [lang]);

    const handleOnClickLogin = () => {
        if (email <= 0 || password <= 0) {
            console.log('Введите значение');
            setErrorText(viewWords.tpl_user_login_enterLoginData);
            return;
        }

        setErrorText('');

        axiosClient
            .post(`/user/login`, {email, password, rememberMe})
            .then(({data}) => {
                dispatch(setUserAuth(data.auth));
                dispatch(setNeedReloadPage(true));
                if (data.auth) {
                    navigate(-1);
                }

                data.auth === true ? console.log('Успешный вход!') : console.log('Вход не был произведен');
            })
            .catch(({response}) => {
                console.log(response);
                response.status === 401
                    ? setErrorText(viewWords.tpl_user_login_errorLogin)
                    : console.log(response);
            });
    };

    return (
        <>
            {Object.keys(viewWords).length === 0 ? (
                <div>Loading...</div>
            ) : (
                <div className="modal_form">
                    <h2 className="modal_form-h2">{viewWords.tpl_user_login_title}</h2>
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
                            <span>{viewWords.tpl_user_login_email}</span>
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
                            <span>{viewWords.tpl_user_login_password}</span>
                            <p className="form_input-message">{errorText}</p>
                        </div>
                    </div>
                    {/*<label>*/}
                    {/*    <input className="real_checkbox" type="checkbox"*/}
                    {/*           checked={rememberMe}*/}
                    {/*           onChange={() => setRememberMe(prevState => !prevState)}/>*/}
                    {/*    <span className="custom_checkbox"></span>*/}
                    {/*    <p>{viewWords.tpl_user_login_rememberMe}</p>*/}
                    {/*</label>*/}
                    <div className={'form_second-buttons'}>
                        <Link to="/user/forgot-password" className="modal_form-link">
                            {viewWords.tpl_user_login_forgotPassword}
                        </Link>
                        <p style={{fontSize: '14px'}}>или</p>
                        <Link to="/user/register" className="modal_form-link">
                            Нету аккаунта?
                        </Link>
                    </div>
                    <button onClick={() => handleOnClickLogin()} className="btn big primary" type="submit">
                        {viewWords.tpl_user_login_login}
                    </button>
                </div>
            )}
        </>
    );
};

export default Login;
