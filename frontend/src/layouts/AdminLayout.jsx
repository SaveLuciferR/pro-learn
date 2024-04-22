import { Outlet, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  setUserAuth,
  setUser,
  setNeedReloadPage,
  setActiveSidebar,
  setLanguages,
  setCurrentLanguage,
} from '../redux/MainLayout/slice';
import axiosClient from '../axiosClient';
import LoadingElement from '../components/LoadingElement';
import Header from '../components/Header';

const AdminLayout = () => {
  const dispatch = useDispatch();
  const { lang } = useParams();

  const languages = useSelector((state) => state.mainLayout.languages);

  const [layoutWords, setLayoutWords] = useState({});
  const [language, setLanguage] = useState({});

  useEffect(() => {
    axiosClient.post(`${lang === undefined ? '/' : '/' + lang + '/'}language`).then(({ data }) => {
      setLanguage(data.language);
      dispatch(setLanguages(data.languages));
      setLayoutWords(data.layoutWords);
      dispatch(setCurrentLanguage(lang));
    });
  }, [lang]);

  return (
    <>
      {Object.keys(languages).length === 0 ? (
        <LoadingElement />
      ) : (
        <>
          <Header language={language} languages={languages} layoutWords={layoutWords} />
          <div className={'main'}>
            <div className="container">
              <Outlet />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AdminLayout;
