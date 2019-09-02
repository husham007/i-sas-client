import { CREATE_EXAM, SEARCH_QUESTION_FOR_EXAM, SHOW_EXAM_SEARCH, ADD_QUESTION_TO_EXAM, REMOVE_EXAM, REMOVE_EXAM_ERRORMSG} from '../actions/actionTypes';

export const createExam = exam => {
    return{
        type: CREATE_EXAM,
        payload:{
            exam
        }
    }
};

export const addQuestionToExam = question =>{

    return{
        type: ADD_QUESTION_TO_EXAM,
        payload:{
            question
        }
    }
}

export const showExamSearch = (value)=> {
    return {
        type: SHOW_EXAM_SEARCH,
        payload: {
           value
        }
    }
};

export const searchExamQuestion = (client, search, QUERY) => {
    return async (dispatch) => {

        await client
            .query({ query: QUERY, variables: { searchInput: search } })
            .then(({ data }) => {

                dispatch({
                    type: SEARCH_QUESTION_FOR_EXAM,
                    payload: {
                        searchResult: data.searchQuestion
                    }
                })
            })
        // .catch(err => { console.log(err)});
    }
};

export const removeQuestion = id => {
    return {
        type: REMOVE_EXAM,
        payload: {
            id
        }
    }
};

export const setErrorMessage = (id,msg) =>{
    return {
        type: REMOVE_EXAM_ERRORMSG,
        payload: {
            id, msg
        }
    }
}

