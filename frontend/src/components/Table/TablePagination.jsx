import {IoChevronBackCircleOutline, IoChevronForwardCircleOutline} from "react-icons/io5";
import {useEffect, useState} from "react";


const TablePagination = ({currentPage, setCurrentPage, amountNote, amountNoteOnPage}) => {

    const [amountPage, setAmountPage] = useState(1);

    useEffect(() => {
        setAmountPage(Math.ceil(amountNote / amountNoteOnPage));
    }, [amountNote, amountNoteOnPage])

    useEffect(() => {
        if (amountPage < currentPage) {
            setCurrentPage(1);
        }
    }, [currentPage])

    const handleSlidePage = (to, max) => {
        if (currentPage + to < 1) {
            setCurrentPage(max);
        }
        else if (currentPage + to > max) {
            setCurrentPage(1);
        }
        else {
            setCurrentPage(prevState => prevState + to);
        }
    }

    return (
        <div className={`table-pagination`}>
            <IoChevronBackCircleOutline size={32} onClick={() => handleSlidePage(-1, amountPage)}/>
            {Array(amountPage).fill('').map((item, i) =>
                <button key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`btn slider-digit ${currentPage === i + 1 ? 'active' : ''}`}
                        style={{fontSize: 18, margin: 0}}>{i + 1}</button>
            )}
            <IoChevronForwardCircleOutline size={32} onClick={() => handleSlidePage(1, amountPage)}/>
        </div>
    );
}

export default TablePagination;