import {useEffect, useState} from "react";
import LoadingElement from "../../LoadingElement";

const CourseLessonInputData = ({lesson, setLesson}) => {

    // const [needBeReload, setNeedBeReload] = useState(true);
    //
    // useEffect(() => {
    //     if (lesson.description !== null && needBeReload) {
    //
    //
    //         setNeedBeReload(false);
    //     }
    // }, [lesson])

    return (
        <div className="lessons-fill">
            <p className="lessons-fill-title">&gt; Заполни пропуски</p>
            {/*<div className="lessons-fill-main" dangerouslySetInnerHTML={{__html: lesson.description}}/>*/}
            <div className="lessons-fill-main">
                {/*{Object.prototype.toString.call(lesson.description) !== '[object Array]' ? <LoadingElement/> :*/}
                {/*    // lesson.description*/}
                {/*    <>*/}
                        {lesson.description}
                        {/*{lesson.description.map((item) => {*/}
                        {/*    // console.log(item)*/}
                        {/*    return item;*/}
                        {/*})}*/}
                    {/*</>*/}
                {/*}*/}
            </div>
        </div>
    );
};

export default CourseLessonInputData;
