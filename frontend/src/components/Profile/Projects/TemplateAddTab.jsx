import CourseCreateBlock from "../../Courses/CourseCreate/CourseCreateBlock";
import {useEffect, useState} from "react";


const TemplateAddTab = ({type, active, currentLang, data, setData}) => {

    const handleOnChange = (key, value) => {
        setData(prevState => ({...prevState, [currentLang]: ({...prevState[currentLang], [key]: value})}));
    }

    return (
        <div className={`course-create-main-info ${active ? 'active' : ''}`}>
            <input className="input width1200" type="text" name="courseName" id="courseName"
                   placeholder="Название курса" value={data[currentLang].name}
                   onChange={(e) => handleOnChange('name', e.target.value)}/>

            <textarea className="input textarea scroll"
                      placeholder="Описание курса" value={data[currentLang].desc}
                      onChange={(e) => handleOnChange('desc', e.target.value)}/>
        </div>
    );
}

export default TemplateAddTab;