import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, Link} from 'react-router-dom';
import axiosClient from '../../axiosClient';
import {setNeedActivateAccount} from '../../redux/MainLayout/slice';

const ConfirmAccount = ({
                            codeRestore,
                            errorTextRestore,
                            setErrorTextRestore,
                            handleOnClickRestore,
                            setCodeRestore,
                            type = 'create'
                        }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const needActivateAccount = useSelector((state) => state.mainLayout.needActivateAccount);
    const userAuth = useSelector((state) => state.mainLayout.userAuth);

    if (!needActivateAccount || userAuth) {
        navigate('/');
    }

    const [code, setCode] = useState('');
    const [errorText, setErrorText] = useState('');

    const handleOnClickConfirm = () => {
        if (type === 'restore') {
            if (codeRestore.length !== 6) {
                console.log(errorTextRestore)
                setErrorTextRestore('Введите корректный код');
                return;
            }

            handleOnClickRestore();

            return;
        }

        if (code.length !== 6) {
            setErrorText('Введите корректный код');
        } else {
            axiosClient
                .post('/user/confirm', {code})
                .then((res) => {
                    if (res.data.success) {
                        dispatch(setNeedActivateAccount(false));
                        navigate('/user/login');
                    }
                })
                .catch(({response}) => {
                    setErrorText(response.data.error);
                });
        }
    };

    const handleOnClickNewCode = () => {
        axiosClient.post('user/resend-code', {type})
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleSetCode = (v) => {
        if (type === 'restore') {
            setCodeRestore(v);
        } else {
            setCode(v);
        }
    }

    return (
        <div className="modal_form">
            <h2 className="modal_form-h2">Потдверждение почты</h2>
            <div className="form_input">
                <div className="form_input-item">
                    <input
                        placeholder=" "
                        type="email"
                        name="email"
                        id="email"
                        required="required"
                        value={type === 'restore' ? codeRestore : code}
                        onChange={(e) => handleSetCode(e.target.value)}
                    />
                    <span>Код</span>
                    <p className="form_input-message">{type === 'restore' ? errorTextRestore : errorText}</p>
                </div>

                <button className={'modal_form-link'} onClick={() => handleOnClickNewCode()}>
                    Выслать код повторно
                </button>

                <button onClick={() => handleOnClickConfirm()} className="btn big primary" type="submit">
                    Потдвердить
                </button>
            </div>
        </div>
    );
};

export default ConfirmAccount;
