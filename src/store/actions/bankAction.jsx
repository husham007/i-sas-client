
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

export const createQuestion = () =>{
    return{
        type:'CREATE_QUESTION_SUCCESS',
        
        // payload:{
        //     question: newQuestion
        // }
    }
}