import { CREATE_SOFT_EXAM, SEARCH_QUESTION_FOR_EXAM, SHOW_EXAM_SEARCH, ADD_QUESTION_TO_EXAM, REMOVE_EXAM, REMOVE_EXAM_ERRORMSG, CREATE_EXAM, LOAD_EXAMS, DELETE_EXAM, RESET_SNACKBAR, SNACKBAR_MSG, SELECT_EXAM, RESET_SELECT_EXAM } from '../actions/actionTypes';

export const createSoftExam = exam => {
    return {
        type: CREATE_SOFT_EXAM,
        payload: {
            exam
        }
    }
};

export const addQuestionToExam = question => {

    return {
        type: ADD_QUESTION_TO_EXAM,
        payload: {
            question
        }
    }
}

export const showExamSearch = (value) => {
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

export const setErrorMessage = (id, msg) => {
    return {
        type: REMOVE_EXAM_ERRORMSG,
        payload: {
            id, msg
        }
    }
}

export const createExam = (exam,QUERY,client) => {
    let examInput = {...exam.exam}
    console.log(exam)
    let questions = exam.examQuestions.map( q => {
        return {
            question: q.question.id,
            marks: q.marks
        }
    })
    examInput.questions = questions
    return async (dispatch) => {

        await client
            .mutate({ mutation: QUERY, variables: { examInput } })
            .then(({ data }) => {
                dispatch({
                    type: CREATE_EXAM,
                    payload: {
                        data: data.createExam
                    }
                })
                dispatch({
                    type: SNACKBAR_MSG,
                    payload: {
                        message: 'This Exam is Created!'
                    }
                })


            })
        // .catch(err => { console.log(err)});

    }

    // return {
    //     type: CREATE_EXAM,
    //     payload: {
    //         examInput: {
    //             name: exam.exam.name,
    //             type: exam.exam.type,
    //             instructions: exam.exam.instructions,
    //             startTime: exam.exam.startTime,
    //             duration: exam.exam.duration,
    //             book: exam.exam.book,
    //             author: exam.exam.author,
    //             questions: exam.examQuestions,
    //         }
    //     }
    // }
}

export const loadExams = exams =>{
    return {
        type: LOAD_EXAMS,
        payload: {
            exams
        }
    }
}

export const deleteExam = index =>{
    return async (dispatch) => {
        dispatch({
            type: RESET_SELECT_EXAM,
            payload: {
                
            }
        })
        dispatch({
                    type: DELETE_EXAM,
                    payload: {
                        index
                    }
                })
        dispatch({
            type: SNACKBAR_MSG,
            payload: {
                 message: 'This Exam is Deleted!'
            }
        })
        
        
    }
}

export const selectExam = selected =>{
    return {
        type: SELECT_EXAM,
        payload: {
            selected
        }
    }
}
export const resetSelectExam = selected =>{
    return {
        type: RESET_SELECT_EXAM,
        payload: {
            selected
        }
    }
}