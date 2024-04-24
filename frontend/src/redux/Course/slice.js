import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    typeLesson: [],
    currentCourseEdit: {
        difficulty: 1,
        slug: '',
        icon: '/',
        lang_prog: [],
        category_prog: [],
        status: "draft",
        main: {
            1: {
                title: "",
                block: {}
            }
        }
    }
}


export const courseSlice = createSlice({
        name: "course",
        initialState: initialState,
        reducers: {
            setTypeLesson(state, action) {
                state.typeLesson = action.payload;
            },
            setCurrentCourse(state, action) {
                state.currentCourseEdit = action.payload.course;
            },
            setCurrentCourseEditMainBlocks(state, action) {
                state.currentCourseEdit.main = action.payload;
            },
            setCurrentCourseMainInfo(state, action) {
                state.currentCourseEdit.difficulty = action.payload.difficulty;
                state.currentCourseEdit.icon = action.payload.icon;
                state.currentCourseEdit.lang_prog = action.payload.lang_prog;
                state.currentCourseEdit.category_prog = action.payload.category_prog;
            },
            setCurrentCourseStatus(state, action) {
                state.currentCourseEdit.status = action.payload;
            },
            setCurrentCourseMainLang(state, action) {
                if (state.currentCourseEdit.main[action.payload.lang] === undefined) {
                    state.currentCourseEdit.main[action.payload.lang] = {};
                }
                state.currentCourseEdit.main[action.payload.lang].excerpt = action.payload.excerpt;
                state.currentCourseEdit.main[action.payload.lang].description = action.payload.description;
                state.currentCourseEdit.main[action.payload.lang].keywords = action.payload.keywords;
                state.currentCourseEdit.main[action.payload.lang].title = action.payload.title;
            },
            addCurrentCourseMainBlock(state, action) {
                const languages = action.payload.languages;
                if (Object.keys(languages).length !== 0) {
                    Object.keys(languages).map((item) => {
                        if (state.currentCourseEdit.main[languages[item].id] === undefined) {
                            state.currentCourseEdit.main[languages[item].id] = {};
                        }
                        if (state.currentCourseEdit.main[languages[item].id].block === undefined) {
                            state.currentCourseEdit.main[languages[item].id].block = {};
                        }
                        state.currentCourseEdit.main[languages[item].id].block[action.payload.num_stage] = {};
                        state.currentCourseEdit.main[languages[item].id].block[action.payload.num_stage].title = action.payload.title;
                        state.currentCourseEdit.main[languages[item].id].block[action.payload.num_stage].open = action.payload.open;
                        state.currentCourseEdit.main[languages[item].id].block[action.payload.num_stage].lesson = {};
                    })
                }
            },
            editCurrentCourseMainBlock(state, action) {
                state.currentCourseEdit.main[action.payload.lang].block[action.payload.num_stage].title = action.payload.title;
            },
            deleteCurrentCourseMainBlock(state, action) {
                const amountBlocks = Object.keys(state.currentCourseEdit.main[action.payload.lang].block).length;
                const languages = action.payload.languages;
                if (Object.keys(languages).length !== 0) {
                    Object.keys(languages).map((item, index) => {
                        if (amountBlocks > action.payload.num_stage) {
                            for (let i = action.payload.num_stage; i < amountBlocks; i++) {
                                let temp = state.currentCourseEdit.main[languages[item].id].block[i];
                                state.currentCourseEdit.main[languages[item].id].block[i] = state.currentCourseEdit.main[languages[item].id].block[Number(i) + 1];
                                state.currentCourseEdit.main[languages[item].id].block[Number(i) + 1] = temp;
                            }
                        }

                        delete state.currentCourseEdit.main[languages[item].id].block[amountBlocks];
                    })
                }
            },
            openCurrentCourseMainBlock(state, action) {
                const open = state.currentCourseEdit.main[action.payload.lang].block[action.payload.num_stage].open;
                state.currentCourseEdit.main[action.payload.lang].block[action.payload.num_stage].open = !open;
            },
            addCurrentCourseMainLesson(state, action) {
                const languages = action.payload.languages;
                if (Object.keys(languages).length !== 0) {
                    Object.keys(languages).map((item) => {
                        if (Object.keys(state.currentCourseEdit.main[languages[item].id].block[action.payload.num_stage].lesson).length === 0) {
                            state.currentCourseEdit.main[languages[item].id].block[action.payload.num_stage].lesson = {};
                        }
                        state.currentCourseEdit.main[languages[item].id].block[action.payload.num_stage].lesson[action.payload.num_step] = {};
                        state.currentCourseEdit.main[languages[item].id].block[action.payload.num_stage].lesson[action.payload.num_step] = action.payload.lesson;
                        state.currentCourseEdit.main[languages[item].id].block[action.payload.num_stage].lesson[action.payload.num_step].challenge_id = null;
                        // state.currentCourseEdit.main[languages[item].id].block[action.payload.num_stage].lesson = state.currentCourseEdit.main[languages[item].id].block[action.payload.num_stage].lesson.filter(a => a);
                    })
                }
            },
            setCurrentCourseEditMainLessonCode(state, action) {
                const languages = action.payload.languages;
                if (Object.keys(languages).length !== 0) {
                    Object.keys(languages).map((item, index) => {
                        state.currentCourseEdit.main[languages[item].id].block[action.payload.num_stage].lesson[action.payload.num_step].code = action.payload.code;
                        if (action.payload.code !== 'task') {
                            state.currentCourseEdit.main[languages[item].id].block[action.payload.num_stage].lesson[action.payload.num_step].challenge_id = null;
                        }
                    })
                }
            },
            editCurrentCourseMainLesson(state, action) {
                state.currentCourseEdit.main[action.payload.lang].block[action.payload.num_stage].lesson[action.payload.num_step].title = action.payload.title;
                state.currentCourseEdit.main[action.payload.lang].block[action.payload.num_stage].lesson[action.payload.num_step].description = action.payload.description;
                state.currentCourseEdit.main[action.payload.lang].block[action.payload.num_stage].lesson[action.payload.num_step].answer_option = action.payload.answer_option;
                state.currentCourseEdit.main[action.payload.lang].block[action.payload.num_stage].lesson[action.payload.num_step].right_answer = action.payload.right_answer;
            },
            deleteCurrentCourseMainLesson(state, action) {
                const amountLessons = Object.keys(state.currentCourseEdit.main[action.payload.lang].block[action.payload.num_stage].lesson).length;
                const languages = action.payload.languages;
                if (Object.keys(languages).length !== 0) {
                    Object.keys(languages).map((item, index) => {
                        if (amountLessons > action.payload.num_step) {
                            for (let i = action.payload.num_step; i < amountLessons; i++) {
                                let temp = state.currentCourseEdit.main[languages[item].id].block[action.payload.num_stage].lesson[i];
                                state.currentCourseEdit.main[languages[item].id].block[action.payload.num_stage].lesson[i] = state.currentCourseEdit.main[languages[item].id].block[action.payload.num_stage].lesson[Number(i) + 1];
                                state.currentCourseEdit.main[languages[item].id].block[action.payload.num_stage].lesson[Number(i) + 1] = temp;
                            }
                        }

                        delete state.currentCourseEdit.main[action.payload.lang].block[action.payload.num_stage].lesson[amountLessons];
                    })
                }
            },
            bindTaskToCourse(state, action) {
                const languages = action.payload.languages;
                if (Object.keys(languages).length !== 0) {
                    Object.keys(languages).map((item, index) => {
                        if (state.currentCourseEdit.main[languages[item].id].block[action.payload.num_stage].lesson[action.payload.num_step].challenge_id === action.payload.task) {
                            state.currentCourseEdit.main[languages[item].id].block[action.payload.num_stage].lesson[action.payload.num_step].challenge_id = null;
                        } else {
                            state.currentCourseEdit.main[languages[item].id].block[action.payload.num_stage].lesson[action.payload.num_step].challenge_id = action.payload.task;
                        }
                    })
                }
            },
        }
    }
);

export const {
    setTypeLesson,
    setCurrentCourse,
    setCurrentCourseMainInfo,
    setCurrentCourseMainLang,
    setCurrentCourseStatus,
    setCurrentCourseEditMainBlocks,
    setCurrentCourseEditMainLessonCode,
    addCurrentCourseMainBlock,
    editCurrentCourseMainBlock,
    openCurrentCourseMainBlock,
    deleteCurrentCourseMainLesson,
    deleteCurrentCourseMainBlock,
    addCurrentCourseMainLesson,
    editCurrentCourseMainLesson,
    bindTaskToCourse
} = courseSlice.actions;

export default courseSlice.reducer;