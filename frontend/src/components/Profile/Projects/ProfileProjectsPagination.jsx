import {useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import LoadingElement from '../../LoadingElement';
import ProfileProjectspaginationItems from './ProfileProjectsPaginationItems';
import ProfileProjectsButton from './ProfileProjectsButton';

const ProfileProjectsPagination = ({itemsPerPage, data, viewWords}) => {
    const [currentItems, setCurrentItems] = useState([]); //работа с пагинацией
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    
    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        console.log(viewWords);
        setCurrentItems(prevState => [<ProfileProjectsButton viewWords={viewWords}/>])
        setCurrentItems(prevState => [...prevState, data.slice(itemOffset, endOffset)]);
        setPageCount(Math.ceil(currentItems.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, data]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
        console.log(currentItems);
    };

    return (
        <>
            {/* {currentItems === null || Object.keys(data).length === 0 ? (
                <LoadingElement/>
            ) : ( */}
                <>
                    {pageCount === 0 ? <div>loading...</div> :
                        <>
                            <ProfileProjectspaginationItems currentItems={currentItems} viewWords={viewWords}/>
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
                                renderOnZeroPageCount={'...'}
                                className="slider-under-element pagination"
                                pageLinkClassName="slider-digit"
                                activeLinkClassName=" active"
                            />
                        </>
                    }
                </>
            {/* )} */}
        </>
    );
};

export default ProfileProjectsPagination;
