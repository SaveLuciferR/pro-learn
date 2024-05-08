import CourseCard from './CourseCard';
import SliderMain from "../Slider/SliderMain";

const CompletedCourses = ({courses, viewWords}) => {
    return (
        <div className="courses-started">
            <h1 className="courses-started-title">_{viewWords['tpl_course-page_completed-title']}</h1>
            <div className="courses-started-main">
                {/*  <CourseCard />*/}
                {/*  <CourseCard />*/}
                {/*</div>*/}
                {/*<div className="courses-started-bottom">*/}
                {/*  <div className="courses-slider">(слайдер)</div>*/}
                <SliderMain
                    data={courses}
                    pagesType={'digits'}
                    sliderType={"currentCoursePage"}
                    countSlide={2}
                    viewWords={viewWords}
                />
            </div>
        </div>
    );
};

export default CompletedCourses;
