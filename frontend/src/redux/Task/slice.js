import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    currentTaskEdit: {
        difficulty: 1,
        slug: '',
        status: 'draft',
        project_id: null,
        template_id: null,
        num_of_input_data: 3,
        for_course: true,
        main: {
            1: {}
        },
        input_output_data: []
    }
}


export const courseSlice = createSlice({
        name: "task",
        initialState: initialState,
        reducers: {
            setTask(state, action) {
                state.currentTaskEdit = action.payload.task;
            },
            setTaskMainLang(state, action) {
                state.currentTaskEdit.main = action.payload;
            },
            setTaskMainInfo(state, action) {
                state.currentTaskEdit.difficulty = action.payload.difficulty;
                // state.currentTaskEdit.slug = action.payload.slug;
                state.currentTaskEdit.num_of_input_data = action.payload.num_of_input_data;
                state.currentTaskEdit.for_course = action.payload.for_course;
            },
            setTaskProject(state, action) {
                state.currentTaskEdit.project_id = action.payload;
            },
            setTaskTemplate(state, action) {
                state.currentTaskEdit.template_id = action.payload;
            },
            setTaskStatus(state, action) {
                state.currentTaskEdit.status = action.payload.status;
            },
            setTaskSlug(state, action) {
                state.currentTaskEdit.slug = action.payload.slug;
            },
            setTaskMainInfoLang(state, action) {
                if (state.currentTaskEdit.main[action.payload.lang] === undefined) {
                    state.currentTaskEdit.main[action.payload.lang] = {};
                }
                state.currentTaskEdit.main[action.payload.lang].content = action.payload.content;
                state.currentTaskEdit.main[action.payload.lang].description = action.payload.description;
                state.currentTaskEdit.main[action.payload.lang].keywords = action.payload.keywords;
                state.currentTaskEdit.main[action.payload.lang].title = action.payload.title;
            },
            addTaskInput(state, action) {
                state.currentTaskEdit.input_output_data.map((item, i) => {
                    state.currentTaskEdit.input_output_data[i].input.push(action.payload.num);
                })
            },
            deleteTaskInput(state, action) {
                state.currentTaskEdit.input_output_data.map((item, i) => {
                    state.currentTaskEdit.input_output_data[i].input = state.currentTaskEdit.input_output_data[i].input.filter((i, index) => index !== action.payload.index);
                })
            },
            editTaskInput(state, action) {
                state.currentTaskEdit.input_output_data[action.payload.row].input[action.payload.col] = action.payload.value;
            },
            addTaskOutput(state, action) {
                state.currentTaskEdit.input_output_data.map((item, i) => {
                    state.currentTaskEdit.input_output_data[i].output.push(action.payload.num);
                })
            },
            deleteTaskOutput(state, action) {
                state.currentTaskEdit.input_output_data.map((item, i) => {
                    state.currentTaskEdit.input_output_data[i].output = state.currentTaskEdit.input_output_data[i].output.filter((i, index) => index !== action.payload.index);
                })
            },
            editTaskOutput(state, action) {
                state.currentTaskEdit.input_output_data[action.payload.row].output[action.payload.col] = action.payload.value;
            },
            addTaskRowData(state, action) {
                if (state.currentTaskEdit.input_output_data[0] !== undefined) {
                    state.currentTaskEdit.input_output_data.push({
                        input: state.currentTaskEdit.input_output_data[0].input.map((item) => action.payload.value),
                        output: state.currentTaskEdit.input_output_data[0].output.map((item) => action.payload.value),
                    });
                } else {
                    state.currentTaskEdit.input_output_data.push({
                        input: [action.payload.value],
                        output: [action.payload.value]
                    });
                }
            },
            deleteTaskRowData(state, action) {
                state.currentTaskEdit.input_output_data = state.currentTaskEdit.input_output_data.filter(item => item !== action.payload.index);
            },
            editTaskRowData(state, action) {
                if (action.payload.col + action.payload.slide >= 0 && action.payload.col + action.payload.slide < state.currentTaskEdit.input_output_data[action.payload.row].input.length) {
                    let temp = state.currentTaskEdit.input_output_data[action.payload.row].input[action.payload.col];
                    state.currentTaskEdit.input_output_data[action.payload.row].input[action.payload.col] = state.currentTaskEdit.input_output_data[action.payload.row].input[action.payload.col + action.payload.slide];
                    state.currentTaskEdit.input_output_data[action.payload.row].input[action.payload.col + action.payload.slide] = temp;
                }
            }
        }
    }
);

export const {
    setTask,
    setTaskProject,
    setTaskTemplate,
    setTaskMainInfo,
    setTaskMainInfoLang,
    setTaskMainLang,
    setTaskSlug,
    setTaskStatus,
    addTaskInput,
    editTaskInput,
    deleteTaskInput,
    addTaskOutput,
    deleteTaskOutput,
    editTaskOutput,
    deleteTaskRowData,
    addTaskRowData,
    editTaskRowData
} = courseSlice.actions;

export default courseSlice.reducer;