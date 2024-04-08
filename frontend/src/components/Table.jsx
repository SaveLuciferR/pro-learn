import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../axiosClient';
// import { useReactTable } from '@tanstack/react-table';

const Table = () => {
  const { lang, username } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosClient
      .get(`${lang === undefined ? '/' : '/' + lang + '/'}@${username}/settings/session?`)
      .then(({ data }) => {
        setData(data.profile_sessions);
      });
  }, [lang]);

  console.log(data);

  // const table = useReactTable({
  //   data,
  //   columns,

  // });

  const settings = {
    dots: true,
    // dotsClass: 'best_blog_slider under_element_slider dots dot',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true, //Пауза прокручивания при наведении на карточку
  };

  return <p>Table</p>;
};
export default Table;
