import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../axiosClient';

const Table = () => {
  const { lang, username } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosClient
      .get(`${lang === undefined ? '/' : '/' + lang + '/'}@${username}/settings/session?`)
      .then(({ data }) => {
        setData(data);
      });
  }, [lang]);

  console.log(data);

  return (
    <div>
      <div></div>
    </div>
  );
};
export default Table;
