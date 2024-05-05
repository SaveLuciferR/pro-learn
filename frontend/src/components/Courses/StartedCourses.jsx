import CourseCard from './CourseCard';
import SliderMain from "../Slider/SliderMain";

const StartedCourses = ({courses}) => {
    return (
        <div className="courses-started">
            <h1 className="courses-started-title">_Начатые курсы</h1>
            <div className="courses-started-main">
                {/*  <CourseCard />*/}
                {/*  <CourseCard />*/}
                {/*</div>*/}
                {/*<div className="courses-started-bottom">*/}
                {/*  <div className="courses-slider">(слайдер)</div>*/}
                <SliderMain
                    data={courses}
                    sliderType={"currentCoursePage"}
                    countSlide={2}
                />
            </div>
        </div>
    );
};
export default StartedCourses;
