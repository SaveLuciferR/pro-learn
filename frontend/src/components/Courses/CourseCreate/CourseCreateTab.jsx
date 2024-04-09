import {useState} from "react";
import CourseCreateBlock from "./CourseCreateBlock";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    addCurrentCourseMainBlock, deleteCurrentCourseMainBlock,
    setCurrentCourseMainLang
} from "../../../redux/Course/slice";

const CourseCreateTab = ({type, active, currentLang}) => {

    const dispatch = useDispatch();
    const languages = useSelector(state => state.mainLayout.languages);
    const currentCourse = useSelector(state => state.course.currentCourseEdit);

    const [titleCourse, setTitleCourse] = useState('');
    const [excerptCourse, setExcerptCourse] = useState('');
    const [descriptionCourse, setDescriptionCourse] = useState('');
    const [keywordsCourse, setKeywordsCourse] = useState('');
    const [currentNumStage, setCurrentNumStage] = useState(0);

    const [canBeRenderBlock, setCanBeRenderBlock] = useState(false);

    useEffect(() => {
        if (type === 'edit' && currentCourse.main[currentLang] !== undefined) {
            setTitleCourse(currentCourse.main[currentLang].title);
            setDescriptionCourse(currentCourse.main[currentLang].description);
            setExcerptCourse(currentCourse.main[currentLang].excerpt);
            setKeywordsCourse(currentCourse.main[currentLang].keywords);
            setCurrentNumStage(Object.keys(currentCourse.main[currentLang].block).length);
        }
    }, [])

    useEffect(() => {
        dispatch(setCurrentCourseMainLang({
            lang: currentLang,
            title: titleCourse,
            description: descriptionCourse,
            excerpt: excerptCourse,
            keywords: keywordsCourse
        }));
    }, [titleCourse, descriptionCourse, excerptCourse, keywordsCourse]);

    useEffect(() => {
        if (currentCourse.main[currentLang] !== undefined && currentCourse.main[currentLang].block !== undefined) {
            setCanBeRenderBlock(true)
            setCurrentNumStage(Object.keys(currentCourse.main[currentLang].block).length);
        } else {
            setCanBeRenderBlock(false);
        }

        // console.log(currentCourse)
    }, [currentCourse])

    const onCreateNewBlock = () => {
        dispatch(addCurrentCourseMainBlock({
            languages: languages,
            num_stage: currentNumStage + 1,
            title: "",
            open: true
        }))
        setCurrentNumStage(prevState => prevState + 1);
    }

    const onClickDeleteBlock = (index) => {
        dispatch(deleteCurrentCourseMainBlock({
            lang: currentLang,
            languages: languages,
            num_stage: index,
        }));
    }

    return (

        <div className={`course-create-main-info ${active ? 'active' : ''}`}>
            <input className="input width1200" type="text" name="courseName" id="courseName"
                   placeholder="Название курса" value={titleCourse}
                   onChange={(e) => setTitleCourse(e.target.value)}/>

            <textarea className="input textarea scroll"
                      placeholder="Описание курса" value={excerptCourse}
                      onChange={(e) => setExcerptCourse(e.target.value)}/>

            <input className="input width1200" type="text" name="courseName" id="courseName"
                   placeholder="Мета-описание курса" value={descriptionCourse}
                   onChange={(e) => setDescriptionCourse(e.target.value)}/>

            <input className="input width1200" type="text" name="courseName" id="courseName"
                   placeholder="Ключевые слова курса" value={keywordsCourse}
                   onChange={(e) => setKeywordsCourse(e.target.value)}/>

            <div>
                {!canBeRenderBlock ?
                    <></> :
                    <>
                        {Object.keys(currentCourse.main[currentLang].block).map((item) =>
                            <CourseCreateBlock type={type}
                                               deleteBlock={() => onClickDeleteBlock(item)}
                                currentLang={currentLang} key={item}
                                obj={currentCourse.main[currentLang].block[item]} index={item}
                            />
                        )}
                    </>
                }
                <div className="course-create-hr">
                    <hr className="course-create-hr"/>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="white"/>
                        <path d="M15 13.5L12 10.5L9 13.5" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <div className="sidebar_profile-create_item create-block"
                     onClick={() => onCreateNewBlock()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37"
                         viewBox="0 0 37 37"
                         fill="none">
                        <path
                            d="M21.4979 0V15.7724H37V21.3462H21.4979V37H15.3049V21.3462H0V15.7724H15.3049V0H21.4979Z"/>
                    </svg>
                    <span>Создать блок</span>
                </div>
            </div>
        </div>
    );
}

export default CourseCreateTab;