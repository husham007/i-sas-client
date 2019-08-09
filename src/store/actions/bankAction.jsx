import { CREATE_QUESTION, DELETE_QUESTION, EDIT_QUESTION} from './actionTypes';
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

export const createQuestion = (newQuestion) =>{
    return{
        type:CREATE_QUESTION,
        payload:{
            question: newQuestion
        }
    }
};

export const deleteQuestion = index =>{
    return{
        type: DELETE_QUESTION,
        payload:{
            index
        }
    }
};

export const editQuestion = (index, question) =>{
    return{
        type: EDIT_QUESTION,
        payload:{
            index,
            question
        }
    }
};