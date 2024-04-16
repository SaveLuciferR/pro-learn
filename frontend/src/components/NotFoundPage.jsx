import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="not-found">
      <h2>error</h2>
      <h1>404</h1>
      <p>&gt; Страница не найдена</p>
      <button onClick={() => navigate('/')} className="btn big secondary-blue">
        На главную
      </button>
    </div>
  );
};

export default NotFoundPage;
