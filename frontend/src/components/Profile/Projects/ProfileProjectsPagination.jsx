import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import LoadingElement from '../../LoadingElement';
import ProfileProjectspaginationItems from './ProfileProjectsPaginationItems';

const ProfileProjectsPagination = ({ itemsPerPage, data }) => {
  const [currentItems, setCurrentItems] = useState([]); //работа с пагинацией
  const [pageCount, setPageCount] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);
  // console.log(data);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      {currentItems === null || Object.keys(data).length === 0 ? (
        <LoadingElement />
      ) : (
        <>
          <ProfileProjectspaginationItems currentItems={currentItems} />
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
            renderOnZeroPageCount={'123'}
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
