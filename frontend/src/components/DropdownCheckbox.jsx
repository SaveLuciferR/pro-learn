import {useState} from "react";


const DropdownCheckbox = ({title, content, checkContent, setCheckContent}) => {

    const [dropdownActive, setDropdownActive] = useState(false);

    const onClickCheckbox = (id) => {
        if (checkContent.includes(id)) {
            setCheckContent(prevState => prevState.filter((item) => item !== id));
        } else {
            setCheckContent(prevState => [...prevState, id]);
        }
    }

    return (
        <div className={`dropdown ${dropdownActive ? 'active' : ""}`}
             style={{maxWidth: "300px", width: "100%"}}
             onClick={() => setDropdownActive(!dropdownActive)}>
            <div className="select  small">
                <span className="small unselectable">{title}</span>
                <svg className="arrow" width="9" height="5" viewBox="0 0 9 5" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.5 5L8.39711 0.5H0.602886L4.5 5Z" fill="white"/>
                </svg>
            </div>
            <input type="hidden" name="language_code"/>
            <ul className={`dropdown-menu  ${dropdownActive ? 'active' : ''}`}>

                {content.map((item, i) =>
                    <li>
                        <div className="filter_checkbox">
                            <div className="filter_checkbox__item">
                                <label>
                                    <input className="real_checkbox" type="checkbox"
                                           onChange={() => onClickCheckbox(item.id)}
                                           value={checkContent.includes(item.id)}/>
                                    <span className="custom_checkbox"></span>
                                    <p>{item.title}</p>
                                </label>
                            </div>
                        </div>
                    </li>
                )}

            </ul>
        </div>
    );
}

export default DropdownCheckbox;