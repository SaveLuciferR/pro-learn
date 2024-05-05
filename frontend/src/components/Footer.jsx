import { useNavigate } from 'react-router-dom';

/* ICONS */
import { RiArrowUpWideFill } from 'react-icons/ri';
import { SiVk } from 'react-icons/si';
import { SiYoutube } from 'react-icons/si';
import { FaTelegramPlane } from 'react-icons/fa';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="footer-wrapper">
      <footer className="footer">
        <div className="footer-btn">
          <RiArrowUpWideFill color="#ffffff" size={20} />
        </div>
        <div className="footer-content">
          <ul className="footer-icons">
            <li className="footer-icons__item">
              <SiVk color="#515151" size={30} />
            </li>
            <li className="footer-icons__item">
              <SiYoutube color="#515151" size={30} />
            </li>
            <li className="footer-icons__item">
              <FaTelegramPlane color="#515151" size={30} />
            </li>
          </ul>
          <div className="footer-feedback">
            <p>Есть замечания? Сообщите нам!</p>
            <button onClick={() => navigate('/user/feedback')} className="btn big secondary-blue">
              Написать
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
