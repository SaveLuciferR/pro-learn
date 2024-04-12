import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import ProfileProjectItem from './ProfileProjectItem';
import ProfileProjectsButton from './ProfileProjectsButton';
import LoadingElement from '../../LoadingElement';

const ProfileProjectsPagination = ({ itemsPerPage, data }) => {
  const [currentItems, setCurrentItems] = useState(null); //работа с пагинацией
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const Items = ({ currentItems }) => {
    let projects = [];

    // useEffect(() => {
    projects.push(<ProfileProjectsButton />);
    console.log(projects);
    currentItems.map((slide, i) => {
      return projects.push(<ProfileProjectItem key={i} data={slide} />);
    });
    // }, [currentItems]);

    return (
      <div className="profile-projects-page-main-content">
        {Object.keys(projects).map((i) => {
          return projects[i];
        })}
      </div>
    );
  };
  // console.log(data);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil((data.length + 1) / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      {Object.keys(data).length === 0 ? (
        <LoadingElement />
      ) : (
        <>
          <Items currentItems={currentItems} />
          <ReactPaginate
            nextLabel=">"
            previousLabel="<"
            nextLinkClassName="slider-arrow-text"
            nextClassName="slider-arrow"
            previousLinkClassName="slider-arrow-text"
            previousClassName="slider-arrow"
            onPageChange={handlePageClick}
            pageCount={pageCount}
            breakLabel="..."
            renderOnZeroPageCount={null}
            className="slider-under-element pagination"
            pageLinkClassName="slider-digit"
            activeLinkClassName=" active"
          />
        </>
      )}
    </>
  );
};

export default ProfileProjectsPagination;
