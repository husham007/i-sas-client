// import { Query } from 'react-apollo';
// import React from 'react';


export const signIn = ({data}) => {
   /* return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({ type: 'LOGIN_SUCCESS' })
        }).catch((err) => {
            dispatch({ type: 'LOGIN_ERROR', err })
        });
    }
    
    */
 
   return (dispatch)=>{
    
    if (data) {
        localStorage.setItem("token", data.signIn.token);
        let token = data.signIn.token;
        let base64Url = token.split('.')[1];
        let decodedToken = JSON.parse(window.atob(base64Url));
        //console.log("decoded token", decodedToken)
        dispatch({type: "SET_TOKEN", payload: {decodedToken, token}});
   } 
   }
}


export const signInErr = (errors) => {
    /* return (dispatch, getState, { getFirebase }) => {
         const firebase = getFirebase();
         firebase.auth().signInWithEmailAndPassword(
             credentials.email,
             credentials.password
         ).then(() => {
             dispatch({ type: 'LOGIN_SUCCESS' })
         }).catch((err) => {
             dispatch({ type: 'LOGIN_ERROR', err })
         });
     }
     
     */
  
    return (dispatch)=>{
     
     
     console.log(errors);
     dispatch({type: "AUTH_ERR", payload: errors.graphQLErrors[0].extensions.downstreamErrors[0].message})
    }
 }
 

export const signOut = () => {
    return (dispatch, getState) => {
        localStorage.removeItem("token");
     
            dispatch({ type: 'SIGNOUT_SUCCESS' })     
    }
}

export const getToken = () => {
    return (dispatch, getState) => {
        let token = localStorage.getItem("token");
        let decodedToken = null;
        if (token){
        let base64Url = token.split('.')[1];
        decodedToken = JSON.parse(window.atob(base64Url));

        }
     
        dispatch({type: "GET_TOKEN", payload: {decodedToken, token}});  
    }
}

export const signUp = newUser => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase()
        const firestore = getFirestore()

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((resp) => {
            return firestore.collection('users').doc(resp.user.uid).set({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                initials: newUser.firstName[0] + newUser.lastName[0]
            })
        }).then(() => {
            dispatch({ type: 'SIGNUP_SUCCESS' })
        }).catch(err => {
            dispatch({ type: 'SIGNUP_ERROR', err })
        })
    }
}