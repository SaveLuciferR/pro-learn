import SliderMain from "../../Slider/SliderMain";

const ProfileUserTaskSlider = ({viewWords, data}) => {
    return (
        <div className="created-course">
            <div className={"profile-completed-page-main"}>
                {data === undefined || data.length === 0 ? (
                    <div className="profile-none">Нет созданных курсов :(</div>
                ) : (
                    <SliderMain data={data} sliderType="createdTasks" countSlide={1} viewWords={viewWords}/>
                )}
            </div>
        </div>
    );
}

export default ProfileUserTaskSlider;