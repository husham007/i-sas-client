import authReducer from './authReducer';
import bankReducer from './bankReducer';
import {combineReducers} from 'redux';
import {firestoreReducer} from 'redux-firestore'
import {firebaseReducer} from 'react-redux-firebase'

const rootReducer = combineReducers({
    auth: authReducer,
    bank : bankReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer;
