import {number} from "react-table/src/sortTypes";
import {useSelector} from "react-redux";


const BlogSliderUnder = ({goToSlide, changeSlide}) => {

    const bestBlogItems = useSelector(state => state.blog.bestBlogItems);
    const slideIndex = useSelector(state => state.blog.slideIndex);

    const renderDots = () => {
        const dots = [];

        console.log(slideIndex);

        for (let i = 0; i < bestBlogItems.length / 2; i++) {
            dots.push(
                <div
                    key={`dot-${i}`}
                    className={`dot ${slideIndex === i ? "active" : ""}`}
                    onClick={() => goToSlide(i)}
                >
                </div>)
        }
        return dots;
    }

    return (
        <div className={"under_element_slider"}>
            <div className={"arrow"} onClick={() => changeSlide(-1)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none">
                    <circle cx="10" cy="10" r="10" transform="matrix(-1 0 0 1 22 2)" stroke="white" strokeWidth="1.5"/>
                    <path d="M13.5 9L10.5 12L13.5 15" stroke="white" strokeWidth="1.5" strokeLinecap="round"
                          strokeLinejoin="round"/>
                </svg>
            </div>
            <div className={"dots"}>
                {renderDots()}
            </div>
            <div className={"arrow"} onClick={() => changeSlide(1)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.5"/>
                    <path d="M10.5 9L13.5 12L10.5 15" stroke="white" strokeWidth="1.5" strokeLinecap="round"
                          strokeLinejoin="round"/>
                </svg>
            </div>
        </div>
    );
}

export default BlogSliderUnder;