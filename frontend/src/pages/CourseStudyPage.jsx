import { Link, Outlet, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import LoadingElement from "../components/LoadingElement";
import CourseLessonFewOption from "../components/Courses/CourseLessons/CourseLessonFewOption";
import CourseLessonOneAnswer from "../components/Courses/CourseLessons/CourseLessonOneAnswer";
import CourseLessonInputData from "../components/Courses/CourseLessons/CourseLessonInputData";
import CourseLessonTheory from "../components/Courses/CourseLessons/CourseLessonTheory";
import CourseLessonTask from "../components/Courses/CourseLessons/CourseLessonTask";
import Input from "../components/Component/Input";
import React from 'react';
import ReactHtmlParser from 'html-react-parser'

const CourseStudyPage = () => {

    const { lang, slug } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    const navigate = useNavigate();

    const [lesson, setLessons] = useState({});
    const [canBeNextSlide, setCanBeNextSlide] = useState(false);
    const [canBePrevSlide, setCanBePrevSlide] = useState(false);
    const [blockParam, setBlockParam] = useState(searchParams.get('block'));
    const [lessonParam, setLessonParam] = useState(searchParams.get('lesson'));
    const [answer, setAnswer] = useState(null);

    const [successLesson, setSuccessLesson] = useState(null);
    const [successBlock, setSuccessBlock] = useState(false);
    const [successCourse, setSuccessCourse] = useState(false);
    const [nextLesson, setNextLesson] = useState(0);
    const [nextBlock, setNextBlock] = useState(0);

    const [needReload, setNeedReload] = useState(false);
    const [contentInputData, setContentInputData] = useState({});

    useEffect(() => {
        let url = '';
        if (searchParams.get('block') !== null && searchParams.get('lesson') !== null) {
            url = `${lang === undefined ? '/' : '/' + lang + '/'}course/${slug}/lessons?block=${searchParams.get('block')}&lesson=${searchParams.get('lesson')}`;
            // setBlockParam(searchParams.get('block'));
            // setLessonParam(searchParams.get('lesson'));
        } else {
            url = `${lang === undefined ? '/' : '/' + lang + '/'}course/${slug}/lessons`;
        }

        getLesson(url);
    }, []);

    useEffect(() => {
        let temp = '';
        Object.keys(contentInputData).map((item) => {
            temp += contentInputData[item] + '```prolearnreplace```';
        })
        temp = temp.replace(/```prolearnreplace```$/, '');
        setAnswer(temp);
    }, [contentInputData])

    useEffect(() => {
        if (needReload) {
            const replace = (node, index) => {
                if (node.type === 'tag' && node.name === 'code' && node.attribs.class === 'markdown-inline-block-code') {
                    return (
                        <Input
                            key={index}
                            rightValue={node.children[0].data}
                            value={contentInputData[index]}
                            setValue={(e) => setContentInputData(prevState => ({ ...prevState, [index]: e }))}
                            classes={'input input-data'}
                        />
                    );
                }
            }

            setLessons(prevState => {
                return {
                    ...prevState,
                    description: ReactHtmlParser(lesson.description, { replace })
                };
            })

            setNeedReload(false);
        }
    }, [lesson, needReload]);

    useEffect(() => {
        const url = `${lang === undefined ? '/' : '/' + lang + '/'}course/${slug}/lessons?block=${searchParams.get('block')}&lesson=${searchParams.get('lesson')}`;
        getLesson(url);
    }, [searchParams])

    const getLesson = (url) => {
        axiosClient
            .get(url)
            .then(({ data }) => {
                console.log(data);
                setLessons(data.lesson);
                setCanBePrevSlide(data.can_be_prev_lesson);
                setCanBeNextSlide(data.can_be_next_lesson);
                console.log(data.lesson)

                setSuccessLesson(null);
                setNextBlock(0);
                setNextLesson(0);
                if (data.lesson.code === 'input-data') {
                    setNeedReload(true);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const slideLesson = (e, to) => {
        e.preventDefault();
        if (to === 1 && canBeNextSlide || to === -1 && canBePrevSlide) {
            // console.log(Number(lessonParam) + to, to);
            // navigate(`?block=${blockParam}&lesson=${Number(lessonParam) + to}`);
        }
    }

    const handleCheckStudy = () => {
        axiosClient.get(`course/${slug}/lessons/study-check?block=${lesson.block}&lesson=${lesson.current_step}&answer=${answer}`)
            .then(({ data }) => {
                setSuccessCourse(data.course_success);
                setSuccessLesson(data.success);
                setSuccessBlock(data.block_success);
                setNextBlock(data.next_block);
                setNextLesson(data.next_lesson);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const goToNextLesson = () => {
        navigate(`?block=${nextBlock}&lesson=${nextLesson}`);
    }

    const getLessonRender = () => {
        switch (lesson.code) {
            case 'theory':
                return <CourseLessonTheory lesson={lesson} />
            case 'input-data':
                return <CourseLessonInputData setLesson={(e) => setLessons(e)} lesson={lesson} answer={answer}
                    setAnswer={(e) => setAnswer(e)} />
            case 'few-answer':
                return <CourseLessonFewOption lesson={lesson} answer={answer} setAnswer={(e) => setAnswer(e)} />
            case 'one-answer':
                return <CourseLessonOneAnswer lesson={lesson} answer={answer} setAnswer={(e) => setAnswer(e)} />
            case 'task':
                return <CourseLessonTask lesson={lesson} slug={slug} />;
            default:
                return null;
        }
    }

    return (
        <>
            {Object.keys(lesson).length === 0 ?
                <LoadingElement />
                :
                <div className="lessons">
                    <div className="lessons-header">
                        <div className="lessons-header-back">
                            <svg
                                width="21"
                                height="21"
                                viewBox="0 0 21 21"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M13.125 4.375L7.875 10.5L13.125 16.625"
                                    stroke="white"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                            <Link to={`${lang === undefined ? '/' : '/' + lang + '/'}course/${slug}`}>Блоки</Link>
                        </div>

                        <p className="lessons-header-title">_{lesson.title}</p>
                    </div>
                    <div className="lessons-stage">
                        <button onClick={(e) => slideLesson(e, -1)}
                            className={`btn slider-arrow ${!canBePrevSlide ? 'hidden' : ''}`}>
                            <svg
                                width="21"
                                height="21"
                                viewBox="0 0 21 21"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle
                                    cx="8.75"
                                    cy="8.75"
                                    r="8.75"
                                    transform="matrix(-1 0 0 1 19.25 1.75)"
                                    stroke="white"
                                // strokeOpacity="0.6"
                                />
                                <path
                                    d="M11.8125 7.875L9.1875 10.5L11.8125 13.125"
                                    stroke="white"
                                    // strokeOpacity="0.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                        <p>{lesson.current_step}/{lesson.amount_steps}</p>
                        <button onClick={(e) => slideLesson(e, 1)}
                            className={`btn slider-arrow ${!canBeNextSlide ? 'hidden' : ''}`}>
                            <svg
                                width="21"
                                height="21"
                                viewBox="0 0 21 21"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle cx="10.5" cy="10.5" r="8.75" stroke="white"
                                // strokeOpacity="0.6"
                                />
                                <path
                                    d="M9.1875 7.875L11.8125 10.5L9.1875 13.125"
                                    stroke="white"
                                    // strokeOpacity="0.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="lessons-btn">
                        {
                            lesson.code === 'theory' ?
                                <>
                                    {!successLesson ?
                                        <button onClick={() => handleCheckStudy()}
                                            className="btn primary big">Проверить ответ
                                        </button>
                                        :
                                        <button onClick={() => goToNextLesson()}
                                            className="btn primary big">Продолжить
                                        </button>
                                    }
                                </>
                                :
                                <>
                                    {successLesson ?

                                        <button onClick={() => goToNextLesson()}
                                            className="btn primary big">Продолжить
                                        </button>
                                        :
                                        <>
                                            <button onClick={() => handleCheckStudy()}
                                                className="btn primary big">Проверить ответ
                                            </button>
                                        </>
                                    }
                                    {
                                        successLesson === null ? <></> :
                                            <>
                                                {
                                                    successLesson ?
                                                        <p className="form_input-message success">Ответ
                                                            правильный!</p>
                                                        :
                                                        <p className="form_input-message">Ответ
                                                            неправильный!</p>
                                                }
                                            </>
                                    }
                                </>
                        }
                    </div>
                    <div className="lessons-main">
                        {getLessonRender()}
                    </div>
                </div>
            }
        </>
    );
};

export default CourseStudyPage;
