import gql from 'graphql-tag';
// import { withApollo } from 'react-apollo';

import {
    CREATE_QUESTION,
    DELETE_QUESTION,
    EDIT_QUESTION,
    LOAD_QUESTIONS,
    LOAD_BOOK,
    SEARCH_QUESTION_ANY,
    SEARCH_PARAMETERS,
    BANK_SNACKBAR
    
} from './actionTypes';

export const createQuestion = (client, question, QUERY) => {
    return async (dispatch) => {
        await client
            .mutate({ mutation: QUERY, variables: { statement: question.statement, category: question.category, type: question.type, level: question.level, answer: question.answer, book: question.book } })
            .then((result) => {

                dispatch({
                    type: CREATE_QUESTION,
                    payload: {
                        question: question.id,
                        message: 'New question is created!'
                    }
                })

            })
        // .catch(err => { console.log(err)});

    }

};

export const loadQuestions = (page) => {
    //console.log(page);
    return {
        type: LOAD_QUESTIONS,
        payload: {
            questions: page ? page : null
        }
    }
};

export const loadBook = (book) => {
    //console.log(page);
    return {
        type: LOAD_BOOK,
        payload: {
            book: book ? book : null
        }
    }
};


export const deleteQuestion = index => {
    return {
        type: DELETE_QUESTION,
        payload: {
            index,
            message: 'This question is deleted!'
        }
    }
};
export const resetBankSnackBar = () => {
    return {
        type: BANK_SNACKBAR,
        payload: {
           
        }
    }
};

export const editQuestion = (client, question) => {

    return async (dispatch) => {
        console.log(question.id)
        const EDIT_QUESTION_QUERY = gql`
        mutation editQuestion($id: ID! $statement: String! $category: String! $type: String! $level: String! $answer: String! $book: String! $options: [String]!){
        editQuestion(id:$id statement: $statement category: $category type:$type level:$level answer:$answer book:$book options: $options) {
            id
        }
    }    
    `;
        await client
            .mutate({ mutation: EDIT_QUESTION_QUERY, variables: { id: question.id, statement: question.statement, category: question.category, type: question.type, level: question.level, answer: question.answer, book: question.book, options: question.options } })
            .then((result) => {

                dispatch({
                    type: EDIT_QUESTION,
                    payload: {
                        question: question.id,
                        message:'This question is edited!'
                    }
                })

            })
        // .catch(err => { console.log(err)});

    }

};

export const searchQuestion = (client, search, QUERY) => {
    return async (dispatch) => {

        await client
            .query({ query: QUERY, variables: { searchInput: search } })
            .then(({ data }) => {
                
                    dispatch({
                        type: SEARCH_QUESTION_ANY,
                        payload: {
                            searchResult: data.searchQuestion
                        }
                    })
            


    })
    // .catch(err => { console.log(err)});

    }

    
};

export const setSearchParameters = (name, value) => {
    return {
        type: SEARCH_PARAMETERS,
        payload: {
            name,
            value
        }
    }
}









// export const createQuestion = question => {
//     return (dispatch, getState, { getFirebase, getFirestore }) => {
//         // make async call to database
//         const firestore = getFirestore();
//         const profile = getState().firebase.profile;
//         const authorId = getState().firebase.auth.uid;
//         firestore.collection('questions').add({
//             ...question,
//             authorFirstName: profile.firstName,
//             authorLastName: profile.lastName,
//             authorId: authorId,
//             createdAt: new Date()
//         }).then(() => {
//             dispatch({ type: 'CREATE_QUESTION_SUCCESS', question });
//         }).catch(err =>{
//             dispatch({ type: 'CREATE_QUESTION_ERROR', err });
//         })


//     }
// };