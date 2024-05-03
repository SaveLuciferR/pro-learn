import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import axiosClient from "../../axiosClient";
import { setNeedActivateAccount } from "../../redux/MainLayout/slice";


const ConfirmAccount = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const needActivateAccount = useSelector(state => state.mainLayout.needActivateAccount);
    const userAuth = useSelector((state) => state.mainLayout.userAuth);

    if (!needActivateAccount || userAuth) {
        navigate('/');
    }

    const [code, setCode] = useState('');
    const [errorText, setErrorText] = useState('');

    const handleOnClickConfirm = () => {
        if (code.length !== 6) {
            setErrorText("Введите корректный код");
        }
        else {
            axiosClient.post('/user/confirm', { code })
                .then((res) => {
                    if (res.data.success) {
                        dispatch(setNeedActivateAccount(false));
                        navigate('/user/login');
                    }
                })
                .catch(({ response }) => {
                    setErrorText(response.data.error);
                });
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
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                    <span>Код</span>
                    <p className="form_input-message">{errorText}</p>
                </div>

                <Link to={'/user/login'} className={"modal_form-link"}>Выслать код повторно</Link>

                <button onClick={() => handleOnClickConfirm()} className="btn big primary" type="submit">
                    Потдверждить
                </button>
            </div>
        </div>
    );
}

export default ConfirmAccount;