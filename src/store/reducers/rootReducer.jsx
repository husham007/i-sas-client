import authReducer from './authReducer';
import bankReducer from './bankReducer';
import examReducer from './examReducer';
import snackBarReducer from './snackBarReducer';
import { combineReducers } from 'redux';


const rootReducer = combineReducers({
    auth: authReducer,
    bank: bankReducer,
    exam: examReducer,
    snackBar: snackBarReducer
});

export default rootReducer;
