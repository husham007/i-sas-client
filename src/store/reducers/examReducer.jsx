import { CREATE_EXAM, SEARCH_QUESTION_FOR_EXAM, SHOW_EXAM_SEARCH, ADD_QUESTION_TO_EXAM, REMOVE_EXAM, REMOVE_EXAM_ERRORMSG } from '../actions/actionTypes';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';


const initState = {
    exams: [],
    exam: null,
    searchResult:[],
    showExamSearch: false,
    isSearchActive: false,
    examQuestions:[],
    errorMessage: new Map(),
}

const examReducer = (state = initState, { type, payload }) => {

    switch (type) {
        case CREATE_EXAM:
            console.log('created Exam :)', payload.exam)
            return { ...state, exam: payload.exam };
        case SEARCH_QUESTION_FOR_EXAM:
            console.log('search result for exam!', payload)
            return { ...state, isSearchActive: true,searchResult: [...payload.searchResult] };
        case SHOW_EXAM_SEARCH:
        return {...state, showExamSearch: payload.value}
        case ADD_QUESTION_TO_EXAM:
        console.log('add it to exam');
            return { ...state, examQuestions:[...state.examQuestions,payload.question] }
        case REMOVE_EXAM:
        console.log('its removed!');
            return { ...state ,examQuestions:state.examQuestions.filter( question => question.question.id !== payload.id)}
        case REMOVE_EXAM_ERRORMSG:
        // let key = payload.id;
        // let errorArray = []
        // errorArray[key] = payload.msg
            // console.log(state.errorMessage.concat(errorArray))
            let newState = {...state}
            newState.errorMessage.set(payload.id, payload.msg)
            return { ...newState}
        
        default:
            return state;
    }
};

export default examReducer