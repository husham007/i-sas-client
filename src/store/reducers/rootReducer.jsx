import authReducer from './authReducer';
import bankReducer from './bankReducer';
import examReducer from './examReducer';
import { combineReducers } from 'redux';


const rootReducer = combineReducers({
    auth: authReducer,
    bank: bankReducer,
    exam: examReducer,
});

export default rootReducer;
