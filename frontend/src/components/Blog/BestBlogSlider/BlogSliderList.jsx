import BestBlogCard from "./BestBlogCard";
import {useSelector} from "react-redux";

const BlogSliderList = () => {

    const slideIndex = useSelector(state => state.blog.slideIndex);
    const bestBlogItems = useSelector(state => state.blog.bestBlogItems);

    const cards = bestBlogItems.map((slide, index) => <BestBlogCard key={index} data={slide}/>);

    return (
        <div className={"blog_slider_list"} style={{transform: `translateX(-${slideIndex * 100}%)`}}>
            {cards}
        </div>
    );
}

export default BlogSliderList;