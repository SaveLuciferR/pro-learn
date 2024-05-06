import { useOutletContext, Link } from 'react-router-dom';

const MainMenu = ({ isActiveSidebar }) => {
  const { activeSidebar } = useOutletContext();

  activeSidebar[0](isActiveSidebar);

  return (
    <div className="main-page">
      <h3 className="main-page-slogan">{'>'} стань программистом</h3>
      <h1 className="main-page-title">pro-learn</h1>
      <div className="main-page-buttons">
        <div className="main-page-buttons-row">
          <div className="main-page-buttons__item">
            <Link className="green">Курсы</Link>
            <p>// если вы хотите учиться</p>
          </div>
          <div className="main-page-buttons__item">
            <Link className="purple">Блог</Link>
            <p>// если вы хотите почитать статьи о программировании</p>
          </div>
        </div>
        <div className="main-page-buttons__item">
          <Link className="red">Практика</Link>
          <p>// если вы хотите практиковаться</p>
        </div>
      </div>
    </div>
  );
};
export default MainMenu;
