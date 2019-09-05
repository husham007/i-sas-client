import { CREATE_SOFT_EXAM, SEARCH_QUESTION_FOR_EXAM, SHOW_EXAM_SEARCH, ADD_QUESTION_TO_EXAM, REMOVE_EXAM, REMOVE_EXAM_ERRORMSG, CREATE_EXAM, LOAD_EXAMS, DELETE_EXAM,SELECT_EXAM,RESET_SELECT_EXAM } from '../actions/actionTypes';



const initState = {
    exams: [],
    exam: null,
    examLoaded: false,
    searchResult: [],
    showExamSearch: false,
    isSearchActive: false,
    examQuestions: [],
    errorMessage: new Map(),
    selected: null,
}

const examReducer = (state = initState, { type, payload }) => {

    switch (type) {
        case CREATE_SOFT_EXAM:
            return { ...state, examQuestions: [], exam: payload.exam };
        case SEARCH_QUESTION_FOR_EXAM:
            return { ...state, isSearchActive: true, searchResult: [...payload.searchResult] };
        case SHOW_EXAM_SEARCH:
            return { ...state, showExamSearch: payload.value }
        case ADD_QUESTION_TO_EXAM:
            return { ...state, examQuestions: [...state.examQuestions, payload.question] }
        case REMOVE_EXAM:
            return { ...state, examQuestions: state.examQuestions.filter(question => question.question.id !== payload.id) }
        case REMOVE_EXAM_ERRORMSG:
            let newState = { ...state }
            newState.errorMessage.set(payload.id, payload.msg)
            return { ...newState }
        case CREATE_EXAM:
            return { ...state, exam: null, exams: [], examLoaded:false }
        case LOAD_EXAMS:
            return { ...state, examLoaded: true, exams: [...payload.exams.exams] }
        case DELETE_EXAM:
            return { ...state,selected: null, examLoaded: false,exams:[], exam:null}
        case SELECT_EXAM:
        return{...state,selected: payload.selected, }
        case RESET_SELECT_EXAM:
        return{...state,selected: null, }
        default:
            return state;
    }
};

export default examReducer