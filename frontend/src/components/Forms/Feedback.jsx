import { useState } from "react";
import axiosClient from "../../axiosClient";

const Feedback = () => {
  const [dropdownMenuActive, setDropdownMenuActive] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const setNewPrivate = (e) => {
    e.persist();
  };
  const dropdownClick = () =>
    dropdownMenuActive
      ? setDropdownMenuActive(false)
      : setDropdownMenuActive(true);

  async function OnClickFeedback(){
    
    if(name.length !== 0 && email.length !== 0 && message.length !== 0){
      await axiosClient.post("/user/feedback", {name, email, message})
      .then(({data}) => {
        console.log(data);
      })
    }
    else{
      console.log("Не все поля были заполнены");
    }
  }

  return (
    <form className="modal_form">
      <h2 className="modal_form-h2">Форма обратной связи</h2>
      <div className="form_input">
        <div className="form_input-item">
          <input type="text" name="name" id="name" required="required" value={name}
            onChange={(e) => setName(e.target.value)}/>
          <span>Имя</span>
        </div>
        <div className="form_input-item">
          <input type="email" name="email" id="email" required="required" value={email}
            onChange={(e) => setEmail(e.target.value)}/>
          <span>Почта</span>
        </div>
        <div
          className={`dropdown ${dropdownMenuActive ? "active" : ""}`}
          onClick={() => dropdownClick()}
        >
          <div className="select big">
            <span className="big">Публичный</span>
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
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <input type="hidden" name="language_code" />
          <ul
            className={`dropdown-menu  ${dropdownMenuActive ? "active" : ""}`}
          >
            <li
              className="private"
              onClick={(e) => setNewPrivate(e)}
              id={0}
              data-id={0}
            >
              <span>Приватный</span>
            </li>
          </ul>
        </div>
        <div className="form_input-item">
          <textarea className="input textarea scroll" placeholder="Сообщение" value={message}
            onChange={(e) => setMessage(e.target.value)}/>
        </div>
      </div>
      <button className="btn big primary" type="button" onClick={() => OnClickFeedback()}>Отправить</button>
    </form>
  );
};

export default Feedback;
