import SliderMain from '../../Slider/SliderMain';

const CurrentCourseMain = ({ data }) => {
  return (
    <div className="currentcourse">
      <p className="currentcourse-title">Текущие курсы</p>
      <SliderMain data={data} sliderType="profileCurrentCourse" countSlide={1} />
    </div>
  );
};

export default CurrentCourseMain;
